/**
 * Servicio de Sincronización con Manejo Robusto de Errores
 */

import { crearDocumentoVenta, registrarPago } from './erp.service';

export interface SyncOperation {
  id: string;
  type: 'venta' | 'pago' | 'cliente' | 'gasto';
  data: any;
  timestamp: number;
  retries: number;
  lastError?: string;
  status: 'pending' | 'syncing' | 'success' | 'error';
}

export interface SyncError {
  codigo: number;
  descripcion: string;
  timestamp: number;
  operation: SyncOperation;
}

class SyncService {
  private queue: SyncOperation[] = [];
  private errors: SyncError[] = [];
  private isSyncing: boolean = false;
  private maxRetries: number = 3;

  constructor() {
    this.loadQueue();
    this.loadErrors();
  }

  // Agregar operación a la cola
  addToQueue(type: SyncOperation['type'], data: any): string {
    const operation: SyncOperation = {
      id: this.generateId(),
      type,
      data,
      timestamp: Date.now(),
      retries: 0,
      status: 'pending'
    };

    this.queue.push(operation);
    this.saveQueue();
    
    return operation.id;
  }

  // Procesar cola completa
  async processQueue(): Promise<void> {
    if (this.isSyncing) {
      console.log('Sincronización ya en progreso');
      return;
    }

    this.isSyncing = true;
    const pendingOps = this.queue.filter(op => op.status === 'pending' || op.status === 'error');

    for (const operation of pendingOps) {
      if (operation.retries >= this.maxRetries) {
        console.error(`Operación ${operation.id} excedió reintentos máximos`);
        continue;
      }

      await this.processOperation(operation);
    }

    this.isSyncing = false;
    this.saveQueue();
  }

  // Procesar operación individual
  private async processOperation(operation: SyncOperation): Promise<void> {
    operation.status = 'syncing';
    operation.retries++;

    try {
      let result: any;

      switch (operation.type) {
        case 'venta':
          result = await this.syncVenta(operation.data);
          break;
        case 'pago':
          result = await this.syncPago(operation.data);
          break;
        case 'cliente':
          result = await this.syncCliente(operation.data);
          break;
        case 'gasto':
          result = await this.syncGasto(operation.data);
          break;
        default:
          throw new Error(`Tipo de operación desconocido: ${operation.type}`);
      }

      if (result.success) {
        operation.status = 'success';
        this.removeFromQueue(operation.id);
      } else {
        this.handleSyncError(operation, result.error);
      }
    } catch (error: any) {
      this.handleSyncError(operation, {
        codigo: -1,
        descripcion: error.message || 'Error de conexión'
      });
    }
  }

  // Sincronizar venta
  private async syncVenta(ventaData: any): Promise<any> {
    try {
      const documento = {
        sesionwcf: '',
        Id: 0,
        Tipo: 5, // Pedido
        Referencia: ventaData.id || '',
        Fecha: ventaData.fecha || new Date().toISOString().split('T')[0],
        ID_Cliente: this.parseClienteId(ventaData.cliente?.id),
        ID_Agente: 0,
        PreciosImpIncluidos: true,
        BaseImponible: this.parseMonto(ventaData.totales?.subtotal),
        TotalImporte: this.parseMonto(ventaData.totales?.total),
        Contenido: (ventaData.articulos || []).map((art: any) => ({
          TipoRegistro: 1,
          ID_Articulo: this.parseArticuloId(art.articuloId),
          Precio: parseFloat(art.precioUnitario) || 0,
          Dto: parseFloat(art.descuento) || 0,
          DtoPPago: 0,
          DtoEurosXUd: 0,
          DtoEuros: 0,
          Uds: parseFloat(art.cantidad) || 0,
          UdsRegalo: 0,
          UdsAuxiliares: 0,
          ImporteLinea: parseFloat(art.precioUnitario) * parseFloat(art.cantidad),
          PorcentajeIVA: 21,
          PorcentajeRE: 0,
          DescripcionAmplia: art.nota || null
        })),
        Pagos: this.buildPagos(ventaData)
      };

      const response = await crearDocumentoVenta(documento);

      if (response.InfoError) {
        if (response.InfoError.Codigo === 0) {
          return { success: true, data: response };
        } else {
          return {
            success: false,
            error: {
              codigo: response.InfoError.Codigo,
              descripcion: response.InfoError.Descripcion
            }
          };
        }
      }

      return { success: true, data: response };
    } catch (error: any) {
      return {
        success: false,
        error: {
          codigo: -1,
          descripcion: error.message || 'Error de conexión'
        }
      };
    }
  }

  // Sincronizar pago
  private async syncPago(pagoData: any): Promise<any> {
    try {
      const pago = {
        sesionwcf: '',
        ID_DocCli: this.parseDocumentoId(pagoData.notaVentaId),
        ID_MetodoPago: this.getMetodoPagoId(pagoData.formaPago),
        Fecha: pagoData.fecha || new Date().toISOString().split('T')[0],
        Importe: this.parseMonto(pagoData.monto)
      };

      const response = await registrarPago(pago);

      if (response.InfoError) {
        if (response.InfoError.Codigo === 0) {
          return { success: true, data: response };
        } else {
          return {
            success: false,
            error: {
              codigo: response.InfoError.Codigo,
              descripcion: response.InfoError.Descripcion
            }
          };
        }
      }

      return { success: true, data: response };
    } catch (error: any) {
      return {
        success: false,
        error: {
          codigo: -1,
          descripcion: error.message || 'Error de conexión'
        }
      };
    }
  }

  private async syncCliente(clienteData: any): Promise<any> {
    // TODO: Implementar cuando sea necesario
    return { success: true };
  }

  private async syncGasto(gastoData: any): Promise<any> {
    // TODO: Implementar cuando sea necesario
    return { success: true };
  }

  // Manejar error de sincronización
  private handleSyncError(operation: SyncOperation, error: any): void {
    const syncError: SyncError = {
      codigo: error.codigo || -1,
      descripcion: error.descripcion || 'Error desconocido',
      timestamp: Date.now(),
      operation: { ...operation }
    };

    this.errors.push(syncError);
    
    operation.status = 'error';
    operation.lastError = syncError.descripcion;

    // Códigos de error específicos de Verial
    switch (error.codigo) {
      case 12: // Error creando documento
        console.error(`Error crítico: No se pudo crear documento ${operation.id}`);
        console.error(`Descripción: ${error.descripcion}`);
        // Mantener en cola para revisión manual
        break;
        
      case 13: // Cliente no encontrado
        console.error(`Cliente no encontrado para operación ${operation.id}`);
        // Marcar para corrección
        break;
        
      case 14: // Artículo no encontrado
        console.error(`Artículo no encontrado para operación ${operation.id}`);
        break;
        
      default:
        console.error(`Error ${error.codigo}: ${error.descripcion}`);
    }

    this.saveErrors();
  }

  // Helpers de parsing
  private parseClienteId(id: any): number {
    if (typeof id === 'number') return id;
    if (typeof id === 'string') {
      const parsed = parseInt(id, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  private parseArticuloId(id: any): number {
    if (typeof id === 'number') return id;
    if (typeof id === 'string') {
      const parsed = parseInt(id, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  private parseDocumentoId(id: any): number {
    if (typeof id === 'number') return id;
    if (typeof id === 'string') {
      // Remover prefijo 'P' si existe
      const cleaned = id.replace(/^P/i, '');
      const parsed = parseInt(cleaned, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  private parseMonto(monto: any): number {
    if (typeof monto === 'number') return monto;
    if (typeof monto === 'string') {
      const cleaned = monto.replace(/[€\s,]/g, '').replace('.', '.');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  private getMetodoPagoId(formaPago: string): number {
    const mapeo: Record<string, number> = {
      'Efectivo': 1,
      'Tarjeta de Débito': 2,
      'Tarjeta de Crédito': 3,
      'Transferencia Bancaria': 5,
      'Bizum': 8
    };
    return mapeo[formaPago] || 1;
  }

  private buildPagos(ventaData: any): any[] {
    if (ventaData.estadoPago === 'pagado') {
      return [{
        ID_MetodoPago: this.getMetodoPagoId(ventaData.formaPago || 'Efectivo'),
        Fecha: ventaData.fecha || new Date().toISOString().split('T')[0],
        Importe: this.parseMonto(ventaData.totales?.total)
      }];
    }
    return [];
  }

  // Gestión de cola
  private generateId(): string {
    return `SYNC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private removeFromQueue(id: string): void {
    this.queue = this.queue.filter(op => op.id !== id);
  }

  getQueue(): SyncOperation[] {
    return [...this.queue];
  }

  getErrors(): SyncError[] {
    return [...this.errors];
  }

  getPendingCount(): number {
    return this.queue.filter(op => op.status === 'pending' || op.status === 'error').length;
  }

  clearErrors(): void {
    this.errors = [];
    this.saveErrors();
  }

  // Persistencia
  private saveQueue(): void {
    try {
      localStorage.setItem('syncQueue', JSON.stringify(this.queue));
    } catch (error) {
      console.error('Error guardando cola de sincronización:', error);
    }
  }

  private loadQueue(): void {
    try {
      const stored = localStorage.getItem('syncQueue');
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando cola de sincronización:', error);
      this.queue = [];
    }
  }

  private saveErrors(): void {
    try {
      localStorage.setItem('syncErrors', JSON.stringify(this.errors));
    } catch (error) {
      console.error('Error guardando errores de sincronización:', error);
    }
  }

  private loadErrors(): void {
    try {
      const stored = localStorage.getItem('syncErrors');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando errores de sincronización:', error);
      this.errors = [];
    }
  }
}

export const syncService = new SyncService();
