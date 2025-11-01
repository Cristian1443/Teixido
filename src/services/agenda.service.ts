/**
 * Servicio de Gestión de Agenda de Visitas
 */

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

export interface RutaDiaria {
  fecha: string;
  visitas: Visita[];
  kmEstimados?: number;
  horaInicio?: string;
  horaFin?: string;
  notas?: string;
}

class AgendaService {
  private visitas: Visita[] = [];
  private rutas: Map<string, RutaDiaria> = new Map();

  constructor() {
    this.loadData();
  }

  // Crear visita
  crearVisita(visitaData: Omit<Visita, 'id' | 'createdAt' | 'updatedAt'>): Visita {
    const visita: Visita = {
      ...visitaData,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.visitas.push(visita);
    this.updateRuta(visita.fecha);
    this.saveData();

    return visita;
  }

  // Actualizar visita
  actualizarVisita(id: string, cambios: Partial<Visita>): Visita | null {
    const index = this.visitas.findIndex(v => v.id === id);
    if (index === -1) return null;

    const visitaAnterior = this.visitas[index];
    this.visitas[index] = {
      ...visitaAnterior,
      ...cambios,
      updatedAt: Date.now()
    };

    if (cambios.fecha && cambios.fecha !== visitaAnterior.fecha) {
      this.updateRuta(visitaAnterior.fecha);
      this.updateRuta(cambios.fecha);
    } else {
      this.updateRuta(this.visitas[index].fecha);
    }

    this.saveData();
    return this.visitas[index];
  }

  // Eliminar visita
  eliminarVisita(id: string): boolean {
    const visita = this.visitas.find(v => v.id === id);
    if (!visita) return false;

    this.visitas = this.visitas.filter(v => v.id !== id);
    this.updateRuta(visita.fecha);
    this.saveData();

    return true;
  }

  // Completar visita
  completarVisita(
    id: string,
    resultado: Visita['resultadoVisita']
  ): Visita | null {
    const visita = this.visitas.find(v => v.id === id);
    if (!visita) return null;

    visita.estado = 'completada';
    visita.resultadoVisita = resultado;
    visita.updatedAt = Date.now();

    this.updateRuta(visita.fecha);
    this.saveData();

    return visita;
  }

  // Reprogramar visita
  reprogramarVisita(id: string, nuevaFecha: string, nuevaHora: string): Visita | null {
    const visita = this.visitas.find(v => v.id === id);
    if (!visita) return null;

    const fechaAnterior = visita.fecha;

    visita.fecha = nuevaFecha;
    visita.hora = nuevaHora;
    visita.estado = 'reprogramada';
    visita.updatedAt = Date.now();

    this.updateRuta(fechaAnterior);
    this.updateRuta(nuevaFecha);
    this.saveData();

    return visita;
  }

  // Obtener visita por ID
  getVisita(id: string): Visita | null {
    return this.visitas.find(v => v.id === id) || null;
  }

  // Obtener visitas por fecha
  getVisitasPorFecha(fecha: string): Visita[] {
    return this.visitas
      .filter(v => v.fecha === fecha)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  // Obtener visitas por cliente
  getVisitasPorCliente(clienteId: string): Visita[] {
    return this.visitas
      .filter(v => v.clienteId === clienteId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  // Obtener visitas pendientes
  getVisitasPendientes(): Visita[] {
    const hoy = new Date().toISOString().split('T')[0];
    return this.visitas
      .filter(v => v.estado === 'pendiente' && v.fecha >= hoy)
      .sort((a, b) => {
        const cmpFecha = a.fecha.localeCompare(b.fecha);
        if (cmpFecha !== 0) return cmpFecha;
        return a.hora.localeCompare(b.hora);
      });
  }

  // Obtener visitas del día
  getVisitasHoy(): Visita[] {
    const hoy = new Date().toISOString().split('T')[0];
    return this.getVisitasPorFecha(hoy);
  }

  // Obtener visitas de la semana
  getVisitasSemana(): Visita[] {
    const hoy = new Date();
    const diasSemana = 7;
    const fechas: string[] = [];

    for (let i = 0; i < diasSemana; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      fechas.push(fecha.toISOString().split('T')[0]);
    }

    return this.visitas
      .filter(v => fechas.includes(v.fecha))
      .sort((a, b) => {
        const cmpFecha = a.fecha.localeCompare(b.fecha);
        if (cmpFecha !== 0) return cmpFecha;
        return a.hora.localeCompare(b.hora);
      });
  }

  // Obtener ruta del día
  getRutaDia(fecha: string): RutaDiaria {
    if (!this.rutas.has(fecha)) {
      this.updateRuta(fecha);
    }
    return this.rutas.get(fecha)!;
  }

  // Verificar conflictos
  verificarConflicto(fecha: string, hora: string, duracion: number = 60): boolean {
    const visitasDelDia = this.getVisitasPorFecha(fecha);
    
    const horaInicio = this.parseHora(hora);
    const horaFin = horaInicio + duracion;

    for (const visita of visitasDelDia) {
      if (visita.estado === 'cancelada') continue;

      const vInicio = this.parseHora(visita.hora);
      const vFin = vInicio + (visita.duracionEstimada || 60);

      if ((horaInicio >= vInicio && horaInicio < vFin) ||
          (horaFin > vInicio && horaFin <= vFin) ||
          (horaInicio <= vInicio && horaFin >= vFin)) {
        return true;
      }
    }

    return false;
  }

  // Sugerir próximo horario disponible
  sugerirHorario(fecha: string, duracion: number = 60): string | null {
    const horaInicio = 8 * 60; // 8:00 AM
    const horaFin = 20 * 60; // 8:00 PM
    const intervalo = 30; // minutos

    for (let minutos = horaInicio; minutos < horaFin; minutos += intervalo) {
      const hora = this.formatHora(minutos);
      if (!this.verificarConflicto(fecha, hora, duracion)) {
        return hora;
      }
    }

    return null;
  }

  // Estadísticas
  getEstadisticas(desde?: string, hasta?: string): any {
    let visitasFiltradas = this.visitas;

    if (desde) {
      visitasFiltradas = visitasFiltradas.filter(v => v.fecha >= desde);
    }
    if (hasta) {
      visitasFiltradas = visitasFiltradas.filter(v => v.fecha <= hasta);
    }

    const total = visitasFiltradas.length;
    const completadas = visitasFiltradas.filter(v => v.estado === 'completada').length;
    const pendientes = visitasFiltradas.filter(v => v.estado === 'pendiente').length;
    const canceladas = visitasFiltradas.filter(v => v.estado === 'cancelada').length;
    
    const conVenta = visitasFiltradas.filter(
      v => v.resultadoVisita?.ventaGenerada
    ).length;

    const tasaExito = completadas > 0 ? (conVenta / completadas) * 100 : 0;

    return {
      total,
      completadas,
      pendientes,
      canceladas,
      reprogramadas: visitasFiltradas.filter(v => v.estado === 'reprogramada').length,
      conVenta,
      sinVenta: completadas - conVenta,
      tasaExito: tasaExito.toFixed(1)
    };
  }

  // Helpers privados
  private updateRuta(fecha: string): void {
    const visitas = this.getVisitasPorFecha(fecha);
    
    const ruta: RutaDiaria = {
      fecha,
      visitas,
      horaInicio: visitas.length > 0 ? visitas[0].hora : undefined,
      horaFin: visitas.length > 0 ? visitas[visitas.length - 1].hora : undefined
    };

    this.rutas.set(fecha, ruta);
  }

  private parseHora(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  }

  private formatHora(minutos: number): string {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  private generateId(): string {
    return `VIS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Persistencia
  private saveData(): void {
    try {
      localStorage.setItem('agendaVisitas', JSON.stringify(this.visitas));
    } catch (error) {
      console.error('Error guardando agenda:', error);
    }
  }

  private loadData(): void {
    try {
      const stored = localStorage.getItem('agendaVisitas');
      if (stored) {
        this.visitas = JSON.parse(stored);
        
        // Reconstruir rutas
        const fechasUnicas = [...new Set(this.visitas.map(v => v.fecha))];
        fechasUnicas.forEach(fecha => this.updateRuta(fecha));
      }
    } catch (error) {
      console.error('Error cargando agenda:', error);
      this.visitas = [];
    }
  }

  // Exportar/Importar
  exportarAgenda(): string {
    return JSON.stringify({
      visitas: this.visitas,
      exportadoEn: Date.now()
    });
  }

  importarAgenda(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.visitas && Array.isArray(parsed.visitas)) {
        this.visitas = parsed.visitas;
        this.saveData();
        
        const fechasUnicas = [...new Set(this.visitas.map(v => v.fecha))];
        fechasUnicas.forEach(fecha => this.updateRuta(fecha));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importando agenda:', error);
      return false;
    }
  }
}

export const agendaService = new AgendaService();
