import { useState } from 'react';
import { Cliente } from '../App';

interface SeleccionarClienteModalProps {
  clientes: Cliente[];
  onSelect: (cliente: Cliente) => void;
  onClose: () => void;
}

export default function SeleccionarClienteModal({ clientes, onSelect, onClose }: SeleccionarClienteModalProps) {
  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.id.includes(busqueda) ||
    (c.direccion && c.direccion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '700px',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              color: '#1a1a1a',
              margin: 0,
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Seleccionar Cliente
            </h2>
            {clientes.length > 0 && (clientes[0] as any).montoPendiente !== undefined && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#697b92',
                margin: '4px 0 0 0'
              }}>
                Clientes con cobros pendientes
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Buscador */}
        <div style={{ padding: '20px 32px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por código, nombre o empresa..."
              autoFocus
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Lista de clientes */}
        <div style={{
          padding: '20px 32px',
          overflowY: 'auto',
          flex: 1
        }}>
          {clientesFiltrados.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#697b92'
            }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto 20px' }}>
                <circle cx="32" cy="32" r="30" stroke="#e2e8f0" strokeWidth="2" fill="none"/>
                <path d="M32 20v24M20 32h24" stroke="#697B92" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                {busqueda ? 'No se encontraron clientes' : 'No hay cobros pendientes'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                {busqueda ? 'Intenta con otros términos de búsqueda' : 'Todos los cobros han sido pagados'}
              </p>
            </div>
          ) : (
            clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id}
                onClick={() => onSelect(cliente)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#0C2ABF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px',
                        color: '#1a1a1a',
                        backgroundColor: '#91e600',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {cliente.id}
                      </span>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        {cliente.empresa}
                      </p>
                    </div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#697b92',
                      margin: '0 0 4px 0'
                    }}>
                      {cliente.nombre}
                    </p>
                    {cliente.direccion && (
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#697b92',
                        margin: 0
                      }}>
                        📍 {cliente.direccion}
                      </p>
                    )}
                    {cliente.telefono && (
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#697b92',
                        margin: '4px 0 0 0'
                      }}>
                        📞 {cliente.telefono}
                      </p>
                    )}
                    {cliente.ultimaVisita && (
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        color: '#07BC13',
                        margin: '4px 0 0 0',
                        fontWeight: 600
                      }}>
                        Última visita: {cliente.ultimaVisita}
                      </p>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '8px'
                  }}>
                    {(cliente as any).montoPendiente !== undefined && (
                      <div style={{
                        backgroundColor: '#FEF3C7',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#F59F0A',
                          margin: 0,
                          textAlign: 'right'
                        }}>
                          Pendiente
                        </p>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '18px',
                          fontWeight: 700,
                          background: 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          margin: '4px 0 0 0',
                          textAlign: 'right'
                        }}>
                          {(cliente as any).montoPendiente.toFixed(2).replace('.', ',')} €
                        </p>
                      </div>
                    )}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f7fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="#0C2ABF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
