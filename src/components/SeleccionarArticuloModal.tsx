import { useState } from 'react';
import { Articulo } from '../App';

interface SeleccionarArticuloModalProps {
  articulos: Articulo[];
  onSelect: (articulo: Articulo) => void;
  onClose: () => void;
}

export default function SeleccionarArticuloModal({ articulos, onSelect, onClose }: SeleccionarArticuloModalProps) {
  const [busqueda, setBusqueda] = useState('');

  const articulosFiltrados = articulos.filter(a => 
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.id.includes(busqueda)
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
          width: '600px',
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
            Seleccionar Artículo
          </h2>
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
              placeholder="Buscar por nombre, categoría o código..."
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

        {/* Lista de artículos */}
        <div style={{
          padding: '20px 32px',
          overflowY: 'auto',
          flex: 1
        }}>
          {articulosFiltrados.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#697b92'
            }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', margin: 0 }}>
                No se encontraron artículos
              </p>
            </div>
          ) : (
            articulosFiltrados.map((articulo) => (
              <div
                key={articulo.id}
                onClick={() => onSelect(articulo)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
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
                      {articulo.id}
                    </span>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#1a1a1a',
                      margin: 0
                    }}>
                      {articulo.nombre}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#697b92'
                    }}>
                      {articulo.categoria}
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: articulo.cantidad <= (articulo.stockMinimo || 0) ? '#F59F0A' : '#07BC13',
                      fontWeight: 600
                    }}>
                      Stock: {articulo.cantidad}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#0C2ABF',
                    margin: 0
                  }}>
                    {articulo.precio}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
