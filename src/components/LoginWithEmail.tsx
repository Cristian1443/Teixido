import svgPaths from "../imports/svg-h3d1s8p29g";
import imgPublicidadTeixidoFlorCoche from "figma:asset/328faa30d1d4991c86ab0e222dbfeb91bb4cd4f2.png";
import imgRectangle30 from "figma:asset/53d1dabff9f07d1a5497a42cae4a47f48cf89be2.png";

export default function LoginWithEmail() {
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

          {/* Email input section */}
          <div style={{
            width: '100%',
            marginBottom: '80px'
          }}>
            {/* Label */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#0C2ABF',
              marginBottom: '22px'
            }}>
              Correo Electrónico
            </p>

            {/* Input field */}
            <div style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '5px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              gap: '14px'
            }}>
              {/* Email icon */}
              <svg 
                width="14" 
                height="11" 
                viewBox="0 0 16 13" 
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path 
                  d={svgPaths.p2dc07580} 
                  stroke="#697B92" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                />
              </svg>
              
              {/* Input text */}
              <input
                type="email"
                placeholder="desarrollo@trustynet"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '14px',
                  color: '#697b92',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Continue button */}
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
              Continue
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
