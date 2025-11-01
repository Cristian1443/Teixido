import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import LoginWithEmail from './components/LoginWithEmail';
import Dashboard from './components/Dashboard';
import VentasMenuScreen from './components/VentasMenuScreen';
import VentasScreen from './components/VentasScreen';
import NuevaVentaScreen from './components/NuevaVentaScreen';
import VerNotaScreen from './components/VerNotaScreen';
import ResumenDiaScreen from './components/ResumenDiaScreen';
import CobrosListScreen from './components/CobrosListScreen';
import CobrosScreen from './components/CobrosScreen';
import CobrosConfirmacionScreen from './components/CobrosConfirmacionScreen';
import GastosScreen from './components/GastosScreen';
import DocumentosScreen from './components/DocumentosScreen';
import ClientesScreen from './components/ClientesScreen';
import ArticulosScreen from './components/ArticulosScreen';
import ComunicacionScreen from './components/ComunicacionScreen';
import AlmacenScreen from './components/AlmacenScreen';
import NotasAlmacenScreen from './components/NotasAlmacenScreen';
import ResumenStockScreen from './components/ResumenStockScreen';
import ConfiguracionScreen from './components/ConfiguracionScreen';
import AgendaScreen from './components/AgendaScreen';

type ScreenType = 
  | 'login'
  | 'loginEmail'
  | 'dashboard'
  | 'ventasMenu'
  | 'ventas'
  | 'nuevaVenta'
  | 'verNota'
  | 'resumenDia'
  | 'cobros'
  | 'cobrosList'
  | 'cobrosConfirmacion'
  | 'gastos'
  | 'documentos'
  | 'clientes'
  | 'articulos'
  | 'comunicacion'
  | 'almacen'
  | 'notasAlmacen'
  | 'resumenStock'
  | 'configuracion'
  | 'agenda';

// Tipos globales
export interface Gasto {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  fecha: string;
  imagen?: string;
}

export interface NotaVenta {
  id: string;
  cliente: string;
  precio: string;
  fecha: string;
  items?: any[];
  estado?: 'pendiente' | 'cerrada' | 'anulada';
}

export interface Cobro {
  id: string;
  cliente: string;
  monto: string;
  fecha: string;
  estado: 'pendiente' | 'pagado';
}

export interface Documento {
  id: string;
  nombre: string;
  categoria: string;
  fecha: string;
  tamano: string;
  tipo: 'pdf' | 'image' | 'doc';
}

export interface Articulo {
  id: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  precio?: string;
  stockMinimo?: number;
  proveedor?: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  empresa: string;
  direccion: string;
  telefono?: string;
  email?: string;
  ultimaVisita?: string;
}

export interface NotaAlmacen {
  id: string;
  tipo: 'Carga Camion' | 'Descarga Camion' | 'Inventario Camion' | 'Intercambio Entrada' | 'Intercambio Salida';
  fecha: string;
  usuario: string;
  articulos: number;
  observaciones?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [ventaActual, setVentaActual] = useState<any>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const [cobranzaActual, setCobranzaActual] = useState<any>(null);

  // ESTADO GLOBAL - Datos compartidos entre todas las pantallas
  const [gastos, setGastos] = useState<Gasto[]>([
    { id: 'G001', nombre: 'Combustible', categoria: 'Combustible', precio: '45,00 €', fecha: '08:30' },
    { id: 'G002', nombre: 'Comida mediodía', categoria: 'Comida', precio: '12,50 €', fecha: '14:15' },
    { id: 'G003', nombre: 'Peaje autopista', categoria: 'Otros', precio: '8,90 €', fecha: '09:45' },
    { id: 'G004', nombre: 'Parking centro', categoria: 'Otros', precio: '5,00 €', fecha: '10:30' },
    { id: 'G005', nombre: 'Café', categoria: 'Comida', precio: '2,50 €', fecha: '11:00' },
    { id: 'G006', nombre: 'Mantenimiento vehículo', categoria: 'Combustible', precio: '85,60 €', fecha: '16:30' },
    { id: 'G007', nombre: 'Material oficina', categoria: 'Otros', precio: '21,00 €', fecha: '13:20' },
  ]);

  const [notasVenta, setNotasVenta] = useState<NotaVenta[]>([
    { id: 'P001', cliente: 'Distribuciones Rivera S.L.', precio: '450,00 €', fecha: '08:45', estado: 'cerrada' },
    { id: 'P002', cliente: 'Almacenes López S.A.', precio: '320,50 €', fecha: '10:20', estado: 'cerrada' },
    { id: 'P003', cliente: 'Transportes García S.L.', precio: '275,00 €', fecha: '11:30', estado: 'pendiente' },
    { id: 'P004', cliente: 'Panaderías Martín S.L.', precio: '180,00 €', fecha: '13:15', estado: 'cerrada' },
    { id: 'P005', cliente: 'Supermercados Central', precio: '525,00 €', fecha: '15:00', estado: 'pendiente' },
    { id: 'P006', cliente: 'Distribuciones Norte', precio: '395,50 €', fecha: '16:20', estado: 'cerrada' },
    { id: 'P007', cliente: 'Alimentación Sur', precio: '304,00 €', fecha: '17:45', estado: 'pendiente' },
  ]);

  const [cobros, setCobros] = useState<Cobro[]>([
    { id: 'C001', cliente: 'Distribuciones Rivera S.L.', monto: '450,00 €', fecha: 'Hoy', estado: 'pagado' },
    { id: 'C002', cliente: 'Transportes García S.L.', monto: '275,00 €', fecha: 'Hace 2 días', estado: 'pendiente' },
    { id: 'C003', cliente: 'Supermercados Central', monto: '525,00 €', fecha: 'Hoy', estado: 'pendiente' },
    { id: 'C004', cliente: 'Alimentación Sur', monto: '304,00 €', fecha: 'Hace 1 día', estado: 'pendiente' },
  ]);

  const [documentos, setDocumentos] = useState<Documento[]>([
    { id: 'DOC001', nombre: 'Catálogo Alimentación 2024.pdf', categoria: 'Catálogos', fecha: '15/10/2024', tamano: '2.4 MB', tipo: 'pdf' },
    { id: 'DOC002', nombre: 'Catálogo Congelados.pdf', categoria: 'Catálogos', fecha: '12/10/2024', tamano: '1.8 MB', tipo: 'pdf' },
    { id: 'DOC003', nombre: 'Catálogo Droguerías.pdf', categoria: 'Catálogos', fecha: '10/10/2024', tamano: '3.2 MB', tipo: 'pdf' },
    { id: 'DOC004', nombre: 'Contrato Cliente Rivera.pdf', categoria: 'Contratos', fecha: '08/10/2024', tamano: '456 KB', tipo: 'pdf' },
    { id: 'DOC005', nombre: 'Factura Octubre 2024.pdf', categoria: 'Facturas', fecha: '05/10/2024', tamano: '128 KB', tipo: 'pdf' },
    { id: 'DOC006', nombre: 'Informe Ventas Septiembre.pdf', categoria: 'Informes', fecha: '01/10/2024', tamano: '892 KB', tipo: 'pdf' },
    { id: 'DOC007', nombre: 'Términos y Condiciones.pdf', categoria: 'Otros', fecha: '28/09/2024', tamano: '234 KB', tipo: 'pdf' },
  ]);

  const [articulos, setArticulos] = useState<Articulo[]>([
    { id: '001', nombre: 'Croqueta Jamón', cantidad: 100, categoria: 'Fritos', precio: '12,50 €', stockMinimo: 20, proveedor: 'Congelados SA' },
    { id: '002', nombre: 'Croqueta Pollo', cantidad: 85, categoria: 'Fritos', precio: '11,00 €', stockMinimo: 20, proveedor: 'Congelados SA' },
    { id: '003', nombre: 'Empanadilla Atún', cantidad: 120, categoria: 'Fritos', precio: '10,50 €', stockMinimo: 30, proveedor: 'Congelados SA' },
    { id: '004', nombre: 'Pizza Margarita', cantidad: 60, categoria: 'Precocinados', precio: '15,00 €', stockMinimo: 15, proveedor: 'La Pizzería SL' },
    { id: '005', nombre: 'Lasaña Boloñesa', cantidad: 45, categoria: 'Precocinados', precio: '18,00 €', stockMinimo: 10, proveedor: 'Pasta Fresca' },
    { id: '006', nombre: 'Guisantes Congelados', cantidad: 200, categoria: 'Verduras', precio: '3,50 €', stockMinimo: 50, proveedor: 'Verduras del Campo' },
    { id: '007', nombre: 'Pimientos Asados', cantidad: 75, categoria: 'Conservas', precio: '8,00 €', stockMinimo: 20, proveedor: 'Conservas Iberia' },
    { id: '008', nombre: 'Tortilla Española', cantidad: 50, categoria: 'Precocinados', precio: '14,00 €', stockMinimo: 15, proveedor: 'Huevos y Más' },
    { id: '009', nombre: 'Nuggets Pollo', cantidad: 15, categoria: 'Fritos', precio: '9,50 €', stockMinimo: 25, proveedor: 'Congelados SA' },
    { id: '010', nombre: 'Espinacas Congeladas', cantidad: 180, categoria: 'Verduras', precio: '4,00 €', stockMinimo: 40, proveedor: 'Verduras del Campo' },
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    { id: '100', nombre: 'ALVAREZ CORDERO CONSUELO', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', telefono: '985 123 456', ultimaVisita: 'Hace 2 días' },
    { id: '105', nombre: 'Boutique Encanto', empresa: 'Boutique Encanto S.L.', direccion: 'C/ Comercio 45 — Oviedo', telefono: '985 234 567', ultimaVisita: 'Hoy' },
    { id: '300', nombre: 'RAMIRO FERNANDEZ', empresa: 'Restaurante La Gallina Loca', direccion: 'C/ Doctor Fleming 1 — Lugones', telefono: '985 345 678', ultimaVisita: 'Ayer' },
    { id: '302', nombre: 'SUPERMERCADO EL PINO', empresa: 'Supermercado El Pino', direccion: 'C/ del Centro 11 — Lugones', telefono: '985 456 789', ultimaVisita: 'Hace 3 días' },
    { id: '902', nombre: 'BAR ANTONIO Y MOD', empresa: 'La Taberna', direccion: 'Calle La Libertad 55 — Oza', telefono: '985 567 890', ultimaVisita: 'Hace 1 semana' },
    { id: '150', nombre: 'Distribuciones Rivera', empresa: 'Distribuciones Rivera S.L.', direccion: 'Polígono Industrial Norte — Gijón', telefono: '985 678 901', ultimaVisita: 'Hace 5 días' },
    { id: '200', nombre: 'Almacenes López', empresa: 'Almacenes López S.A.', direccion: 'Calle Mayor 78 — Avilés', telefono: '985 789 012', ultimaVisita: 'Hace 4 días' },
  ]);

  const [notasAlmacen, setNotasAlmacen] = useState<NotaAlmacen[]>([
    { id: 'NA001', tipo: 'Carga Camion', fecha: 'Hoy 08:00', usuario: 'Juan Pérez', articulos: 45, observaciones: 'Carga completa sin incidencias' },
    { id: 'NA002', tipo: 'Descarga Camion', fecha: 'Ayer 17:30', usuario: 'María García', articulos: 38, observaciones: 'Faltaban 2 cajas de croquetas' },
    { id: 'NA003', tipo: 'Inventario Camion', fecha: 'Hace 2 días', usuario: 'Pedro Martín', articulos: 120, observaciones: 'Inventario mensual completado' },
    { id: 'NA004', tipo: 'Intercambio Entrada', fecha: 'Hace 3 días', usuario: 'Ana López', articulos: 25, observaciones: 'Intercambio con almacén central' },
    { id: 'NA005', tipo: 'Intercambio Salida', fecha: 'Hace 5 días', usuario: 'Carlos Ruiz', articulos: 18, observaciones: 'Envío a tienda Barcelona' },
  ]);

  // Funciones para actualizar el estado global
  const handleAddGasto = (gasto: Gasto) => {
    setGastos([gasto, ...gastos]);
  };

  const handleDeleteGasto = (id: string) => {
    setGastos(gastos.filter(g => g.id !== id));
  };

  const handleAddNotaVenta = (nota: NotaVenta) => {
    setNotasVenta([nota, ...notasVenta]);
  };

  const handleAddCobro = (cobro: Cobro) => {
    setCobros([cobro, ...cobros]);
  };

  const handleUpdateCobro = (id: string, estado: 'pendiente' | 'pagado') => {
    setCobros(cobros.map(c => c.id === id ? { ...c, estado } : c));
  };

  const handleUpdateNotaVenta = (id: string, estado: 'pendiente' | 'cerrada' | 'anulada') => {
    setNotasVenta(notasVenta.map(n => n.id === id ? { ...n, estado } : n));
  };

  const handleAddDocumento = (doc: Documento) => {
    setDocumentos([doc, ...documentos]);
  };

  const handleDeleteDocumento = (id: string) => {
    setDocumentos(documentos.filter(d => d.id !== id));
  };

  const handleUpdateArticulo = (id: string, cantidad: number) => {
    setArticulos(articulos.map(a => a.id === id ? { ...a, cantidad } : a));
  };

  const handleAddNotaAlmacen = (nota: NotaAlmacen) => {
    setNotasAlmacen([nota, ...notasAlmacen]);
  };

  const handleSaveVenta = (ventaData: any) => {
    setVentaActual(ventaData);
    // Agregar a la lista de notas de venta
    const nuevaNota: NotaVenta = {
      id: `P${String(notasVenta.length + 1).padStart(3, '0')}`,
      cliente: typeof ventaData.cliente === 'string' ? ventaData.cliente : (ventaData.cliente?.nombre || 'Cliente sin especificar'),
      precio: ventaData.total || '0,00 €',
      fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      items: ventaData.items || [],
      estado: 'pendiente'
    };
    handleAddNotaVenta(nuevaNota);
  };

  const handleModificarVenta = () => {
    setCurrentScreen('nuevaVenta');
  };

  const handleAnularVenta = () => {
    if (ventaActual) {
      setVentaActual({ ...ventaActual, estado: 'anulada' });
    }
  };

  const handleCerrarVenta = () => {
    if (ventaActual) {
      setVentaActual({ ...ventaActual, estado: 'cerrada' });
    }
  };

  const handleSelectCliente = (cliente: any) => {
    setClienteSeleccionado(cliente);
  };

  const handleConfirmarCobranza = (cobranza: any) => {
    setCobranzaActual(cobranza);
    // Actualizar el estado del cobro
    if (cobranza.id) {
      handleUpdateCobro(cobranza.id, 'pagado');
    }
  };

  const handleVolverACobros = () => {
    setCobranzaActual(null);
    setClienteSeleccionado(null);
  };

  // Si estamos en login o loginEmail, mostrar solo esa pantalla
  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onContinue={() => setCurrentScreen('dashboard')} 
        onLoginWithEmail={() => setCurrentScreen('loginEmail')}
      />
    );
  }

  if (currentScreen === 'loginEmail') {
    return (
      <LoginWithEmail 
        onContinue={() => setCurrentScreen('dashboard')}
        onBack={() => setCurrentScreen('login')}
      />
    );
  }

  // Para el resto de pantallas, mostrar con navegación
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {currentScreen === 'dashboard' && (
        <Dashboard 
          onNavigate={setCurrentScreen}
          notasVenta={notasVenta}
          gastos={gastos}
          cobros={cobros}
        />
      )}
      {currentScreen === 'ventasMenu' && <VentasMenuScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'ventas' && (
        <VentasScreen 
          onNavigate={setCurrentScreen}
          clientes={clientes}
          cobros={cobros}
        />
      )}
      {currentScreen === 'nuevaVenta' && (
        <NuevaVentaScreen 
          onNavigate={setCurrentScreen} 
          onSaveVenta={handleSaveVenta}
          articulos={articulos}
          clientes={clientes}
          clienteSeleccionado={clienteSeleccionado}
          onSelectCliente={handleSelectCliente}
          onUpdateArticulo={handleUpdateArticulo}
        />
      )}
      {currentScreen === 'verNota' && (
        <VerNotaScreen 
          onNavigate={setCurrentScreen} 
          ventaData={ventaActual}
          onModificar={handleModificarVenta}
          onAnular={handleAnularVenta}
          onCerrar={handleCerrarVenta}
        />
      )}
      {currentScreen === 'resumenDia' && (
        <ResumenDiaScreen 
          onNavigate={setCurrentScreen}
          notasVenta={notasVenta}
          gastos={gastos}
          cobros={cobros}
        />
      )}
      {currentScreen === 'cobrosList' && (
        <CobrosListScreen 
          onNavigate={setCurrentScreen} 
          onSelectCliente={handleSelectCliente}
          cobros={cobros}
          clientes={clientes}
        />
      )}
      {currentScreen === 'cobros' && (
        <CobrosScreen 
          onNavigate={setCurrentScreen} 
          clienteSeleccionado={clienteSeleccionado} 
          onConfirmarCobranza={handleConfirmarCobranza}
          notasVenta={notasVenta}
          onUpdateNotaVenta={handleUpdateNotaVenta}
          onAddCobro={handleAddCobro}
          cobros={cobros}
          onUpdateCobro={handleUpdateCobro}
        />
      )}
      {currentScreen === 'cobrosConfirmacion' && (
        <CobrosConfirmacionScreen 
          onNavigate={setCurrentScreen} 
          cobranzaActual={cobranzaActual} 
          onVolverACobros={handleVolverACobros}
        />
      )}
      {currentScreen === 'gastos' && (
        <GastosScreen 
          onNavigate={setCurrentScreen}
          gastos={gastos}
          onAddGasto={handleAddGasto}
          onDeleteGasto={handleDeleteGasto}
        />
      )}
      {currentScreen === 'documentos' && (
        <DocumentosScreen 
          onNavigate={setCurrentScreen}
          documentos={documentos}
          onAddDocumento={handleAddDocumento}
          onDeleteDocumento={handleDeleteDocumento}
        />
      )}
      {currentScreen === 'clientes' && (
        <ClientesScreen 
          onNavigate={setCurrentScreen}
          clientes={clientes}
          notasVenta={notasVenta}
          cobros={cobros}
        />
      )}
      {currentScreen === 'articulos' && (
        <ArticulosScreen 
          onNavigate={setCurrentScreen}
          articulos={articulos}
          onUpdateArticulo={handleUpdateArticulo}
        />
      )}
      {currentScreen === 'comunicacion' && (
        <ComunicacionScreen 
          onNavigate={setCurrentScreen}
          notasVenta={notasVenta}
          gastos={gastos}
          documentos={documentos}
        />
      )}
      {currentScreen === 'almacen' && <AlmacenScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'notasAlmacen' && (
        <NotasAlmacenScreen 
          onNavigate={setCurrentScreen}
          notasAlmacen={notasAlmacen}
          onAddNota={handleAddNotaAlmacen}
        />
      )}
      {currentScreen === 'resumenStock' && (
        <ResumenStockScreen 
          onNavigate={setCurrentScreen}
          articulos={articulos}
        />
      )}
      {currentScreen === 'configuracion' && <ConfiguracionScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'agenda' && (
        <AgendaScreen 
          onNavigate={setCurrentScreen}
          notasVenta={notasVenta}
          cobros={cobros}
          clientes={clientes}
        />
      )}
      {currentScreen === 'agenda-old' && (
        <AgendaScreen 
          onNavigate={setCurrentScreen}
          notasVenta={notasVenta}
          cobros={cobros}
        />
      )}
    </div>
  );
}
