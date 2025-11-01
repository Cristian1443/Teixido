/**
 * Servicio de integración con ERP Verial
 * @author 4Ventas Development Team
 */

// ============================================================================
// CONFIGURACIÓN - Modificar estos valores según tu entorno
// ============================================================================

const ERP_BASE_URL = 'http://x.verial.org:8000/WcfServiceLibraryVerial';
let SESSION_ID = '18';
const ERP_ENABLED = false; // true = conexión ERP | false = modo offline

export function setSessionId(sessionId: string) {
  SESSION_ID = sessionId;
}

export function getSessionId(): string {
  return SESSION_ID;
}

export function isERPEnabled(): boolean {
  return ERP_ENABLED;
}

export function getERPStatus(): { enabled: boolean; baseUrl: string; sessionId: string } {
  return {
    enabled: ERP_ENABLED,
    baseUrl: ERP_BASE_URL,
    sessionId: SESSION_ID
  };
}

// ============================================================================
// CLIENTES
// ============================================================================

export interface ClienteERP {
  Id: number;
  Tipo?: number;
  NIF: string;
  Nombre: string;
  Apellido1?: string;
  Apellido2?: string;
  RazonSocial: string;
  RegFiscal?: number;
  ID_Pais?: number;
  ID_Provincia?: number;
  Provincia?: string;
  ID_Localidad?: number;
  Localidad?: string;
  CPostal: string;
  Direccion: string;
  DireccionAux?: string;
  Telefono: string;
  Email: string;
  Sexo?: number;
  ID_Agente1?: number;
  ID_Agente2?: number;
  ID_Agente3?: number;
  ID_MetodoPago?: number;
  DtoComercial?: number;
  DtoPPago?: number;
  FormaPago?: number;
}

export async function getClientes(
  id_cliente: number = 0,
  fecha?: string,
  hora?: string
): Promise<ClienteERP[]> {
  if (!ERP_ENABLED) {
    console.log('💾 Usando datos MOCK de clientes (ERP deshabilitado)');
    return getMockClientes();
  }

  try {
    const fechaParam = fecha || new Date().toISOString().split('T')[0];
    const horaParam = hora || new Date().toTimeString().split(' ')[0].substring(0, 5);
    
    const url = `${ERP_BASE_URL}/GetClientesWS?x=${SESSION_ID}&id_cliente=${id_cliente}&fecha=${fechaParam}&hora=${horaParam}`;
    
    console.log('🔄 Sincronizando clientes del ERP:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Clientes obtenidos del ERP:', data.length || 0);
    
    return data;
  } catch (error) {
    console.warn('⚠️ Error al conectar con ERP, usando datos locales');
    return getMockClientes();
  }
}

export async function crearCliente(cliente: Partial<ClienteERP>): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Cliente guardado localmente (ERP deshabilitado)');
    return {
      InfoError: {
        Codigo: 0,
        Descripcion: 'OK - Modo Offline'
      },
      Id: Math.floor(Math.random() * 10000)
    };
  }

  try {
    const response = await fetch(`${ERP_BASE_URL}/NuevoClienteWS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sesionwcf: SESSION_ID,
        ...cliente,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Cliente creado en ERP:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al crear cliente en ERP:', error);
    throw error;
  }
}

// ============================================================================
// ARTÍCULOS
// ============================================================================

export interface ArticuloERP {
  Id: number;
  Codigo: string;
  Nombre: string;
  Descripcion?: string;
  PVP: number;
  Stock?: number;
  StockMinimo?: number;
  // ... otros campos según la respuesta del ERP
}

export async function getArticulos(fecha?: string, hora?: string): Promise<ArticuloERP[]> {
  if (!ERP_ENABLED) {
    console.log('💾 Usando datos MOCK de artículos (ERP deshabilitado)');
    return getMockArticulos();
  }

  try {
    let url = `${ERP_BASE_URL}/GetArticulosWS?x=${SESSION_ID}`;
    
    if (fecha) url += `&fecha=${fecha}`;
    if (hora) url += `&hora=${hora}`;
    
    console.log('🔄 Sincronizando artículos del ERP:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Artículos obtenidos del ERP:', data.length || 0);
    
    return data;
  } catch (error) {
    console.warn('⚠️ Error al conectar con ERP, usando datos locales');
    return getMockArticulos();
  }
}

export async function getStockArticulos(id_articulo: number = 0): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Usando stock local (ERP deshabilitado)');
    return [];
  }

  try {
    const url = `${ERP_BASE_URL}/GetStockArticulosWS?x=${SESSION_ID}&id_articulo=${id_articulo}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error al obtener stock del ERP:', error);
    throw error;
  }
}

// ============================================================================
// MÉTODOS DE PAGO
// ============================================================================

export interface MetodoPagoERP {
  Id: number;
  Nombre: string;
  // ... otros campos
}

export async function getMetodosPago(): Promise<MetodoPagoERP[]> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Usando métodos de pago por defecto (ERP deshabilitado)');
    return [
      { Id: 1, Nombre: 'Efectivo' },
      { Id: 2, Nombre: 'Tarjeta de Débito' },
      { Id: 3, Nombre: 'Tarjeta de Crédito' },
      { Id: 5, Nombre: 'Transferencia Bancaria' },
      { Id: 8, Nombre: 'Bizum' }
    ];
  }

  try {
    const url = `${ERP_BASE_URL}/GetMetodosPagoWS?x=${SESSION_ID}`;
    
    console.log('🔄 Obteniendo métodos de pago del ERP');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Métodos de pago obtenidos:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al obtener métodos de pago del ERP:', error);
    throw error;
  }
}

// ============================================================================
// DOCUMENTOS (VENTAS/PEDIDOS)
// ============================================================================

export interface LineaDocumento {
  TipoRegistro: number; // 1 = Artículo, 2 = Comentario
  ID_Articulo: number;
  Comentario?: string;
  Precio: number;
  Dto: number; // Descuento porcentaje
  DtoPPago: number; // Descuento pronto pago
  DtoEurosXUd: number; // Descuento euros por unidad
  DtoEuros: number; // Descuento euros total
  Uds: number;
  UdsRegalo: number;
  UdsAuxiliares: number;
  ImporteLinea: number;
  Lote?: string;
  Caducidad?: string;
  ID_Partida: number;
  PorcentajeIVA: number;
  PorcentajeRE: number;
  DescripcionAmplia?: string;
}

export interface PagoDocumento {
  ID_MetodoPago: number;
  Fecha: string; // Formato: YYYY-MM-DD
  Importe: number;
}

export interface DocumentoCliente {
  sesionwcf?: string;
  Id: number; // 0 para nuevo
  Tipo: number; // 5 = Pedido, 1 = Factura, etc.
  Referencia?: string;
  Numero: number;
  Fecha: string; // Formato: YYYY-MM-DD
  ID_Cliente: number;
  ID_DireccionEnvio?: number;
  Cliente?: Partial<ClienteERP>; // Si ID_Cliente = 0
  EtiquetaCliente?: string;
  ID_Agente1?: number;
  ID_Agente2?: number;
  ID_Agente3?: number;
  ID_MetodoPago?: number;
  Peso?: number;
  Bultos?: number;
  TipoPortes?: number; // 1 = Pagados, 2 = Debidos
  Portes?: number;
  PreciosImpIncluidos: boolean;
  BaseImponible: number;
  TotalImporte: number;
  Comentario?: string;
  Descripcion?: string;
  Contenido: LineaDocumento[];
  Pagos?: PagoDocumento[];
}

export async function crearDocumentoVenta(documento: DocumentoCliente): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Documento guardado localmente (ERP deshabilitado)');
    // Simular respuesta exitosa del ERP
    return {
      InfoError: {
        Codigo: 0,
        Descripcion: 'OK - Modo Offline'
      },
      Id: Math.floor(Math.random() * 10000), // ID simulado
      Numero: Math.floor(Math.random() * 1000)
    };
  }

  try {
    const body = {
      sesionwcf: SESSION_ID,
      ...documento,
    };
    
    console.log('📤 Enviando documento al ERP:', body);
    
    const response = await fetch(`${ERP_BASE_URL}/NuevoDocClienteWS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Documento creado en ERP:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al crear documento en ERP:', error);
    throw error;
  }
}

export async function actualizarDocumento(id: number, cambios: any): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Documento actualizado localmente (ERP deshabilitado)');
    return {
      InfoError: {
        Codigo: 0,
        Descripcion: 'OK - Modo Offline'
      }
    };
  }

  try {
    const response = await fetch(`${ERP_BASE_URL}/UpdateDocClienteWS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sesionwcf: SESSION_ID,
        Id: id,
        ...cambios,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Documento actualizado en ERP:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al actualizar documento en ERP:', error);
    throw error;
  }
}

// ============================================================================
// PAGOS
// ============================================================================

export interface NuevoPago {
  ID_DocCli: number; // ID del documento al que se asocia el pago
  ID_MetodoPago: number;
  Fecha: string; // Formato: YYYY-MM-DD
  Importe: number;
}

export async function registrarPago(pago: NuevoPago): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Pago guardado localmente (ERP deshabilitado)');
    return {
      InfoError: {
        Codigo: 0,
        Descripcion: 'OK - Modo Offline'
      },
      Id: Math.floor(Math.random() * 10000)
    };
  }

  try {
    console.log('💰 Registrando pago en ERP:', pago);
    
    const response = await fetch(`${ERP_BASE_URL}/NuevoPagoWS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sesionwcf: SESSION_ID,
        ...pago,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Pago registrado en ERP:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al registrar pago en ERP:', error);
    throw error;
  }
}

// ============================================================================
// HISTORIAL
// ============================================================================

export async function getHistorialPedidos(
  id_cliente: number,
  fechaDesde: string,
  fechaHasta: string
): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Sin historial disponible (ERP deshabilitado)');
    return [];
  }

  try {
    const url = `${ERP_BASE_URL}/GetHistorialPedidosWS?x=${SESSION_ID}&id_cliente=${id_cliente}&fechadesde=${fechaDesde}&fechahasta=${fechaHasta}`;
    
    console.log('📜 Obteniendo historial de pedidos del ERP');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error al obtener historial del ERP:', error);
    throw error;
  }
}

export async function getEstadoPedidos(pedidos: Array<{ Id?: number; Referencia?: string }>): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Sin estado de pedidos disponible (ERP deshabilitado)');
    return [];
  }

  try {
    const response = await fetch(`${ERP_BASE_URL}/EstadoPedidosWS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sesionwcf: SESSION_ID,
        Pedidos: pedidos,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error al obtener estado de pedidos del ERP:', error);
    throw error;
  }
}

// ============================================================================
// UTILIDADES
// ============================================================================

export async function getNextNumDocs(): Promise<any> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE - Usando numeración local (ERP deshabilitado)');
    return {
      NumeroFactura: Math.floor(Math.random() * 1000),
      NumeroPedido: Math.floor(Math.random() * 1000),
      NumeroAlbaran: Math.floor(Math.random() * 1000)
    };
  }

  try {
    const url = `${ERP_BASE_URL}/GetNextNumDocsWS?x=${SESSION_ID}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error al obtener próxima numeración del ERP:', error);
    throw error;
  }
}

export async function getVersion(): Promise<string> {
  if (!ERP_ENABLED) {
    console.log('💾 Modo OFFLINE (ERP deshabilitado)');
    return 'Modo Offline - ERP deshabilitado';
  }

  try {
    const url = `${ERP_BASE_URL}/GetVersionWS?x=${SESSION_ID}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📌 Versión del ERP:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al obtener versión del ERP:', error);
    throw error;
  }
}

// ============================================================================
// MAPPERS
// ============================================================================

export function mapearClienteERPaLocal(clienteERP: ClienteERP) {
  return {
    id: clienteERP.Id.toString(),
    nombre: clienteERP.Nombre || '',
    empresa: clienteERP.RazonSocial || clienteERP.Nombre,
    direccion: `${clienteERP.Direccion || ''} — ${clienteERP.Localidad || ''}`,
    telefono: clienteERP.Telefono || '',
    email: clienteERP.Email || '',
    ultimaVisita: 'No registrada',
    // Datos adicionales del ERP
    nif: clienteERP.NIF,
    codigoPostal: clienteERP.CPostal,
    provincia: clienteERP.Provincia,
  };
}

export function mapearArticuloERPaLocal(articuloERP: ArticuloERP) {
  return {
    id: articuloERP.Id.toString(),
    nombre: articuloERP.Nombre,
    cantidad: articuloERP.Stock || 0,
    categoria: 'General', // TODO: mapear categoría
    precio: `${articuloERP.PVP.toFixed(2)} €`,
    stockMinimo: articuloERP.StockMinimo || 0,
    proveedor: 'Proveedor', // TODO: obtener del ERP
  };
}

// ============================================================================
// DATOS MOCK
// ============================================================================

function getMockClientes(): ClienteERP[] {
  return [
    {
      Id: 100,
      Nombre: 'ALVAREZ CORDERO CONSUELO',
      RazonSocial: 'ALVAREZ C. CONSUELO E HIJOS',
      Direccion: 'Barrio Catalunya',
      Localidad: 'Trubia',
      CPostal: '33100',
      Provincia: 'Asturias',
      Telefono: '985 123 456',
      Email: 'alvarez@example.com',
      NIF: 'B33123456',
      DtoComercial: 0,
      DtoPPago: 0,
      FormaPago: 1
    },
    {
      Id: 105,
      Nombre: 'Boutique Encanto',
      RazonSocial: 'Boutique Encanto S.L.',
      Direccion: 'C/ Comercio 45',
      Localidad: 'Oviedo',
      CPostal: '33001',
      Provincia: 'Asturias',
      Telefono: '985 234 567',
      Email: 'info@boutiqueencanto.es',
      NIF: 'B33234567',
      DtoComercial: 5,
      DtoPPago: 0,
      FormaPago: 2
    },
    {
      Id: 300,
      Nombre: 'RAMIRO FERNANDEZ',
      RazonSocial: 'Restaurante La Gallina Loca',
      Direccion: 'C/ Doctor Fleming 1',
      Localidad: 'Lugones',
      CPostal: '33420',
      Provincia: 'Asturias',
      Telefono: '985 345 678',
      Email: 'restaurante@gallinaloca.es',
      NIF: 'B33345678',
      DtoComercial: 0,
      DtoPPago: 0,
      FormaPago: 1
    },
    {
      Id: 302,
      Nombre: 'SUPERMERCADO EL PINO',
      RazonSocial: 'Supermercado El Pino',
      Direccion: 'C/ del Centro 11',
      Localidad: 'Lugones',
      CPostal: '33420',
      Provincia: 'Asturias',
      Telefono: '985 456 789',
      Email: 'info@elpino.es',
      NIF: 'B33456789',
      DtoComercial: 10,
      DtoPPago: 2,
      FormaPago: 3
    },
    {
      Id: 902,
      Nombre: 'BAR ANTONIO Y MOD',
      RazonSocial: 'La Taberna',
      Direccion: 'Calle La Libertad 55',
      Localidad: 'Oza',
      CPostal: '33158',
      Provincia: 'Asturias',
      Telefono: '985 567 890',
      Email: 'bar@antonio.es',
      NIF: 'B33567890',
      DtoComercial: 0,
      DtoPPago: 0,
      FormaPago: 1
    },
    {
      Id: 150,
      Nombre: 'Distribuciones Rivera',
      RazonSocial: 'Distribuciones Rivera S.L.',
      Direccion: 'Polígono Industrial Norte',
      Localidad: 'Gijón',
      CPostal: '33203',
      Provincia: 'Asturias',
      Telefono: '985 678 901',
      Email: 'ventas@rivera.es',
      NIF: 'B33678901',
      DtoComercial: 7.5,
      DtoPPago: 0,
      FormaPago: 5
    },
    {
      Id: 200,
      Nombre: 'Almacenes López',
      RazonSocial: 'Almacenes López S.A.',
      Direccion: 'Calle Mayor 78',
      Localidad: 'Avilés',
      CPostal: '33400',
      Provincia: 'Asturias',
      Telefono: '985 789 012',
      Email: 'info@almalopez.es',
      NIF: 'A33789012',
      DtoComercial: 12,
      DtoPPago: 3,
      FormaPago: 3
    }
  ];
}

function getMockArticulos(): ArticuloERP[] {
  return [
    {
      Id: 1,
      Codigo: '001',
      Nombre: 'Croqueta Jamón',
      Descripcion: 'Croqueta de jamón serrano congelada',
      PVP: 12.50,
      Stock: 100,
      StockMinimo: 20
    },
    {
      Id: 2,
      Codigo: '002',
      Nombre: 'Croqueta Pollo',
      Descripcion: 'Croqueta de pollo congelada',
      PVP: 11.00,
      Stock: 85,
      StockMinimo: 20
    },
    {
      Id: 3,
      Codigo: '003',
      Nombre: 'Empanadilla Atún',
      Descripcion: 'Empanadilla de atún congelada',
      PVP: 10.50,
      Stock: 120,
      StockMinimo: 30
    },
    {
      Id: 4,
      Codigo: '004',
      Nombre: 'Pizza Margarita',
      Descripcion: 'Pizza margarita congelada',
      PVP: 15.00,
      Stock: 60,
      StockMinimo: 15
    },
    {
      Id: 5,
      Codigo: '005',
      Nombre: 'Lasaña Boloñesa',
      Descripcion: 'Lasaña de carne boloñesa',
      PVP: 18.00,
      Stock: 45,
      StockMinimo: 10
    },
    {
      Id: 6,
      Codigo: '006',
      Nombre: 'Guisantes Congelados',
      Descripcion: 'Guisantes congelados bolsa 1kg',
      PVP: 3.50,
      Stock: 200,
      StockMinimo: 50
    },
    {
      Id: 7,
      Codigo: '007',
      Nombre: 'Pimientos Asados',
      Descripcion: 'Pimientos asados en conserva',
      PVP: 8.00,
      Stock: 75,
      StockMinimo: 20
    },
    {
      Id: 8,
      Codigo: '008',
      Nombre: 'Tortilla Española',
      Descripcion: 'Tortilla de patata congelada',
      PVP: 14.00,
      Stock: 50,
      StockMinimo: 15
    },
    {
      Id: 9,
      Codigo: '009',
      Nombre: 'Nuggets Pollo',
      Descripcion: 'Nuggets de pollo congelados',
      PVP: 9.50,
      Stock: 15,
      StockMinimo: 25
    },
    {
      Id: 10,
      Codigo: '010',
      Nombre: 'Espinacas Congeladas',
      Descripcion: 'Espinacas congeladas bolsa 1kg',
      PVP: 4.00,
      Stock: 180,
      StockMinimo: 40
    }
  ];
}
