import React, { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-dhibdxclj0';
import Navigation from './Navigation';
import { NotaVenta, Cobro, Cliente } from '../App';

interface AgendaScreenProps {
  onNavigate?: (screen: string) => void;
  notasVenta?: NotaVenta[];
  cobros?: Cobro[];
  clientes?: Cliente[];
}

interface ClienteDelDia {
  id: string;
  nombre: string;
  hora: string;
  tipo: 'visita' | 'entrega' | 'cobro';
  direccion: string;
  completado: boolean;
}

export default function AgendaScreen({ onNavigate, notasVenta = [], cobros = [], clientes = [] }: AgendaScreenProps) {
  const [mesActual, setMesActual] = useState('Noviembre');
  const [añoActual] = useState(2025);
  const [diaSeleccionado, setDiaSeleccionado] = useState(1);
  
  // Generar clientes del día basados en datos reales
  const generarClientesDelDia = () => {
    const clientesGenerados: ClienteDelDia[] = [];
    
    // Agregar entregas pendientes desde notas de venta pendientes
    notasVenta
      .filter(nota => nota.estado === 'pendiente')
      .slice(0, 2)
      .forEach((nota, index) => {
        clientesGenerados.push({
          id: `entrega-${index}`,
          nombre: nota.cliente,
          hora: `${9 + index * 2}:00`,
          tipo: 'entrega',
          direccion: clientes.find(c => 
            nota.cliente.includes(c.nombre) || nota.cliente.includes(c.empresa)
          )?.direccion || 'Dirección no especificada',
          completado: false
        });
      });
    
    // Agregar cobros pendientes
    cobros
      .filter(c => c.estado === 'pendiente')
      .slice(0, 2)
      .forEach((cobro, index) => {
        clientesGenerados.push({
          id: `cobro-${cobro.id}`,
          nombre: cobro.cliente,
          hora: `${12 + index * 2}:00`,
          tipo: 'cobro',
          direccion: clientes.find(c => 
            cobro.cliente.includes(c.nombre) || cobro.cliente.includes(c.empresa)
          )?.direccion || 'Dirección no especificada',
          completado: false
        });
      });
    
    // Agregar visitas programadas de clientes recientes
    clientes
      .filter(c => c.ultimaVisita && (c.ultimaVisita.includes('Hoy') || c.ultimaVisita.includes('Ayer')))
      .slice(0, 2)
      .forEach((cliente, index) => {
        clientesGenerados.push({
          id: `visita-${cliente.id}`,
          nombre: cliente.empresa || cliente.nombre,
          hora: `${16 + index}:00`,
          tipo: 'visita',
          direccion: cliente.direccion,
          completado: cliente.ultimaVisita?.includes('Hoy') || false
        });
      });
    
    return clientesGenerados.length > 0 ? clientesGenerados : [
      { id: '1', nombre: 'No hay actividades programadas', hora: '09:00', tipo: 'visita', direccion: '', completado: false }
    ];
  };

  const [clientesDelDia, setClientesDelDia] = useState<ClienteDelDia[]>(generarClientesDelDia());

  // Actualizar clientes cuando cambien los datos
  useEffect(() => {
    setClientesDelDia(generarClientesDelDia());
  }, [notasVenta, cobros, clientes]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    hora: '',
    tipo: 'visita' as 'visita' | 'entrega' | 'cobro',
    direccion: ''
  });

  // Días con visitas - calcular basado en datos reales
  const calcularDiasConVisitas = () => {
    const dias: number[] = [];
    // Agregar el día actual si hay actividades
    if (clientesDelDia.length > 0 && clientesDelDia[0].nombre !== 'No hay actividades programadas') {
      dias.push(diaSeleccionado);
    }
    // Simular algunos días con visitas (esto debería venir de un calendario real)
    for (let i = 1; i <= 30; i++) {
      if (i % 7 === 0 || i % 7 === 1) dias.push(i);
    }
    return dias;
  };
  
  const diasConVisitas = calcularDiasConVisitas();

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'visita': return '#092090';
      case 'entrega': return '#10b981';
      case 'cobro': return '#f59e0b';
      default: return '#697b92';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'visita': return 'Visita';
      case 'entrega': return 'Entrega';
      case 'cobro': return 'Cobro';
      default: return tipo;
    }
  };

  const handleToggleCompletado = (id: string) => {
    setClientesDelDia(clientesDelDia.map(c => 
      c.id === id ? { ...c, completado: !c.completado } : c
    ));
  };

  const handleAddCliente = () => {
    if (!newCliente.nombre || !newCliente.hora || !newCliente.direccion) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoCliente: ClienteDelDia = {
      id: `${clientesDelDia.length + 1}`,
      ...newCliente,
      completado: false
    };

    setClientesDelDia([...clientesDelDia, nuevoCliente].sort((a, b) => a.hora.localeCompare(b.hora)));
    setShowAddModal(false);
    setNewCliente({ nombre: '', hora: '', tipo: 'visita', direccion: '' });
  };

  const handleDeleteCliente = (id: string) => {
    if (confirm('¿Eliminar esta visita de la agenda?')) {
      setClientesDelDia(clientesDelDia.filter(c => c.id !== id));
    }
  };

  const handleDiaClick = (dia: number) => {
    setDiaSeleccionado(dia);
    // En producción, aquí cargarías las visitas de ese día desde el estado global
    console.log(`Día seleccionado: ${dia}`);
  };

  // Calcular estadísticas desde datos reales
  const clientesCompletados = clientesDelDia.filter(c => c.completado).length;
  const ventasHoy = notasVenta.filter(v => v.estado !== 'anulada').length;
  const cobrosPendientes = cobros.filter(c => c.estado === 'pendiente').length;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="agenda" onNavigate={onNavigate || (() => {})} />

      <div style={{ flex: 1, padding: '40px clamp(20px, 5vw, 60px)', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#697b92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: 0 }}>
              Agenda de Visita
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white'
            }}
          >
            + Añadir Visita
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Visitas Completadas</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#10b981', margin: '4px 0 0 0' }}>
              {clientesCompletados}/{clientesDelDia.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Ventas Realizadas</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {ventasHoy}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Cobros Pendientes</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#f59e0b', margin: '4px 0 0 0' }}>
              {cobrosPendientes}
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Calendario */}
          <div style={{ flex: '0 0 450px', minWidth: '300px' }}>
            {/* Selector de mes */}
            <div 
              onClick={() => setShowMonthPicker(!showMonthPicker)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                borderRadius: '42.735px',
                background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
                marginBottom: '20px',
                cursor: 'pointer',
                position: 'relative'
              }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '17px', color: 'white', margin: 0 }}>
                {mesActual} {añoActual}
              </p>
              <svg width="12" height="8" viewBox="0 0 13 8" fill="none">
                <path clipRule="evenodd" d={svgPaths.p3b195b10} fill="white" fillRule="evenodd" />
              </svg>

              {/* Dropdown de meses */}
              {showMonthPicker && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '8px',
                  zIndex: 10,
                  width: '200px'
                }}>
                  {meses.map(mes => (
                    <div
                      key={mes}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMesActual(mes);
                        setShowMonthPicker(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: mesActual === mes ? '#092090' : '#1a1a1a',
                        backgroundColor: mesActual === mes ? '#f0f4ff' : 'transparent',
                        fontWeight: mesActual === mes ? 600 : 400
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = mesActual === mes ? '#f0f4ff' : 'transparent'}
                    >
                      {mes}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Días de la semana */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px', padding: '0 8px' }}>
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((dia, i) => (
                <div key={i} style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  textAlign: 'center',
                }}>
                  {dia}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', padding: '0 8px' }}>
              {/* Días anteriores */}
              {[30, 31].map((dia) => (
                <div key={`prev-${dia}`} style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  color: '#bbb',
                }}>
                  {dia}
                </div>
              ))}

              {/* Días del mes actual */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((dia) => {
                const esHoy = dia === 18;
                const esDiaSeleccionado = dia === diaSeleccionado;
                const tieneVisita = diasConVisitas.includes(dia);
                return (
                  <div 
                    key={dia}
                    onClick={() => handleDiaClick(dia)}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: tieneVisita || esHoy || esDiaSeleccionado ? 700 : 500,
                      fontSize: '18px',
                      color: esHoy ? 'white' : esDiaSeleccionado ? 'white' : tieneVisita ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                      backgroundColor: esHoy ? '#171821' : esDiaSeleccionado ? '#5a6fd8' : undefined,
                      backgroundImage: tieneVisita && !esHoy && !esDiaSeleccionado ? 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)' : undefined,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: esDiaSeleccionado ? '2px solid #092090' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!esHoy && !esDiaSeleccionado) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!esHoy && !esDiaSeleccionado && !tieneVisita) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {dia}
                  </div>
                );
              })}

              {/* Días siguientes */}
              {Array.from({ length: 10 }, (_, i) => i + 1).map((dia) => (
                <div key={`next-${dia}`} style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  color: '#bbb',
                }}>
                  {dia}
                </div>
              ))}
            </div>

            {/* Leyenda */}
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#697b92', margin: '0 0 8px 0' }}>
                Leyenda:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#171821' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#697b92' }}>Hoy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#697b92' }}>Con visitas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#5a6fd8', border: '2px solid #092090' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#697b92' }}>Día seleccionado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de clientes del día */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px', color: '#1a1a1a', margin: '0 0 20px 0' }}>
              Clientes del día - {diaSeleccionado} de {mesActual}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {clientesDelDia.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                    No hay visitas programadas para este día
                  </p>
                </div>
              ) : (
                clientesDelDia.map((cliente) => (
                  <div key={cliente.id} style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgb(226, 232, 240)',
                    backgroundColor: cliente.completado ? '#f0fdf4' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    opacity: cliente.completado ? 0.7 : 1
                  }}>
                    <div style={{
                      width: '6px',
                      height: '50px',
                      borderRadius: '3px',
                      backgroundColor: getTipoColor(cliente.tipo),
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '15px',
                          color: '#1a1a1a',
                          margin: 0,
                          textDecoration: cliente.completado ? 'line-through' : 'none'
                        }}>
                          {cliente.nombre}
                        </p>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '10px',
                          backgroundColor: getTipoColor(cliente.tipo) + '20',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: getTipoColor(cliente.tipo),
                        }}>
                          {getTipoLabel(cliente.tipo)}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#697b92', margin: 0 }}>
                        {cliente.direccion}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f1f5f9',
                      }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', margin: 0 }}>
                          {cliente.hora}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleCompletado(cliente.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: `2px solid ${cliente.completado ? '#10b981' : '#e2e8f0'}`,
                          backgroundColor: cliente.completado ? '#10b981' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px'
                        }}
                      >
                        {cliente.completado && '✓'}
                      </button>
                      <button
                        onClick={() => handleDeleteCliente(cliente.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #fee2e2',
                          backgroundColor: '#fee2e2',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#dc2626',
                          fontWeight: 600,
                          fontSize: '20px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal para añadir cliente */}
        {showAddModal && (
          <div
            onClick={() => setShowAddModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%'
              }}
            >
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '0 0 24px 0' }}>
                Añadir Visita
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                    Cliente
                  </label>
                  <input
                    type="text"
                    value={newCliente.nombre}
                    onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
                    placeholder="Nombre del cliente"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                    Hora
                  </label>
                  <input
                    type="time"
                    value={newCliente.hora}
                    onChange={(e) => setNewCliente({ ...newCliente, hora: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                    Tipo
                  </label>
                  <select
                    value={newCliente.tipo}
                    onChange={(e) => setNewCliente({ ...newCliente, tipo: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="visita">Visita</option>
                    <option value="entrega">Entrega</option>
                    <option value="cobro">Cobro</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={newCliente.direccion}
                    onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
                    placeholder="Dirección del cliente"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#697b92'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddCliente}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(to right, #092090, #0C2ABF)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
