/**
 * Tipos Globales de la Aplicación
 */

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
  clienteId?: string;
  generoCobro?: boolean;
  cobroId?: string;
  formaPago?: string;
}

export interface Cobro {
  id: string;
  cliente: string;
  monto: string;
  fecha: string;
  estado: 'pendiente' | 'pagado';
  notaVentaId?: string;
  clienteId?: string;
  formaPago?: string;
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

export interface Visita {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fecha: string;
  hora: string;
  duracionEstimada?: number;
  tipo: 'planificada' | 'visita_fria' | 'seguimiento' | 'urgente';
  estado: 'pendiente' | 'completada' | 'cancelada' | 'reprogramada';
  prioridad: 'baja' | 'media' | 'alta';
  notas?: string;
  direccion?: string;
  objetivos?: string[];
  resultadoVisita?: {
    realizada: boolean;
    ventaGenerada: boolean;
    notaVentaId?: string;
    observaciones?: string;
    proximoContacto?: string;
  };
  createdAt: number;
  updatedAt: number;
}
