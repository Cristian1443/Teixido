import Navigation from "./Navigation";
import svgPaths from "../imports/svg-ah9vgfgr8f";
import { useState } from 'react';

interface CobrosConfirmacionScreenProps {
  onNavigate: (screen: string) => void;
  cobranzaActual?: any;
  onVolverACobros: () => void;
}

export default function CobrosConfirmacionScreen({ onNavigate, cobranzaActual, onVolverACobros }: CobrosConfirmacionScreenProps) {
  const [showPrintMessage, setShowPrintMessage] = useState(false);
  
  const notasPendientes = cobranzaActual?.notas || [];
  const subtotal = cobranzaActual?.subtotal || 0;

  const handleImprimir = () => {
    setShowPrintMessage(true);
    setTimeout(() => setShowPrintMessage(false), 3000);
    // Aquí iría la lógica real de impresión
    console.log('Imprimiendo comprobante de cobranza:', cobranzaActual);
  };

  const handleVolverACobros = () => {
    onVolverACobros();
    onNavigate('cobrosList');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="cobros" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Mobile-style header */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ width: '26px', height: '26px' }} />
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#1a1a1a',
            margin: 0
          }}>
            Cobros
          </p>
          <div style={{
            width: '26px',
            height: '26px',
            position: 'relative'
          }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path clipRule="evenodd" d={svgPaths.p1e4d9f80} fill="#697B92" fillRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Content wrapper */}
        <div style={{
          padding: '40px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Notas Pendientes panel */}
          <div style={{
            width: '669px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '38px'
          }}>
            {/* Panel header */}
            <div style={{
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <svg width="16.1" height="20.7" viewBox="0 0 19 23" fill="none">
                <path d={svgPaths.p3cd0c6c0} stroke="url(#paint0_linear_notes_conf)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
                <defs>
                  <linearGradient id="paint0_linear_notes_conf" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                </defs>
              </svg>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '24px',
                color: '#1a1a1a',
                margin: 0
              }}>
                Notas Pendientes
              </p>
            </div>

            {/* Scrollable list */}
            <div style={{
              padding: '32px 26px 0 26px',
              maxHeight: '578px',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '38px' }}>
                {notasPendientes.map((nota, index) => (
                  <div key={index} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '31px 18px',
                    minHeight: '112px',
                    position: 'relative'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        backgroundColor: '#91e600',
                        borderRadius: '5px',
                        padding: '3px 5px'
                      }}>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '10px',
                          lineHeight: '10px',
                          color: '#1a1a1a'
                        }}>
                          {nota.id}
                        </span>
                      </div>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '14px',
                        color: '#697b92',
                        margin: 0
                      }}>
                        {nota.client}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        lineHeight: '14px',
                        background: 'linear-gradient(to right, #092090, #0C2ABF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700
                      }}>
                        Fecha:
                      </span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        lineHeight: '14px',
                        background: 'linear-gradient(to right, #092090, #0C2ABF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {nota.date}
                      </span>
                    </div>

                    <p style={{
                      position: 'absolute',
                      right: '18px',
                      top: '49px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '14px',
                      color: '#0c1c8d',
                      margin: 0
                    }}>
                      {nota.amount.toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with subtotal */}
            <div style={{
              backgroundColor: '#f3f7fd',
              borderTop: '1px solid #e2e8f0',
              padding: '28px 34px',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px'
            }}>
              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '50px',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '18px',
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Subtotal:
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '18px',
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {subtotal.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{
            width: '351px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignItems: 'center'
          }}>
            {/* Imprimir Comprobante button */}
            <button
              onClick={handleImprimir}
              style={{
                width: '100%',
                backgroundColor: '#0C2ABF',
                border: 'none',
                borderRadius: '30px',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d={svgPaths.p2489f5b2} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '14px',
                color: '#ffffff'
              }}>
                Imprimir Comprobante
              </span>
              <div style={{ width: '16px', height: '16px' }} />
            </button>

            {/* Volver a Cobros button */}
            <button
              onClick={handleVolverACobros}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid #092090',
                borderRadius: '30px',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
                <path d="M1 7H15M1 7L7 13M1 7L7 1" stroke="url(#paint0_linear_back)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <defs>
                  <linearGradient id="paint0_linear_back" x1="1" x2="16.5741" y1="1" y2="10.3889" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '14px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Volver a Cobros
              </span>
              <div style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          {/* Print message */}
          {showPrintMessage && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#0C2ABF',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Comprobante impreso
            </div>
          )}
        </div>
      </div>
    </div>
  );
}