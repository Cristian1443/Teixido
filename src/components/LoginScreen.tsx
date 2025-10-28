import imgPublicidadTeixidoFlorCoche from "figma:asset/328faa30d1d4991c86ab0e222dbfeb91bb4cd4f2.png";
import imgRectangle30 from "figma:asset/53d1dabff9f07d1a5497a42cae4a47f48cf89be2.png";

export default function LoginScreen() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      position: 'relative',
      width: '100%',
      maxWidth: '1280px',
      height: '800px',
      margin: '0 auto',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Left side with image */}
      <div style={{
        width: '50%',
        height: '100%',
        position: 'relative'
      }}>
        <img 
          alt="Flores en coche" 
          src={imgRectangle30}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Right side with login form */}
      <div style={{
        width: '50%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '333px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#0C2ABF',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Iniciar sesión
          </h1>

          {/* Vendor button */}
          <button style={{
            width: '100%',
            padding: '15px 24px',
            background: 'linear-gradient(to right, #8bd600, #c4ff57)',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            marginBottom: '68px'
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#1a1a1a',
              textAlign: 'center',
              margin: 0
            }}>
              Entrar como Vendedor
            </p>
          </button>

          {/* Divider with "O" */}
          <div style={{
            width: '100%',
            height: '14px',
            position: 'relative',
            marginBottom: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              left: '71px',
              width: '84px',
              height: '1px',
              backgroundColor: '#E2E8F0'
            }} />
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#cbd5e1',
              textAlign: 'center',
              margin: 0,
              backgroundColor: '#ffffff',
              padding: '0 10px',
              position: 'relative',
              zIndex: 1
            }}>
              O
            </p>
            <div style={{
              position: 'absolute',
              right: '71px',
              width: '84px',
              height: '1px',
              backgroundColor: '#E2E8F0'
            }} />
          </div>

          {/* Admin button */}
          <button style={{
            width: '100%',
            padding: '15px 24px',
            backgroundColor: '#0C2ABF',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer'
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#ffffff',
              textAlign: 'center',
              margin: 0
            }}>
              Acceso Administrador
            </p>
          </button>

          {/* Logo at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            width: '204px',
            height: '39px'
          }}>
            <img 
              alt="Teixido Flor logo" 
              src={imgPublicidadTeixidoFlorCoche}
              style={{
                width: 'auto',
                height: '100%',
                maxWidth: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
