import svgPaths from "../imports/svg-xe4tyoq2ar";

interface HistorialVentasModalProps {
  onClose: () => void;
}

function VentaItem({ numero, cliente, direccion, precio }: { numero: string; cliente: string; direccion: string; precio: string }) {
  return (
    <div style={{
      position: 'relative',
      height: '90px',
      width: '100%',
      marginBottom: '14px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        height: '90px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        position: 'relative'
      }} />
      
      <div style={{
        position: 'absolute',
        left: '24px',
        top: '24px',
        height: '42px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundImage: 'linear-gradient(to right, #8bd600, #c4ff57)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px 5px',
            borderRadius: '5px'
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              lineHeight: '10px',
              color: '#1a1a1a',
              fontSize: '10px',
              whiteSpace: 'pre',
              margin: 0
            }}>{numero}</p>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            lineHeight: '14px',
            color: '#1a1a1a',
            fontSize: '16px',
            whiteSpace: 'pre',
            margin: 0
          }}>{cliente}</p>
        </div>
        
        <p style={{
          position: 'absolute',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          lineHeight: '14px',
          left: 0,
          color: '#697b92',
          fontSize: '10px',
          top: '28px',
          width: '883px',
          margin: 0
        }}>{direccion}</p>
      </div>
      
      <p style={{
        position: 'absolute',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        lineHeight: '14px',
        right: '24px',
        color: '#0c1c8d',
        fontSize: '18px',
        whiteSpace: 'pre',
        textAlign: 'right',
        top: '45px',
        margin: 0
      }}>{precio}</p>
    </div>
  );
}

export default function HistorialVentasModal({ onClose }: HistorialVentasModalProps) {
  const ventas = [
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
    { numero: 'P122', cliente: 'Almacenes López S.A.', direccion: 'Rivera Antonio y Hermanos • IUO: 12345678A • Avenida Mayor 12, Villa Solanda, Provincia del Sur 33001', precio: '280,90 €' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        position: 'relative',
        width: '1000px',
        height: '600px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          height: '600px',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header fijo con gradiente */}
          <div style={{
            backgroundColor: '#ffffff',
            height: '115px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottom: '1px solid #e2e8f0',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'absolute',
              left: '40px',
              top: '40px'
            }}>
              <div style={{
                height: '20.7px',
                position: 'relative',
                width: '16.1px'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 19 23">
                  <path d={svgPaths.p3cd0c6c0} stroke="url(#paint0_linear_historial)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_historial" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '24px',
                color: '#1a1a1a',
                fontSize: '24px',
                whiteSpace: 'pre',
                margin: 0
              }}>Historial de Ventas</p>
            </div>

            {/* Botón X */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                left: '936px',
                width: '24px',
                height: '24px',
                top: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6L18 18" stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Contenido scrolleable */}
          <div style={{
            position: 'absolute',
            top: '115px',
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            padding: '22px 40px 40px 40px'
          }}>
            {ventas.map((venta, index) => (
              <VentaItem
                key={index}
                numero={venta.numero}
                cliente={venta.cliente}
                direccion={venta.direccion}
                precio={venta.precio}
              />
            ))}
          </div>

          {/* Gradiente de fade en el bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '115px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </div>
  );
}
