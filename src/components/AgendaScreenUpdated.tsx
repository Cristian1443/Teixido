import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { agendaService, Visita } from '../services/agenda.service';
import { Cliente } from '../App';

interface AgendaScreenProps {
  onNavigate?: (screen: string) => void;
  clientes?: Cliente[];
}

export default function AgendaScreenUpdated({ onNavigate, clientes = [] }: AgendaScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVisita, setEditingVisita] = useState<Visita | null>(null);
  const [viewMode, setViewMode] = useState<'dia' | 'semana'>('dia');

  const [formData, setFormData] = useState({
    clienteId: '',
    fecha: selectedDate,
    hora: '09:00',
    duracionEstimada: 60,
    tipo: 'planificada' as Visita['tipo'],
    prioridad: 'media' as Visita['prioridad'],
    notas: '',
    objetivos: [] as string[]
  });

  useEffect(() => {
    loadVisitas();
  }, [selectedDate, viewMode]);

  const loadVisitas = () => {
    if (viewMode === 'dia') {
      setVisitas(agendaService.getVisitasPorFecha(selectedDate));
    } else {
      setVisitas(agendaService.getVisitasSemana());
    }
  };

  const handleCreateVisita = () => {
    if (!formData.clienteId) {
      alert('Seleccione un cliente');
      return;
    }

    const cliente = clientes.find(c => c.id === formData.clienteId);
    if (!cliente) return;

    if (agendaService.verificarConflicto(formData.fecha, formData.hora, formData.duracionEstimada)) {
      if (!confirm('Ya existe una visita en este horario. ¿Desea continuar?')) {
        return;
      }
    }

    const visitaData = {
      clienteId: formData.clienteId,
      clienteNombre: cliente.empresa || cliente.nombre,
      fecha: formData.fecha,
      hora: formData.hora,
      duracionEstimada: formData.duracionEstimada,
      tipo: formData.tipo,
      estado: 'pendiente' as const,
      prioridad: formData.prioridad,
      notas: formData.notas,
      direccion: cliente.direccion,
      objetivos: formData.objetivos.filter(o => o.trim())
    };

    if (editingVisita) {
      agendaService.actualizarVisita(editingVisita.id, visitaData);
    } else {
      agendaService.crearVisita(visitaData);
    }

    loadVisitas();
    resetForm();
  };

  const handleDeleteVisita = (id: string) => {
    if (confirm('¿Eliminar esta visita?')) {
      agendaService.eliminarVisita(id);
      loadVisitas();
    }
  };

  const handleCompletarVisita = (visita: Visita) => {
    const ventaGenerada = confirm('¿Se generó una venta en esta visita?');
    const observaciones = prompt('Observaciones de la visita:');

    agendaService.completarVisita(visita.id, {
      realizada: true,
      ventaGenerada,
      observaciones: observaciones || '',
      proximoContacto: ventaGenerada ? '' : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    loadVisitas();
  };

  const handleReprogramar = (visita: Visita) => {
    const nuevaFecha = prompt('Nueva fecha (YYYY-MM-DD):', visita.fecha);
    const nuevaHora = prompt('Nueva hora (HH:MM):', visita.hora);

    if (nuevaFecha && nuevaHora) {
      agendaService.reprogramarVisita(visita.id, nuevaFecha, nuevaHora);
      loadVisitas();
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingVisita(null);
    setFormData({
      clienteId: '',
      fecha: selectedDate,
      hora: '09:00',
      duracionEstimada: 60,
      tipo: 'planificada',
      prioridad: 'media',
      notas: '',
      objetivos: []
    });
  };

  const getEstadisticas = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const visitasHoy = agendaService.getVisitasHoy();
    const pendientes = visitasHoy.filter(v => v.estado === 'pendiente').length;
    const completadas = visitasHoy.filter(v => v.estado === 'completada').length;

    return { total: visitasHoy.length, pendientes, completadas };
  };

  const stats = getEstadisticas();

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navigation currentScreen="agenda" onNavigate={onNavigate || (() => {})} />

      <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Agenda de Visitas</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setViewMode(viewMode === 'dia' ? 'semana' : 'dia')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {viewMode === 'dia' ? 'Ver Semana' : 'Ver Día'}
              </button>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                + Nueva Visita
              </button>
            </div>
          </div>

          {/* Estadísticas del día */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Hoy</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
            </div>
            <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Pendientes</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>{stats.pendientes}</div>
            </div>
            <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Completadas</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{stats.completadas}</div>
            </div>
          </div>
        </div>

        {/* Selector de fecha */}
        {viewMode === 'dia' && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                width: '200px'
              }}
            />
          </div>
        )}

        {/* Lista de visitas */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {visitas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No hay visitas programadas
            </div>
          ) : (
            visitas.map((visita) => (
              <div
                key={visita.id}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{visita.hora}</span>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{visita.clienteNombre}</span>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: 
                          visita.estado === 'completada' ? '#d1fae5' :
                          visita.estado === 'pendiente' ? '#fef3c7' :
                          visita.estado === 'cancelada' ? '#fee2e2' : '#e0e7ff',
                        color:
                          visita.estado === 'completada' ? '#065f46' :
                          visita.estado === 'pendiente' ? '#92400e' :
                          visita.estado === 'cancelada' ? '#991b1b' : '#3730a3'
                      }}
                    >
                      {visita.estado.toUpperCase()}
                    </span>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor:
                          visita.prioridad === 'alta' ? '#fecaca' :
                          visita.prioridad === 'media' ? '#fed7aa' : '#d1d5db',
                        color:
                          visita.prioridad === 'alta' ? '#7f1d1d' :
                          visita.prioridad === 'media' ? '#7c2d12' : '#374151'
                      }}
                    >
                      {visita.prioridad.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {visita.direccion}
                  </div>
                  {visita.notas && (
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', fontStyle: 'italic' }}>
                      {visita.notas}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {visita.estado === 'pendiente' && (
                    <>
                      <button
                        onClick={() => handleCompletarVisita(visita)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Completar
                      </button>
                      <button
                        onClick={() => handleReprogramar(visita)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Reprogramar
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteVisita(visita.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Nueva Visita */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => resetForm()}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>
              {editingVisita ? 'Editar Visita' : 'Nueva Visita'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Cliente
                </label>
                <select
                  value={formData.clienteId}
                  onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.empresa || c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Hora
                  </label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Tipo
                  </label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as Visita['tipo'] })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="planificada">Planificada</option>
                    <option value="visita_fria">Visita Fría</option>
                    <option value="seguimiento">Seguimiento</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Prioridad
                  </label>
                  <select
                    value={formData.prioridad}
                    onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as Visita['prioridad'] })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Notas
                </label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button
                  onClick={handleCreateVisita}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  {editingVisita ? 'Actualizar' : 'Crear Visita'}
                </button>
                <button
                  onClick={resetForm}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
