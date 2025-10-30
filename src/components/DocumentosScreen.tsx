import svgPaths from "../imports/svg-n4pwssj5i5";
import img from "figma:asset/64e22b9a1eb7f86d37f38817111a710f2aedc975.png";

interface DocumentosScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DocumentosScreen({ onNavigate }: DocumentosScreenProps) {
  const documentos = [
    { nombre: 'Alimentación.pdf' },
    { nombre: 'Congelados.pdf' },
    { nombre: 'Droguerias.pdf' }
  ];

  return (
    <div style={{
      backgroundColor: '#ffffff',
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex'
    }}>
      {/* Sidebar de navegación */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '80px',
        pointerEvents: 'none',
        zIndex: 100
      }}>
        <div style={{
          height: '800px',
          width: '80px',
          pointerEvents: 'auto',
          position: 'sticky',
          top: 0,
          boxShadow: '100px 33px 30px 0px rgba(0,9,77,0), 64px 21px 27px 0px rgba(0,9,77,0.01), 36px 12px 23px 0px rgba(0,9,77,0.05), 16px 5px 17px 0px rgba(0,9,77,0.09), 4px 1px 9px 0px rgba(0,9,77,0.1)'
        }}>
          <div style={{
            position: 'absolute',
            backgroundColor: '#ffffff',
            height: '800px',
            left: 0,
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            top: 0,
            width: '80px',
            border: '1px solid #e2e8f0',
            borderLeft: 'none'
          }} />

          {/* Logo */}
          <div style={{
            position: 'absolute',
            left: '16px',
            width: '48px',
            height: '48px',
            top: '25px'
          }}>
            <img
              alt=""
              src={img}
              style={{
                position: 'absolute',
                inset: 0,
                maxWidth: 'none',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                pointerEvents: 'none',
                width: '100%',
                height: '100%'
              }}
            />
          </div>

          {/* Panel */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '104.82px',
            width: '79px',
            cursor: 'pointer'
          }} onClick={() => onNavigate('dashboard')}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              top: 0,
              width: '79px'
            }} />
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '11.791px',
              left: '39.08px',
              fontSize: '11.791px',
              textAlign: 'center',
              whiteSpace: 'pre',
              top: '33.7px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Panel
            </p>
            <div style={{
              position: 'absolute',
              aspectRatio: '1',
              left: '41.97%',
              right: '41.37%',
              top: 'calc(50% - 11.791px)',
              transform: 'translateY(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-4.478%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                  <path d={svgPaths.p31930300} stroke="url(#paint0_linear_25_117)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_117" x1="0.589552" x2="16.3513" y1="0.589552" y2="8.73414">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Ventas */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '182.49px',
            width: '79px',
            cursor: 'pointer'
          }} onClick={() => onNavigate('ventas')}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              borderRadius: '58.955px',
              top: 0,
              width: '79px'
            }} />
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '11.791px',
              left: '39.55px',
              fontSize: '11.791px',
              textAlign: 'center',
              whiteSpace: 'pre',
              top: '33.82px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Ventas
            </p>
            <div style={{
              position: 'absolute',
              aspectRatio: '18/14',
              left: '41.79%',
              right: '41.54%',
              top: 'calc(50% - 10.208px)',
              transform: 'translateY(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-5.76% -4.48%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
                  <path d={svgPaths.p23a48780} stroke="url(#paint0_linear_25_126)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_126" x1="0.589552" x2="14.4445" y1="0.589552" y2="9.79434">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Almacen */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '260.17px',
            width: '79px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              borderRadius: '58.955px',
              top: 0,
              width: '79px'
            }} />
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '11.791px',
              left: '39.83px',
              fontSize: '11.791px',
              textAlign: 'center',
              whiteSpace: 'pre',
              top: '34.11px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Almacen
            </p>
            <div style={{
              position: 'absolute',
              aspectRatio: '18/16',
              left: '41.97%',
              right: '41.37%',
              top: 'calc(50% - 10.656px)',
              transform: 'translateY(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-5.04% -4.48%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15 13">
                  <path d={svgPaths.p535fb40} stroke="url(#paint0_linear_25_132)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_132" x1="0.589552" x2="15.5157" y1="0.589552" y2="9.2665">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Comunica */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '337.84px',
            width: '79px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              top: 0,
              width: '79px'
            }} />
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '11.791px',
              left: '38.61px',
              fontSize: '11.791px',
              textAlign: 'center',
              whiteSpace: 'pre',
              top: '34.88px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Comunica
            </p>
            <div style={{
              position: 'absolute',
              aspectRatio: '18/18',
              left: '41.97%',
              right: '41.37%',
              top: 'calc(50% - 11.103px)',
              transform: 'translateY(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-4.478%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                  <path d={svgPaths.p10a85360} stroke="url(#paint0_linear_25_119)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_119" x1="0.589552" x2="16.3513" y1="0.589552" y2="8.73414">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '415.51px',
            width: '79px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              top: 0,
              width: '79px'
            }} />
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '11.791px',
              left: '39.19px',
              fontSize: '11.791px',
              textAlign: 'center',
              whiteSpace: 'pre',
              top: '36.55px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Agenda
            </p>
            <div style={{
              position: 'absolute',
              aspectRatio: '11/12',
              left: '43.28%',
              right: '40.3%',
              top: 'calc(50% - 9.433px)',
              transform: 'translateY(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-4.17% -4.55%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15 16">
                  <path d={svgPaths.pc902380} stroke="url(#paint0_linear_25_134)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_134" x1="0.589552" x2="16.6569" y1="0.589552" y2="8.20017">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Ajustes */}
          <div style={{
            position: 'absolute',
            height: '63.672px',
            left: 0,
            top: '718px',
            width: '79px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              height: '63.672px',
              left: 0,
              top: 0,
              width: '79px'
            }} />
            <div style={{
              position: 'absolute',
              left: '25px',
              width: '30px',
              height: '30px',
              top: '17px'
            }}>
              <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
                <path d={svgPaths.p3fbdf600} stroke="url(#paint0_linear_25_128)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                <path d={svgPaths.p3c0282f0} stroke="url(#paint1_linear_25_128)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_25_128" x1="3.75" x2="30.6846" y1="3.75" y2="17.668">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_25_128" x1="11.25" x2="20.2282" y1="11.25" y2="15.8893">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        marginLeft: '80px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Header - sticky */}
        <div style={{
          backgroundColor: '#ffffff',
          height: '62px',
          position: 'sticky',
          top: 0,
          width: '100%',
          borderBottom: '1px solid #e2e8f0',
          zIndex: 50,
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            height: '61px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            maxWidth: '1200px'
          }}>
            <div style={{ width: '26px', height: '26px' }}>
              <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 26 26" />
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '18px',
              color: '#1a1a1a',
              fontSize: '18px',
              textAlign: 'center',
              margin: 0
            }}>
              Documentos
            </p>
            <div 
              onClick={() => onNavigate('dashboard')}
              style={{ 
                width: '26px', 
                height: '26px',
                cursor: 'pointer'
              }}>
              <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
                <path clipRule="evenodd" d={svgPaths.p1e4d9f80} fill="#697B92" fillRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content wrapper */}
        <div style={{
          flex: 1,
          padding: '60px 140px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '1280px'
        }}>
          {/* Botón Sube un nuevo documento */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            cursor: 'pointer',
            marginBottom: '26px',
            alignSelf: 'center'
          }}>
            <div style={{
              position: 'relative',
              flexShrink: 0,
              width: '14px',
              height: '14px'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-5.357%'
              }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p39a8de80} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              lineHeight: '14px',
              color: '#697b92',
              fontSize: '14px',
              whiteSpace: 'pre',
              margin: 0
            }}>
              Sube un nuevo documento
            </p>
          </div>

          {/* Lista de documentos */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '1080px'
          }}>
            {/* Documentos */}
            {documentos.map((doc, index) => (
              <div key={index} style={{
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                borderTop: '1px solid #e2e8f0',
                borderLeft: '1px solid #e2e8f0',
                borderRight: '1px solid #e2e8f0',
                borderBottom: index === documentos.length - 1 ? 'none' : '0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                    position: 'relative',
                    width: '100%'
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '14px',
                      color: '#697b92',
                      fontSize: '14px',
                      whiteSpace: 'pre',
                      margin: 0
                    }}>
                      {doc.nombre}
                    </p>
                    <div style={{
                      height: '16px',
                      position: 'relative',
                      flexShrink: 0,
                      width: '48px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: '-4.69% -1.56% -17.19% -1.56%'
                      }}>
                        <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 50 20">
                          <path d={svgPaths.p3338dc40} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.p11cc2d00} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Salir */}
            <div style={{
              position: 'relative',
              flexShrink: 0,
              width: '100%',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center',
                  padding: '18px 24px',
                  position: 'relative',
                  width: '100%',
                  cursor: 'pointer'
                }} onClick={() => onNavigate('dashboard')}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '14px',
                    color: '#f59f0a',
                    fontSize: '14px',
                    whiteSpace: 'pre',
                    margin: 0
                  }}>
                    Salir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
