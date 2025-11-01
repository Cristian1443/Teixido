import React, { useState } from 'react';
import svgPaths from '../imports/svg-qvtmukqo9s';
import Navigation from './Navigation';
import { NotaAlmacen } from '../App';

interface NotasAlmacenScreenProps {
  onNavigate?: (screen: string) => void;
  notasAlmacen: NotaAlmacen[];
  onAddNota: (nota: NotaAlmacen) => void;
}

export default function NotasAlmacenScreen({ onNavigate, notasAlmacen: notasIniciales, onAddNota }: NotasAlmacenScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('Todas');
  const [showModal, setShowModal] = useState(false);
  const [selectedNota, setSelectedNota] = useState<NotaAlmacen | null>(null);

  const tiposNota = ['Todas', 'Carga Camion', 'Descarga Camion', 'Inventario Camion', 'Intercambio Entrada', 'Intercambio Salida'];

  const filteredNotas = notasIniciales.filter((nota) => {
    const matchesSearch = nota.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.usuario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = selectedTipo === 'Todas' || nota.tipo === selectedTipo;
    return matchesSearch && matchesTipo;
  });

  const handleVerDetalle = (nota: NotaAlmacen) => {
    setSelectedNota(nota);
    setShowModal(true);
  };

  const getIconForTipo = (tipo: string) => {
    switch (tipo) {
      case 'Carga Camion':
        return '📦';
      case 'Descarga Camion':
        return '📥';
      case 'Inventario Camion':
        return '📋';
      case 'Intercambio Entrada':
        return '⬇️';
      case 'Intercambio Salida':
        return '⬆️';
      default:
        return '📄';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="notasAlmacen" onNavigate={onNavigate || (() => {})} />

      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate && onNavigate('almacen')}
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
              Notas de Almacén
            </h1>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
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
            Ver Dashboard
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Notas</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {filteredNotas.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Hoy</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {notasIniciales.filter(n => n.fecha.includes('Hoy')).length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Esta Semana</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {notasIniciales.filter(n => n.fecha.includes('Hace') && !n.fecha.includes('5')).length}
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '30px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            gap: '14px',
            flex: 1,
            minWidth: '300px'
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
                flex: 1
              }}
            />
          </div>
          
          {/* Filtro por tipo */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', overflowX: 'auto' }}>
            {tiposNota.map(tipo => (
              <button
                key={tipo}
                onClick={() => setSelectedTipo(tipo)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: selectedTipo === tipo ? 'none' : '1px solid #e2e8f0',
                  background: selectedTipo === tipo ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: selectedTipo === tipo ? 'white' : '#697b92',
                  whiteSpace: 'nowrap'
                }}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de notas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotas.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
                No se encontraron notas de almacén
              </p>
            </div>
          ) : (
            filteredNotas.map((nota) => (
              <div
                key={nota.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => handleVerDetalle(nota)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 32, 144, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Info principal */}
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px' }}>{getIconForTipo(nota.tipo)}</span>
                      <h3 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        {nota.tipo}
                      </h3>
                      {nota.fecha.includes('Hoy') && (
                        <span style={{
                          padding: '4px 10px',
                          backgroundColor: '#91e600',
                          borderRadius: '12px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'white'
                        }}>
                          Hoy
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 0.583333C3.50683 0.583333 0.666667 3.4235 0.666667 6.91667C0.666667 10.4098 3.50683 13.25 7 13.25C10.4932 13.25 13.3333 10.4098 13.3333 6.91667C13.3333 3.4235 10.4932 0.583333 7 0.583333ZM7 11.9583C4.22683 11.9583 1.95833 9.68983 1.95833 6.91667C1.95833 4.1435 4.22683 1.875 7 1.875C9.77317 1.875 12.0417 4.1435 12.0417 6.91667C12.0417 9.68983 9.77317 11.9583 7 11.9583Z" fill="#697b92"/>
                          <path d="M7.29167 3.45833H6.41667V7.35417L9.73333 9.35L10.1667 8.62083L7.29167 6.91667V3.45833Z" fill="#697b92"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#697b92' }}>
                          {nota.fecha}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 6.41667C7.96649 6.41667 8.75 5.63316 8.75 4.66667C8.75 3.70018 7.96649 2.91667 7 2.91667C6.03351 2.91667 5.25 3.70018 5.25 4.66667C5.25 5.63316 6.03351 6.41667 7 6.41667Z" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.0833 11.0833C11.0833 9.27917 9.24167 7.875 7 7.875C4.75833 7.875 2.91667 9.27917 2.91667 11.0833" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#697b92' }}>
                          {nota.usuario}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M11.0833 2.33333H9.33333V1.16667C9.33333 0.875 9.125 0.583333 8.75 0.583333C8.375 0.583333 8.16667 0.875 8.16667 1.16667V2.33333H5.83333V1.16667C5.83333 0.875 5.625 0.583333 5.25 0.583333C4.875 0.583333 4.66667 0.875 4.66667 1.16667V2.33333H2.91667C2.10833 2.33333 1.45833 2.98333 1.45833 3.79167L1.45 12.25C1.45 13.0583 2.10833 13.7083 2.91667 13.7083H11.0833C11.8917 13.7083 12.5417 13.0583 12.5417 12.25V3.79167C12.5417 2.98333 11.8917 2.33333 11.0833 2.33333ZM11.375 12.25H2.625C2.45833 12.25 2.33333 12.125 2.33333 11.9583V5.25H11.6667V11.9583C11.6667 12.125 11.5417 12.25 11.375 12.25Z" fill="#092090"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#092090', fontWeight: 600 }}>
                          {nota.articulos} artículos
                        </span>
                      </div>
                    </div>

                    {nota.observaciones && (
                      <div style={{ 
                        padding: '10px 12px', 
                        backgroundColor: '#f8fafc', 
                        borderRadius: '8px',
                        borderLeft: '3px solid #092090',
                        marginTop: '8px'
                      }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: '#697b92',
                          margin: 0
                        }}>
                          {nota.observaciones}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerDetalle(nota);
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(to right, #092090, #0C2ABF)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: 'white'
                      }}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal de detalle */}
        {showModal && selectedNota && (
          <div
            onClick={() => setShowModal(false)}
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
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: 0 }}>
                  Detalle de Nota
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Tipo de Operación</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: '4px 0 0 0' }}>
                    {getIconForTipo(selectedNota.tipo)} {selectedNota.tipo}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>ID de Nota</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                    {selectedNota.id}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Fecha y Hora</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                    {selectedNota.fecha}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Usuario</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                    {selectedNota.usuario}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Cantidad de Artículos</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#092090', margin: '4px 0 0 0' }}>
                    {selectedNota.articulos} artículos
                  </p>
                </div>
                {selectedNota.observaciones && (
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Observaciones</p>
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '8px',
                      borderLeft: '3px solid #092090',
                      marginTop: '8px'
                    }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: 0 }}>
                        {selectedNota.observaciones}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: '24px',
                  width: '100%',
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
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
