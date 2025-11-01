import svgPaths from "../imports/svg-2fxeo0qy2u";
import imgRectangle8 from "figma:asset/254b3ba5fa2fb52d54e1f8eccb31ce8237b140b8.png";
import Navigation from "./Navigation";
import SyncStatus from "./SyncStatus";
import { NotaVenta, Gasto, Cobro } from '../App';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  notasVenta: NotaVenta[];
  gastos: Gasto[];
  cobros: Cobro[];
}

export default function Dashboard({ onNavigate, notasVenta, gastos, cobros }: DashboardProps) {
  // Calcular totales desde los datos globales
  const calcularTotalVentas = () => {
    return notasVenta
      .filter(n => n.estado !== 'anulada')
      .reduce((sum, nota) => {
        const precio = parseFloat(nota.precio.replace(',', '.').replace('€', '').trim() || '0');
        return sum + precio;
      }, 0);
  };

  const calcularTotalGastos = () => {
    return gastos.reduce((sum, gasto) => {
      const precio = parseFloat(gasto.precio.replace(',', '.').replace('€', '').trim() || '0');
      return sum + precio;
    }, 0);
  };

  const totalVentas = calcularTotalVentas();
  const totalGastos = calcularTotalGastos();
  const numeroVentas = notasVenta.filter(n => n.estado !== 'anulada').length;
  const cobrosPendientes = cobros.filter(c => c.estado === 'pendiente');
  const totalCobrosPendientes = cobrosPendientes.reduce((sum, cobro) => {
    const monto = parseFloat(cobro.monto.replace(',', '.').replace('€', '').trim() || '0');
    return sum + monto;
  }, 0);

  // Preparar datos de ventas para la lista
  const salesData = notasVenta.slice(0, 6).map(nota => ({
    id: nota.id,
    client: nota.cliente,
    time: nota.fecha,
    amount: nota.precio,
    type: nota.estado === 'anulada' ? 'cancelled' : 'paid'
  }));

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
        padding: '40px clamp(20px, 5vw, 60px)',
        overflowY: 'auto',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Estado de Sincronización - Conectado globalmente */}
        <SyncStatus style={{ marginBottom: '20px', maxWidth: '300px' }} />
        
        {/* Hero section */}
        <div style={{
          width: '100%',
          height: '280px',
          position: 'relative',
          marginBottom: '30px',
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
            padding: '32px 40px',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h1 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '32px',
                lineHeight: 1.2,
                color: '#ffffff',
                margin: '0 0 12px 0',
                maxWidth: '500px'
              }}>
                <span style={{ fontWeight: 700 }}>Bienvenido, Vendedor</span>
              </h1>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: 1.6,
                color: '#ffffff',
                margin: '0',
                opacity: 0.9,
                maxWidth: '400px'
              }}>
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            
            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => onNavigate('nuevaVenta')}
                style={{
                  padding: '14px 24px',
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
                  Nueva Venta
                </span>
              </button>

              <button 
                onClick={() => onNavigate('resumenDia')}
                style={{
                  padding: '14px 24px',
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
                  Ver Informe
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Alertas importantes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '30px'
        }}>
          <div style={{
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '24px', height: '24px', color: '#f59e0b' }}>⚠️</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#92400e', margin: 0 }}>
                {cobrosPendientes.length} Cobros Pendientes
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#92400e', margin: 0, opacity: 0.8 }}>
                Total: {totalCobrosPendientes.toFixed(2).replace('.', ',')} €
              </p>
            </div>
            <button 
              onClick={() => onNavigate('cobrosList')}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f59e0b',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white'
              }}>
              Ver
            </button>
          </div>

          <div style={{
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '24px', height: '24px', color: '#ef4444' }}>📦</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#991b1b', margin: 0 }}>
                Stock bajo en productos
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#991b1b', margin: 0, opacity: 0.8 }}>
                Requiere atención
              </p>
            </div>
            <button 
              onClick={() => onNavigate('resumenStock')}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ef4444',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white'
              }}>
              Ver
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div 
            onClick={() => onNavigate('resumenDia')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Ventas Hoy"
              value={`${totalVentas.toFixed(2).replace('.', ',')} €`}
              change={`${numeroVentas} ventas`}
              changeType="positive"
            />
          </div>
          <div 
            onClick={() => onNavigate('gastos')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Gastos Hoy"
              value={`${totalGastos.toFixed(2).replace('.', ',')} €`}
              change={`${gastos.length} gastos`}
              changeType="warning"
            />
          </div>
          <div 
            onClick={() => onNavigate('resumenDia')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Nº de Ventas"
              value={numeroVentas.toString()}
              change={`Total hoy`}
              changeType="positive"
            />
          </div>
        </div>

        {/* Grid principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Clientes Visitados */}
          <div 
            onClick={() => onNavigate('clientes')}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 32, 144, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '20px'
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
              fontSize: '36px',
              lineHeight: '36px',
              color: '#1a1a1a',
              margin: '0 0 8px 0'
            }}>
              {numeroVentas}<span style={{ fontSize: '24px', color: '#697b92' }}>/15</span>
            </p>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '12px'
            }}>
              <div style={{
                width: `${Math.min((numeroVentas / 15) * 100, 100)}%`,
                height: '100%',
                background: 'linear-gradient(to right, #092090, #0C2ABF)'
              }} />
            </div>
          </div>

          {/* Clientes del día */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#1a1a1a',
                margin: 0
              }}>
                Clientes de Hoy
              </h3>
              <button
                onClick={() => onNavigate('agenda')}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#092090'
                }}>
                Ver agenda
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '3px solid #092090' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                  09:00 - Distribuciones Rivera
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#697b92', margin: 0 }}>
                  Visita programada
                </p>
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                  10:30 - Almacenes López
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#697b92', margin: 0 }}>
                  Entrega pendiente
                </p>
              </div>
              <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                  12:00 - Transportes García
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#697b92', margin: 0 }}>
                  Cobro pendiente
                </p>
              </div>
            </div>
          </div>

          {/* Accesos rápidos */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '24px'
          }}>
            <h3 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#1a1a1a',
              margin: '0 0 16px 0'
            }}>
              Accesos Rápidos
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              <button
                onClick={() => onNavigate('ventasMenu')}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #092090 0%, #0C2ABF 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d={svgPaths.p28a4b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Ventas
                </span>
              </button>

              <button
                onClick={() => onNavigate('cobrosList')}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  border: '2px solid #092090',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.64 10.69 8.1 11.94 8.1C13.24 8.1 13.76 8.7 13.81 9.6H15.58C15.52 8.28 14.62 7.1 12.94 6.67V5H10.94V6.65C9.36 7.02 8.12 8.01 8.12 9.5C8.12 11.26 9.63 12.15 11.81 12.66C13.77 13.11 14.19 13.74 14.19 14.45C14.19 15 13.79 15.9 11.94 15.9C10.24 15.9 9.62 15.25 9.51 14.35H7.75C7.87 16.03 9.11 16.97 10.94 17.33V19H12.94V17.35C14.53 17.03 15.77 16.15 15.77 14.43C15.77 12.3 14.09 11.59 12.31 11.14Z" fill="url(#paint0_linear_cobros)" />
                  <defs>
                    <linearGradient id="paint0_linear_cobros" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}>
                  Cobros
                </span>
              </button>

              <button
                onClick={() => onNavigate('gastos')}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  border: '2px solid #092090',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="url(#paint0_linear_gastos)" />
                  <defs>
                    <linearGradient id="paint0_linear_gastos" x1="3" x2="21" y1="3" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}>
                  Gastos
                </span>
              </button>

              <button
                onClick={() => onNavigate('articulos')}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  border: '2px solid #092090',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM19 20H5V9H19V20ZM20 7H4V4H20V7Z" fill="url(#paint0_linear_almacen)" />
                  <defs>
                    <linearGradient id="paint0_linear_almacen" x1="2" x2="22" y1="2" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center'
                }}>
                  Almacén
                </span>
              </button>
            </div>
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

          <button 
            onClick={() => onNavigate('resumenDia')}
            style={{
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

function StatsCard({ title, value, change, changeType }: { title: string; value: string; change: string; changeType: 'positive' | 'negative' | 'warning' }) {
  const changeColor = changeType === 'positive' ? '#10b981' : changeType === 'negative' ? '#ef4444' : '#f59e0b';
  
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '24px',
      transition: 'all 0.2s'
    }}>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: '#697b92',
        margin: '0 0 8px 0'
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '32px',
        color: '#1a1a1a',
        margin: '0 0 8px 0'
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        color: changeColor,
        margin: 0
      }}>
        {change}
      </p>
    </div>
  );
}

function SaleItem({ id, client, time, amount, type }: { id: string; client: string; time: string; amount: string; type: 'paid' | 'cancelled' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      backgroundColor: type === 'cancelled' ? '#fef2f2' : '#f8fafc',
      borderRadius: '8px',
      border: `1px solid ${type === 'cancelled' ? '#fecaca' : '#e2e8f0'}`
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: type === 'cancelled' 
          ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
          : 'linear-gradient(135deg, #092090 0%, #0C2ABF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '14px'
      }}>
        {type === 'cancelled' ? 'X' : 'P'}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          color: '#1a1a1a',
          margin: '0 0 4px 0'
        }}>
          {id} - {client}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#697b92',
          margin: 0
        }}>
          {time}
        </p>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        color: type === 'cancelled' ? '#dc2626' : '#092090',
        margin: 0,
        textDecoration: type === 'cancelled' ? 'line-through' : 'none'
      }}>
        {amount}
      </p>
    </div>
  );
}
