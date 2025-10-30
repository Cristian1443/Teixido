import svgPaths from "../imports/svg-u4hxoxtx9v";
import { useState } from 'react';

interface Cliente {
  id: string;
  nombre: string;
  empresa: string;
  direccion: string;
  desde: string;
  cobrado: number;
  total: number;
  porcentaje: number;
}

interface SeleccionarClienteModalProps {
  clientes: Cliente[];
  onClose: () => void;
  onSelect: (cliente: Cliente) => void;
}

export default function SeleccionarClienteModal({ clientes, onClose, onSelect }: SeleccionarClienteModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = () => {
    if (selectedCliente) {
      onSelect(selectedCliente);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '600px',
        height: '700px',
        borderRadius: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          height: '156px',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px'
        }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '40px',
            transform: 'translateX(-50%)',
            width: 'fit-content'
          }}>
            <svg width="200" height="20" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="gradient_seleccionar_cliente" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#092090" />
                  <stop offset="100%" stopColor="#0C2ABF" />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="18"
                fill="url(#gradient_seleccionar_cliente)"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="600"
              >
                Seleccionar Cliente
              </text>
            </svg>
          </div>

          {/* Search field */}
          <div style={{
            position: 'absolute',
            left: '60px',
            top: '72px',
            width: '479px',
            height: '46px'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '5px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 15px'
            }}>
              <input
                type="text"
                placeholder="Cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#697b92',
                  backgroundColor: 'transparent',
                  flex: 1
                }}
              />
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d={svgPaths.p23be5b00} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cliente list - scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {clientesFiltrados.map((cliente, index) => (
            <div 
              key={index}
              onClick={() => setSelectedCliente(cliente)}
              style={{
                backgroundColor: '#ffffff',
                border: selectedCliente?.id === cliente.id ? '2px solid #0C2ABF' : '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px',
                minHeight: '114px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d={svgPaths.p1b638c80} stroke="#0C1C8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '14px', color: '#697b92', margin: 0 }}>
                    {cliente.id} — {cliente.nombre}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '14px', color: '#697b92', margin: '10px 0 0 0' }}>
                    {cliente.empresa}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '14px', color: '#1a1a1a', margin: 0 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Desde:
                  </span>{' '}
                  <span style={{ color: '#697b92' }}>{cliente.desde}</span>
                </p>
              </div>

              {/* Cobros Pendientes badge */}
              <div style={{
                position: 'absolute',
                right: '24px',
                top: '43px',
                width: '170px'
              }}>
                <div style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '30px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p1f79f00} stroke="#E2E8F0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#697b92', textAlign: 'center' }}>
                    Cobros Pendientes (6)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          height: '124px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <button
            onClick={onClose}
            style={{
              width: '102px',
              padding: '15px',
              backgroundColor: '#ffffff',
              border: '1px solid #092090',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}>
              Cancelar
            </span>
          </button>

          <button
            onClick={handleSelect}
            disabled={!selectedCliente}
            style={{
              width: '174px',
              padding: '15px',
              backgroundColor: selectedCliente ? '#0C2ABF' : '#e2e8f0',
              border: 'none',
              borderRadius: '30px',
              cursor: selectedCliente ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: selectedCliente ? 1 : 0.6
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              Seleccionar Cliente
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
