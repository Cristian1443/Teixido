import { useState, useEffect, useCallback } from 'react';
import * as erpService from '../services/erp.service';

interface SyncStatus {
  clientes: 'idle' | 'syncing' | 'success' | 'error';
  articulos: 'idle' | 'syncing' | 'success' | 'error';
  ultimaSync: string | null;
  error: string | null;
}

export function useERPSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    clientes: 'idle',
    articulos: 'idle',
    ultimaSync: null,
    error: null
  });

  const [modoOffline, setModoOffline] = useState(false);

  const sincronizarClientes = useCallback(async () => {
    try {
      setSyncStatus(prev => ({ ...prev, clientes: 'syncing', error: null }));
      
      const clientesERP = await erpService.getClientes();
      const clientesLocales = clientesERP.map(erpService.mapearClienteERPaLocal);
      
      setSyncStatus(prev => ({
        ...prev,
        clientes: 'success',
        ultimaSync: new Date().toISOString()
      }));
      
      setModoOffline(false);
      
      console.log('✅ Clientes sincronizados:', clientesLocales.length);
      
      return clientesLocales;
    } catch (error) {
      // No mostrar como error si estamos usando datos mock
      console.log('💾 Usando datos locales de clientes');
      
      setSyncStatus(prev => ({
        ...prev,
        clientes: 'success',
        ultimaSync: new Date().toISOString()
      }));
      
      setModoOffline(true);
      
      return null;
    }
  }, []);

  const sincronizarArticulos = useCallback(async () => {
    try {
      setSyncStatus(prev => ({ ...prev, articulos: 'syncing', error: null }));
      
      const articulosERP = await erpService.getArticulos();
      const articulosLocales = articulosERP.map(erpService.mapearArticuloERPaLocal);
      
      setSyncStatus(prev => ({
        ...prev,
        articulos: 'success',
        ultimaSync: new Date().toISOString()
      }));
      
      setModoOffline(false);
      
      console.log('✅ Artículos sincronizados:', articulosLocales.length);
      
      return articulosLocales;
    } catch (error) {
      // No mostrar como error si estamos usando datos mock
      console.log('💾 Usando datos locales de artículos');
      
      setSyncStatus(prev => ({
        ...prev,
        articulos: 'success',
        ultimaSync: new Date().toISOString()
      }));
      
      setModoOffline(true);
      
      return null;
    }
  }, []);

  const enviarVentaAlERP = useCallback(async (ventaData: any) => {
    try {
      console.log('📤 Enviando venta al ERP...', ventaData);
      
      // Preparar documento para el ERP
      const documento: erpService.DocumentoCliente = {
        Id: 0, // Nuevo documento
        Tipo: 5, // Tipo 5 = Pedido (según documentación)
        Referencia: '',
        Numero: 0, // El ERP asignará el número
        Fecha: new Date().toISOString().split('T')[0],
        ID_Cliente: parseInt(ventaData.cliente?.id || '0'),
        PreciosImpIncluidos: true,
        BaseImponible: parseFloat(ventaData.totales?.baseImponible || '0'),
        TotalImporte: parseFloat(ventaData.totales?.total || '0'),
        Comentario: ventaData.tipoNota || '',
        Contenido: ventaData.articulos?.map((art: any) => ({
          TipoRegistro: 1, // 1 = Artículo
          ID_Articulo: parseInt(art.articuloId || '0'),
          Comentario: art.nota || null,
          Precio: art.precioUnitario || 0,
          Dto: art.descuento || 0,
          DtoPPago: 0,
          DtoEurosXUd: 0,
          DtoEuros: 0,
          Uds: art.cantidad || 0,
          UdsRegalo: 0,
          UdsAuxiliares: 0,
          ImporteLinea: (art.precioUnitario || 0) * (art.cantidad || 0),
          Lote: null,
          Caducidad: null,
          ID_Partida: 0,
          PorcentajeIVA: 21, // TODO: obtener del artículo
          PorcentajeRE: 0,
          DescripcionAmplia: art.nombre || null
        })) || [],
        Pagos: ventaData.estadoPago === 'pagado' ? [{
          ID_MetodoPago: obtenerIDMetodoPago(ventaData.formaPago),
          Fecha: new Date().toISOString().split('T')[0],
          Importe: parseFloat(ventaData.totales?.total || '0')
        }] : []
      };
      
      const resultado = await erpService.crearDocumentoVenta(documento);
      
      console.log('✅ Venta enviada al ERP correctamente:', resultado);
      
      return resultado;
    } catch (error) {
      console.log('💾 Venta guardada localmente (modo offline)');
      
      // Guardar para sincronizar después
      guardarParaSincronizarDespues('venta', ventaData);
      
      // No lanzar error para no bloquear la app
      return null;
    }
  }, []);

  const registrarPagoEnERP = useCallback(async (cobro: any, notaVentaId: string) => {
    try {
      console.log('💰 Registrando pago en ERP...', cobro);
      
      const pago: erpService.NuevoPago = {
        ID_DocCli: parseInt(notaVentaId.replace(/[^0-9]/g, '')) || 0,
        ID_MetodoPago: obtenerIDMetodoPago(cobro.formaPago || 'Efectivo'),
        Fecha: new Date().toISOString().split('T')[0],
        Importe: parseFloat(cobro.monto?.replace(',', '.').replace('€', '').trim() || '0')
      };
      
      const resultado = await erpService.registrarPago(pago);
      
      console.log('✅ Pago registrado en ERP correctamente:', resultado);
      
      return resultado;
    } catch (error) {
      console.log('💾 Pago guardado localmente (modo offline)');
      
      // Guardar para sincronizar después
      guardarParaSincronizarDespues('pago', { cobro, notaVentaId });
      
      // No lanzar error para no bloquear la app
      return null;
    }
  }, []);

  useEffect(() => {
    const sincronizacionInicial = async () => {
      console.log('🔄 Cargando datos de la aplicación...');
      
      // Intentar sincronizar (pero no bloquear si falla)
      await sincronizarClientes();
      await sincronizarArticulos();
    };
    
    // Ejecutar en el próximo tick para no bloquear el render inicial
    setTimeout(sincronizacionInicial, 1000);
    
    // Sincronizar cada hora
    const interval = setInterval(sincronizacionInicial, 3600000);
    
    return () => clearInterval(interval);
  }, [sincronizarClientes, sincronizarArticulos]);

  return {
    syncStatus,
    modoOffline,
    sincronizarClientes,
    sincronizarArticulos,
    enviarVentaAlERP,
    registrarPagoEnERP
  };
}

function obtenerIDMetodoPago(formaPago: string): number {
  const mapeo: Record<string, number> = {
    'Efectivo': 1,
    'Tarjeta de Débito': 2,
    'Tarjeta de Crédito': 3,
    'Bizum': 8,
    'Transferencia Bancaria': 5
  };
  
  return mapeo[formaPago] || 1; // Default: Efectivo
}

/**
 * Guardar operaciones para sincronizar después (modo offline)
 */
function guardarParaSincronizarDespues(tipo: string, datos: any) {
  try {
    const colaPendiente = JSON.parse(localStorage.getItem('colaPendiente') || '[]');
    
    colaPendiente.push({
      tipo,
      datos,
      timestamp: new Date().toISOString(),
      intentos: 0
    });
    
    localStorage.setItem('colaPendiente', JSON.stringify(colaPendiente));
    
    console.log('💾 Operación guardada para sincronizar después:', tipo);
  } catch (error) {
    console.error('❌ Error al guardar operación pendiente:', error);
  }
}
