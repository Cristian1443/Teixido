import svgPaths from "../imports/svg-2fxeo0qy2u";
import imgRectangle8 from "figma:asset/254b3ba5fa2fb52d54e1f8eccb31ce8237b140b8.png";
import Navigation from "./Navigation";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const salesData = [
    { id: 'P001', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'paid' },
    { id: 'X001', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'cancelled' },
    { id: 'P002', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'paid' },
    { id: 'X002', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'cancelled' },
    { id: 'X003', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'cancelled' },
    { id: 'P003', client: 'Cliente Nuevo 01', time: '14:30', amount: '450,00 €', type: 'paid' }
  ];

  return (
    <div style={{
      backgroundColor: '#ffffff',
      position: 'relative',
      width: '100%',
      minHeight: '800px',
      display: 'flex'
    }}>
      <Navigation currentScreen="dashboard" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{
        flex: 1,
        padding: '60px 140px',
        overflowY: 'auto'
      }}>
        {/* Hero section */}
        <div style={{
          width: '100%',
          height: '361px',
          position: 'relative',
          marginBottom: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(to right, #092090, #0C2ABF)',
          overflow: 'hidden'
        }}>
          {/* Background texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.48,
            mixBlendMode: 'soft-light'
          }}>
            <img 
              alt="" 
              src={imgRectangle8}
              style={{
                width: '100%',
                height: '199.69%',
                objectFit: 'cover',
                transform: 'translateY(-28.64%)'
              }}
            />
          </div>

          <div style={{
            position: 'relative',
            padding: '40px',
            zIndex: 1
          }}>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '39.899px',
              lineHeight: 1.2,
              color: '#ffffff',
              margin: '0 0 20px 0',
              maxWidth: '395px'
            }}>
              <span style={{ fontWeight: 700 }}>Gestión Inteligente</span>
              <span style={{ fontWeight: 500 }}> de Ventas en Ruta</span>
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '22px',
              lineHeight: 1.6,
              color: '#ffffff',
              margin: '0 0 40px 0',
              maxWidth: '391px'
            }}>
              Control completo de tus ventas, stock y clientes en una plataforma moderna e intuitiva.
            </p>
            
            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '6px'
            }}>
              <button style={{
                padding: '15px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path clipRule="evenodd" d={svgPaths.p3b239480} fill="url(#paint0_linear_nota)" fillRule="evenodd" />
                  <defs>
                    <linearGradient id="paint0_linear_nota" x1="0" x2="19.1535" y1="0" y2="9.89722" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Nota de Venta
                </span>
              </button>

              <button style={{
                padding: '15px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="14" height="8" viewBox="0 0 16 10" fill="none">
                  <path d={svgPaths.p3bd13de0} stroke="url(#paint0_linear_informes)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <defs>
                    <linearGradient id="paint0_linear_informes" x1="1" x2="12.6818" y1="1" y2="11.5636" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Ver Informes
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <StatsCard 
            title="Ventas Hoy"
            value="2.450,00 €"
            change="+12% vs ayer"
            changeType="positive"
          />
          <StatsCard 
            title="Gastos Hoy"
            value="180,50 €"
            change="-8% vs ayer"
            changeType="warning"
          />
          <StatsCard 
            title="Nº de Ventas"
            value="8"
            change="+2 vs ayer"
            changeType="positive"
          />
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '28px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '38px'
            }}>
              <div style={{
                padding: '5px 10px',
                backgroundColor: '#0C2ABF',
                borderRadius: '20px'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#ffffff'
                }}>
                  Clientes Visitados
                </span>
              </div>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: '28px',
              color: '#1a1a1a',
              margin: '0 0 12px 0'
            }}>
              12
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#697b92',
              margin: 0
            }}>
              Objetivo: 15 clientes
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '28px',
            display: 'flex',
            gap: '12px'
          }}>
            <ActionButton 
              icon={svgPaths.p3b239480}
              label="Nueva Venta"
              bgColor="#0C2ABF"
              onClick={() => onNavigate('ventasMenu')}
            />
            <ActionButton 
              icon={svgPaths.p2b865700}
              label="Informe del Día"
              bgColor="#0C2ABF"
              onClick={() => onNavigate('resumenDia')}
            />
            <ActionButton 
              icon={svgPaths.pe420700}
              label="Sincronizar datos"
              bgColor="#0C2ABF"
              isSync
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Recent sales */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '28px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px'
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d={svgPaths.p28a4b00} stroke="url(#paint0_linear_cart)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <defs>
                <linearGradient id="paint0_linear_cart" x1="1" x2="22.5477" y1="1" y2="12.1344" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#092090" />
                  <stop offset="1" stopColor="#0C2ABF" />
                </linearGradient>
              </defs>
            </svg>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '24px',
              color: '#1a1a1a',
              margin: 0
            }}>
              Ventas Recientes
            </h2>
          </div>

          {/* Sales list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {salesData.map((sale, index) => (
              <SaleItem key={index} {...sale} />
            ))}
          </div>

          <button style={{
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path clipRule="evenodd" d={svgPaths.p3b239480} fill="url(#paint0_linear_ver_todas)" fillRule="evenodd" />
              <defs>
                <linearGradient id="paint0_linear_ver_todas" x1="0" x2="19.1535" y1="0" y2="9.89722" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#092090" />
                  <stop offset="1" stopColor="#0C2ABF" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Ver todas las ventas
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, viewBox = "0 0 15 15" }: { icon: string; label: string; viewBox?: string }) {
  return (
    <div style={{
      width: '79px',
      height: '63.672px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '14px',
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    }}>
      <svg width="13.5" height="13.5" viewBox={viewBox} fill="none" style={{ marginBottom: '8px' }}>
        <path d={icon} stroke="url(#paint0_linear_menu)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
        <defs>
          <linearGradient id="paint0_linear_menu" x1="0.589552" x2="16" y1="0.589552" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#092090" />
            <stop offset="1" stopColor="#0C2ABF" />
          </linearGradient>
        </defs>
      </svg>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '11.791px',
        lineHeight: '11.791px',
        background: 'linear-gradient(to right, #092090, #0C2ABF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0
      }}>
        {label}
      </p>
    </div>
  );
}

function MenuItemBox({ icon, label, viewBox = "0 0 15 15" }: { icon: string; label: string; viewBox?: string }) {
  return (
    <div style={{
      width: '79px',
      height: '63.672px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '14px',
      backgroundColor: '#ffffff',
      borderRadius: '58.955px',
      cursor: 'pointer'
    }}>
      <svg width="13.5" height="13.5" viewBox={viewBox} fill="none" style={{ marginBottom: '8px' }}>
        <path d={icon} stroke="url(#paint0_linear_menu_box)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
        <defs>
          <linearGradient id="paint0_linear_menu_box" x1="0.589552" x2="16" y1="0.589552" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#092090" />
            <stop offset="1" stopColor="#0C2ABF" />
          </linearGradient>
        </defs>
      </svg>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '11.791px',
        lineHeight: '11.791px',
        background: 'linear-gradient(to right, #092090, #0C2ABF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0
      }}>
        {label}
      </p>
    </div>
  );
}

function StatsCard({ title, value, change, changeType }: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'positive' | 'warning' 
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '28px',
      position: 'relative'
    }}>
      <div style={{
        display: 'inline-block',
        padding: '5px 10px',
        backgroundColor: '#0C2ABF',
        borderRadius: '20px',
        marginBottom: '38px'
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: '#ffffff'
        }}>
          {title}
        </span>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '28px',
        lineHeight: '28px',
        color: '#1a1a1a',
        margin: '0 0 12px 0'
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '14px',
        color: changeType === 'positive' ? '#91e600' : '#f59f0a',
        margin: 0
      }}>
        {change}
      </p>
      <div style={{
        position: 'absolute',
        top: '28px',
        right: '28px'
      }}>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
          <path clipRule="evenodd" d={svgPaths.pdb37600} fill="url(#paint0_linear_stats)" fillRule="evenodd" />
          <defs>
            <linearGradient id="paint0_linear_stats" x1="0" x2="21.6479" y1="0" y2="11.1862" gradientUnits="userSpaceOnUse">
              <stop stopColor="#092090" />
              <stop offset="1" stopColor="#0C2ABF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, bgColor, isSync = false, onClick }: { 
  icon: string; 
  label: string; 
  bgColor: string;
  isSync?: boolean;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      style={{
        width: '87.957px',
        height: '87.957px',
        backgroundColor: bgColor,
        borderRadius: '10.471px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        {isSync ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        ) : icon === svgPaths.p3b239480 ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path clipRule="evenodd" d={icon} fill="white" fillRule="evenodd" />
          </svg>
        ) : (
          <svg width="14" height="8" viewBox="0 0 16 10" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        )}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '12px',
          color: '#ffffff',
          textAlign: 'center',
          margin: 0,
          maxWidth: '65px'
        }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function SaleItem({ id, client, time, amount, type }: { 
  id: string; 
  client: string; 
  time: string; 
  amount: string; 
  type: 'paid' | 'cancelled' 
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '18px',
      position: 'relative',
      minHeight: '106px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '18px',
        padding: '3px 5px',
        backgroundColor: type === 'paid' ? '#91e600' : '#f59f0a',
        borderRadius: '5px'
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '10px',
          lineHeight: '10px',
          color: '#1a1a1a'
        }}>
          {id}
        </span>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '14px',
        color: '#1a1a1a',
        margin: '0 0 8px 0'
      }}>
        {client}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#697b92',
        margin: 0
      }}>
        {time} | Ver Detalles
      </p>
      <p style={{
        position: 'absolute',
        top: '46px',
        right: '18px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '14px',
        color: '#0c1c8d',
        textAlign: 'right',
        margin: 0
      }}>
        {amount}
      </p>
    </div>
  );
}
