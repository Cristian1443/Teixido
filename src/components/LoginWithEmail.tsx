import { useState } from 'react';
import svgPaths from "../imports/svg-h3d1s8p29g";
import imgPublicidadTeixidoFlorCoche from "figma:asset/328faa30d1d4991c86ab0e222dbfeb91bb4cd4f2.png";
import imgRectangle30 from "figma:asset/53d1dabff9f07d1a5497a42cae4a47f48cf89be2.png";

interface LoginWithEmailProps {
  onContinue: () => void;
  onBack?: () => void;
}

export default function LoginWithEmail({ onContinue, onBack }: LoginWithEmailProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    let hasError = false;

    // Validar email
    if (!email) {
      setEmailError('El correo electrónico es requerido');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo electrónico válido');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Validar contraseña
    if (!password) {
      setPasswordError('La contraseña es requerida');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Si no hay errores, continuar
    if (!hasError) {
      onContinue();
    }
  };

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
          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              style={{
                alignSelf: 'flex-start',
                marginBottom: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#697b92',
                padding: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="#697b92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver
            </button>
          )}

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

          {/* Email input section */}
          <div style={{
            width: '100%',
            marginBottom: '24px'
          }}>
            {/* Label */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#0C2ABF',
              marginBottom: '12px'
            }}>
              Correo Electrónico
            </p>

            {/* Input field */}
            <div style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#ffffff',
              border: `1px solid ${emailError ? '#ef4444' : '#e2e8f0'}`,
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
                  stroke={emailError ? '#ef4444' : '#697B92'}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                />
              </svg>
              
              {/* Input text */}
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '14px',
                  color: '#1a1a1a',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              />
            </div>
            {emailError && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#ef4444',
                margin: '6px 0 0 0'
              }}>
                {emailError}
              </p>
            )}
          </div>

          {/* Password input section */}
          <div style={{
            width: '100%',
            marginBottom: 'clamp(24px, 4vh, 40px)'
          }}>
            {/* Label */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#0C2ABF',
              marginBottom: '12px'
            }}>
              Contraseña
            </p>

            {/* Input field */}
            <div style={{
              width: '100%',
              height: '40px',
              backgroundColor: '#ffffff',
              border: `1px solid ${passwordError ? '#ef4444' : '#e2e8f0'}`,
              borderRadius: '5px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              paddingRight: '12px',
              gap: '14px'
            }}>
              {/* Lock icon */}
              <svg 
                width="12" 
                height="14" 
                viewBox="0 0 12 14" 
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path 
                  d="M10 6V4C10 1.79086 8.20914 0 6 0C3.79086 0 2 1.79086 2 4V6M6 9V10.5M2 14H10C11.1046 14 12 13.1046 12 12V8C12 6.89543 11.1046 6 10 6H2C0.895431 6 0 6.89543 0 8V12C0 13.1046 0.895431 14 2 14Z"
                  fill={passwordError ? '#ef4444' : '#697B92'}
                />
              </svg>
              
              {/* Input text */}
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '14px',
                  color: '#1a1a1a',
                  backgroundColor: 'transparent',
                  flex: 1
                }}
              />

              {/* Show/Hide password button */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {showPassword ? (
                    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M1 1L15 15M6.5 6.5C6.18783 6.81217 6 7.24783 6 7.72727C6 8.70455 6.79091 9.5 7.76364 9.5C8.24308 9.5 8.67874 9.31217 8.99091 9M3.5 3.5C2.32679 4.39286 1.5 6 1.5 6C1.5 6 3.5 10 8 10C9.21429 10 10.2679 9.68571 11.1607 9.16071M7 2.07143C7.32143 2.02679 7.65714 2 8 2C12.5 2 14.5 6 14.5 6C14.5 6 13.9643 7.07857 13.1071 8" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
            </div>
            {passwordError && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#ef4444',
                margin: '6px 0 0 0'
              }}>
                {passwordError}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <button
            onClick={() => alert('Funcionalidad de recuperación de contraseña pendiente de implementar')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#697b92',
              cursor: 'pointer',
              marginBottom: 'clamp(20px, 4vh, 32px)',
              textDecoration: 'underline'
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>

          {/* Continue button */}
          <button 
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '15px 24px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              marginBottom: 'clamp(20px, 4vh, 32px)'
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
              Continuar
            </p>
          </button>

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
