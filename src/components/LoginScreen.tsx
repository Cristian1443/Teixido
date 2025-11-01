import { useState } from 'react';
import imgPublicidadTeixidoFlorCoche from "figma:asset/328faa30d1d4991c86ab0e222dbfeb91bb4cd4f2.png";
import imgRectangle30 from "figma:asset/53d1dabff9f07d1a5497a42cae4a47f48cf89be2.png";

interface LoginScreenProps {
  onContinue: () => void;
  onLoginWithEmail?: () => void;
}

export default function LoginScreen({ onContinue, onLoginWithEmail }: LoginScreenProps) {
  const [isVendorHovered, setIsVendorHovered] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      position: 'relative',
      width: '100%',
      height: '100vh',
      maxHeight: '100vh',
      margin: '0 auto',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Left side with image */}
      <div style={{
        width: '50%',
        minWidth: '320px',
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
        minWidth: '320px',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '40px 20px',
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '333px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          paddingBottom: '80px'
        }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#0C2ABF',
            textAlign: 'center',
            marginBottom: 'clamp(30px, 6vh, 60px)',
            marginTop: 0
          }}>
            Iniciar sesión
          </h1>

          {/* Vendor button */}
          <button 
            onClick={onLoginWithEmail || onContinue}
            onMouseEnter={() => setIsVendorHovered(true)}
            onMouseLeave={() => setIsVendorHovered(false)}
            style={{
              width: '100%',
              padding: '15px 24px',
              background: isVendorHovered 
                ? 'linear-gradient(to right, #a0e000, #d4ff77)' 
                : 'linear-gradient(to right, #8bd600, #c4ff57)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              marginBottom: 'clamp(40px, 8vh, 68px)',
              transition: 'all 0.3s ease',
              transform: isVendorHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isVendorHovered ? '0 4px 12px rgba(139, 214, 0, 0.3)' : 'none'
            }}
          >
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
            marginBottom: 'clamp(24px, 5vh, 38px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              right: '50%',
              marginRight: '20px',
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
              left: '50%',
              right: '0',
              marginLeft: '20px',
              height: '1px',
              backgroundColor: '#E2E8F0'
            }} />
          </div>

          {/* Admin button */}
          <button 
            onClick={onContinue}
            onMouseEnter={() => setIsAdminHovered(true)}
            onMouseLeave={() => setIsAdminHovered(false)}
            style={{
              width: '100%',
              padding: '15px 24px',
              background: isAdminHovered
                ? 'linear-gradient(to right, #0a2ba0, #0d2ed0)'
                : 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isAdminHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isAdminHovered ? '0 4px 12px rgba(12, 42, 191, 0.3)' : 'none'
            }}
          >
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

          {/* Help text */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: '#94a3b8',
            textAlign: 'center',
            marginTop: 'clamp(20px, 4vh, 32px)',
            marginBottom: 'clamp(20px, 4vh, 32px)'
          }}>
            ¿Necesitas ayuda? Contacta con soporte
          </p>

          {/* Logo at bottom */}
          <div style={{
            marginTop: 'auto',
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
