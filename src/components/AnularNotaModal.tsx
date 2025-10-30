import svgPaths from "../imports/svg-f1jyw99rj4";

interface AnularNotaModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AnularNotaModal({ show, onConfirm, onCancel }: AnularNotaModalProps) {
  if (!show) return null;
  
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
        width: '600px',
        height: '317px'
      }}>
        <div style={{
          position: 'absolute',
          backgroundColor: '#ffffff',
          height: '317px',
          left: 0,
          borderRadius: '20px',
          top: 0,
          width: '600px'
        }} />

        {/* Contenido */}
        <div style={{
          position: 'absolute',
          height: '107px',
          left: '130px',
          top: '28px',
          width: '339px'
        }}>
          <div style={{
            position: 'absolute',
            backgroundColor: '#FFF5E6',
            height: '14px',
            left: '7px',
            borderRadius: '20px',
            top: '93px',
            width: '325px'
          }} />
          
          <div style={{
            position: 'absolute',
            left: '169.5px',
            top: '49px',
            transform: 'translateX(-50%)',
            textAlign: 'center'
          }}>
            <p style={{
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '1.2',
              fontSize: '24px',
              margin: 0
            }}>
              ¿Confirmas que deseas<br />anular esta nota de venta?
            </p>
          </div>

          {/* Icono de advertencia */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% - 34.5px)',
            transform: 'translate(-50%, -50%)',
            width: '38px',
            height: '38px'
          }}>
            <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="0 0 43 43">
              <path d={svgPaths.p34e77700} stroke="#F59F0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.22222" />
            </svg>
          </div>
        </div>

        <p style={{
          position: 'absolute',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.6',
          left: '299.5px',
          color: '#697b92',
          fontSize: '18px',
          textAlign: 'center',
          top: '161px',
          transform: 'translateX(-50%)',
          width: '379px',
          margin: 0
        }}>
          Esta acción no se puede deshacer y la información se perderá permanentemente.
        </p>

        {/* Botones */}
        <div style={{
          position: 'absolute',
          height: '44px',
          left: '175px',
          top: '245px',
          width: '250px'
        }}>
          <button
            onClick={onCancel}
            style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              padding: '15px',
              borderRadius: '30px',
              top: 0,
              width: '102px',
              border: '1px solid #697b92',
              cursor: 'pointer'
            }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '14px',
              color: '#697b92',
              fontSize: '14px',
              textAlign: 'center',
              whiteSpace: 'pre',
              margin: 0
            }}>
              Cancelar
            </p>
          </button>

          <button
            onClick={onConfirm}
            style={{
              position: 'absolute',
              backgroundColor: '#f59f0a',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              left: '114px',
              padding: '15px',
              borderRadius: '30px',
              top: 0,
              width: '136px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '14px',
              fontSize: '14px',
              textAlign: 'center',
              whiteSpace: 'pre',
              color: '#ffffff',
              margin: 0
            }}>
              Anular Nota
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
