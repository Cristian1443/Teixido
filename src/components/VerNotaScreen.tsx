import { useState } from 'react';
import svgPaths from "../imports/svg-wdyebm1qzk";
import img from "figma:asset/64e22b9a1eb7f86d37f38817111a710f2aedc975.png";
import AnularNotaModal from "./AnularNotaModal";
import CerrarOperacionModal from "./CerrarOperacionModal";
import { imprimirNotaVenta } from "./PrintUtils";

interface VerNotaScreenProps {
  onNavigate: (screen: string) => void;
  ventaData?: any;
  onModificar?: () => void;
  onAnular?: () => void;
  onCerrar?: () => void;
}

export default function VerNotaScreen({ onNavigate, ventaData, onModificar, onAnular, onCerrar }: VerNotaScreenProps) {
  const [activeTab, setActiveTab] = useState('lineas');
  const [showAnularModal, setShowAnularModal] = useState(false);
  const [showCerrarModal, setShowCerrarModal] = useState(false);

  // Datos de artículos (usar datos reales si existen, sino mock data)
  const articulos = ventaData?.articulos || Array(11).fill({
    nombre: 'Artículo',
    cantidad: '01',
    valor: '27,00 €',
    descuento: '16,00 €',
    porcentaje: '12%'
  });

  // Cliente data
  const cliente = ventaData?.cliente || {
    codigo: '101',
    nombre: 'Panadería El Trigo Dorado',
    razonSocial: 'Martín Delgado S.L.',
    nif: 'B12345678',
    direccion: 'Av. Castilla 89, Oviedo, Asturias',
    telefono: '+34 985 234 789',
    email: 'contacto@eltrigodorado.es'
  };

  // Totales
  const totales = ventaData?.totales || {
    descuentos: '297,00',
    porcentajeDescuento: '17',
    iva: '123,00',
    total: '2.450,00'
  };

  const tipoNota = ventaData?.tipoNota || 'Serie P';
  const formaPago = ventaData?.formaPago || 'Tarjeta de Crédito';
  const estado = ventaData?.estado || 'pendiente';

  const handleModificar = () => {
    if (onModificar) {
      onModificar();
    } else {
      onNavigate('nuevaVenta');
    }
  };

  const handleImprimir = () => {
    // Preparar datos para impresión matricial
    const notaParaImprimir = {
      id: ventaData?.id || 'P000',
      cliente: {
        codigo: cliente.codigo || cliente.id || '',
        nombre: cliente.nombre || cliente.empresa || '',
        razonSocial: cliente.razonSocial || cliente.empresa || '',
        nif: cliente.nif || '',
        direccion: cliente.direccion || '',
        telefono: cliente.telefono || ''
      },
      articulos: articulos.map((art: any) => ({
        nombre: art.nombre || '',
        cantidad: art.cantidad || 0,
        valor: art.valor,
        precioUnitario: art.precioUnitario,
        descuento: art.descuento || 0,
        tipoDescuento: art.tipoDescuento || 'pesos',
        nota: art.nota
      })),
      totales: {
        descuentos: totales.descuentos || '0,00',
        iva: totales.iva || '0,00',
        total: totales.total || '0,00'
      },
      tipoNota,
      formaPago,
      fecha: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    
    imprimirNotaVenta(notaParaImprimir);
  };

  const handleAnularClick = () => {
    setShowAnularModal(true);
  };

  const handleAnularConfirm = () => {
    if (onAnular) {
      onAnular();
    }
    setShowAnularModal(false);
    onNavigate('ventas');
  };

  const handleAnularCancel = () => {
    setShowAnularModal(false);
  };

  const handleCerrarClick = () => {
    setShowCerrarModal(true);
  };

  const handleCerrarConfirm = () => {
    if (onCerrar) {
      onCerrar();
    }
    setShowCerrarModal(false);
    onNavigate('ventas');
  };

  const handleCerrarCancel = () => {
    setShowCerrarModal(false);
  };

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
              alt="Logo"
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
                  <path d={svgPaths.p31930300} stroke="url(#paint0_linear_17_1381)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_1381" x1="0.589552" x2="16.3513" y1="0.589552" y2="8.73414">
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
                  <path d={svgPaths.p23a48780} stroke="url(#paint0_linear_17_1352)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1791" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_1352" x1="0.589552" x2="14.4445" y1="0.589552" y2="9.79434">
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
                <path d={svgPaths.p3fbdf600} stroke="url(#paint0_linear_17_1363)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                <path d={svgPaths.p3c0282f0} stroke="url(#paint1_linear_17_1363)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_1363" x1="3.75" x2="30.6846" y1="3.75" y2="17.668">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_17_1363" x1="11.25" x2="20.2282" y1="11.25" y2="15.8893">
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
            gap: '10px',
            height: '62px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 24px'
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '18px',
              color: '#1a1a1a',
              fontSize: '18px',
              textAlign: 'center',
              margin: 0
            }}>
              Resumen Nota
            </p>
          </div>
        </div>

        {/* Content wrapper */}
        <div style={{
          flex: 1,
          padding: 'clamp(20px, 3vw, 34px) clamp(30px, 5vw, 60px) clamp(40px, 5vw, 60px) clamp(30px, 5vw, 60px)',
          display: 'flex',
          gap: 'clamp(20px, 4vw, 60px)',
          maxWidth: '1280px'
        }}>
          {/* Left column - Nota de Venta Card */}
          <div style={{
            flex: '0 0 clamp(500px, 52%, 669px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              {/* Header de la nota */}
              <div style={{
                padding: '22px 34px 34px 34px',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <p style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '18px',
                  fontSize: '20px',
                  textAlign: 'center',
                  margin: '0 0 30px 0'
                }}>
                  Nota de Venta
                </p>

                {/* Cliente */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    backgroundColor: '#0C2ABF',
                    borderRadius: '5px',
                    padding: '3px 5px'
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '10px',
                      fontSize: '10px',
                      color: '#ffffff',
                      margin: 0
                    }}>
                      {cliente.codigo}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    color: '#1a1a1a',
                    fontSize: '18px',
                    margin: 0
                  }}>
                    {cliente.nombre}
                  </p>
                </div>

                {/* Razón Social y NIF */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '10px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <p style={{
                      backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '14px',
                      margin: 0
                    }}>
                      Razón Social:
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: '14px',
                      color: '#697b92',
                      margin: 0
                    }}>
                      {cliente.razonSocial}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <p style={{
                      backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '14px',
                      margin: 0
                    }}>
                      NIF:
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: '14px',
                      color: '#697b92',
                      margin: 0
                    }}>
                      {cliente.nif}
                    </p>
                  </div>
                </div>

                {/* Dirección */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <p style={{
                    backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '14px',
                    margin: 0
                  }}>
                    Dirección:
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    lineHeight: '14px',
                    color: '#697b92',
                    margin: 0
                  }}>
                    {cliente.direccion}
                  </p>
                </div>

                {/* Teléfono y Email */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '10px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <p style={{
                      backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '14px',
                      margin: 0
                    }}>
                      Teléfono:
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: '14px',
                      color: '#697b92',
                      margin: 0
                    }}>
                      {cliente.telefono}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <p style={{
                      backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '14px',
                      margin: 0
                    }}>
                      E-mail:
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: '14px',
                      color: '#697b92',
                      margin: 0
                    }}>
                      {cliente.email}
                    </p>
                  </div>
                </div>

                {/* Tipo de Nota y Forma de Pago */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    backgroundColor: '#0C2ABF',
                    borderRadius: '5px',
                    padding: '5px 10px'
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '14px',
                      color: '#ffffff',
                      margin: 0
                    }}>
                      <span>Tipo de Nota: </span>
                      <span style={{ fontWeight: 400 }}>{tipoNota}</span>
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: '#0C2ABF',
                    borderRadius: '5px',
                    padding: '5px 10px'
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '14px',
                      color: '#ffffff',
                      margin: 0
                    }}>
                      Forma de Pago: {formaPago}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de artículos */}
              <div style={{
                maxHeight: '367px',
                overflowY: 'auto',
                padding: '20px 34px',
                borderBottom: '1px solid #e2e8f0'
              }}>
                {articulos.map((articulo, index) => (
                  <div key={index} style={{
                    marginBottom: index < articulos.length - 1 ? '12px' : 0
                  }}>
                    {/* Row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '279px 60px 93px 115px 20px',
                      gap: '8px',
                      alignItems: 'start'
                    }}>
                      {/* Artículo */}
                      <div>
                        <p style={{
                          backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '8px',
                          lineHeight: '8px',
                          marginBottom: '12px',
                          paddingLeft: '8px'
                        }}>
                          Artículo
                        </p>
                        <div style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '5px',
                          padding: '15px 8px'
                        }}>
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {articulo.nombre}
                          </p>
                        </div>
                      </div>

                      {/* Cantidad */}
                      <div>
                        <p style={{
                          backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '8px',
                          lineHeight: '8px',
                          marginBottom: '12px',
                          paddingLeft: '8px'
                        }}>
                          Cantidad
                        </p>
                        <div style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '5px',
                          padding: '15px 8px',
                          textAlign: 'center'
                        }}>
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {articulo.cantidad}
                          </p>
                        </div>
                      </div>

                      {/* Valor */}
                      <div>
                        <p style={{
                          backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '8px',
                          lineHeight: '8px',
                          marginBottom: '12px',
                          paddingLeft: '8px'
                        }}>
                          Valor
                        </p>
                        <div style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '5px',
                          padding: '15px 8px'
                        }}>
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {articulo.valor}
                          </p>
                        </div>
                      </div>

                      {/* Descuento */}
                      <div>
                        <p style={{
                          backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '8px',
                          lineHeight: '8px',
                          marginBottom: '12px',
                          paddingLeft: '8px'
                        }}>
                          Descuento
                        </p>
                        <div style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '5px',
                          padding: '15px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {articulo.descuento}
                          </p>
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            lineHeight: '12px',
                            color: '#07bc13',
                            margin: 0
                          }}>
                            {articulo.porcentaje}
                          </p>
                        </div>
                      </div>

                      {/* Icono de documento */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        height: '100%',
                        paddingBottom: '15px'
                      }}>
                        <svg style={{ display: 'block', width: '16px', height: '20px' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                          <path d={svgPaths.p29ed09a0} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Botones y Totales */}
          <div style={{
            flex: '0 0 clamp(280px, 27%, 351px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Botón Modificar */}
            <div 
              onClick={handleModificar}
              style={{
                backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                borderRadius: '30px',
                cursor: 'pointer'
              }}>
              <div style={{ width: '16px', height: '16px' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p2eccba00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '14px',
                fontSize: '14px',
                color: '#ffffff',
                margin: 0
              }}>
                Modificar
              </p>
              <div style={{ width: '16px', height: '16px' }} />
            </div>

            {/* Botón Imprimir */}
            <div 
              onClick={handleImprimir}
              style={{
                backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                borderRadius: '30px',
                cursor: 'pointer'
              }}>
              <div style={{ width: '16px', height: '16px' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p2489f5b2} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '14px',
                fontSize: '14px',
                color: '#ffffff',
                margin: 0
              }}>
                Imprimir
              </p>
              <div style={{ width: '16px', height: '16px' }} />
            </div>

            {/* Botón Anular */}
            <div 
              onClick={handleAnularClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                borderRadius: '30px',
                border: '1px solid #092090',
                cursor: 'pointer'
              }}>
              <div style={{ width: '16px', height: '16px' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p2f64d200} stroke="url(#paint0_linear_17_2265)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_17_2265" x1="0.75" x2="19.9035" y1="0.75" y2="10.6472">
                      <stop stopColor="#092090" />
                      <stop offset="1" stopColor="#0C2ABF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p style={{
                backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '14px',
                fontSize: '14px',
                margin: 0
              }}>
                Anular
              </p>
              <div style={{ width: '16px', height: '16px' }} />
            </div>

            {/* Separador */}
            <div style={{
              height: '1px',
              backgroundColor: '#e2e8f0',
              margin: '10px 0'
            }} />

            {/* Botón Cerrar Operación */}
            <div 
              onClick={handleCerrarClick}
              style={{
                backgroundImage: 'linear-gradient(to right, #8bd600, #c4ff57)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                borderRadius: '30px',
                cursor: 'pointer'
              }}>
              <div style={{ width: '12px', height: '16px' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
                  <path d={svgPaths.p37bb88ef} stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '14px',
                color: '#1a1a1a',
                fontSize: '14px',
                margin: 0
              }}>
                Cerrar Operación
              </p>
              <div style={{ width: '16px', height: '16px' }} />
            </div>

            {/* Panel de totales */}
            <div style={{
              backgroundColor: '#f3f7fd',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '34px',
              marginTop: '40px'
            }}>
              {/* Descuentos */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  color: '#697b92',
                  margin: 0
                }}>
                  Descuentos:
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  color: '#697b92',
                  margin: 0
                }}>
                  {totales.descuentos} € ({totales.porcentajeDescuento}%)
                </p>
              </div>

              {/* IVA o RE */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  color: '#697b92',
                  margin: 0
                }}>
                  IVA o RE
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  color: '#697b92',
                  margin: 0
                }}>
                  {totales.iva} €
                </p>
              </div>

              {/* Subtotal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                borderRadius: '50px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}>
                <p style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  margin: 0
                }}>
                  Subtotal:
                </p>
                <p style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '18px',
                  margin: 0
                }}>
                  {totales.total} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AnularNotaModal
        show={showAnularModal}
        onConfirm={handleAnularConfirm}
        onCancel={handleAnularCancel}
      />
      <CerrarOperacionModal
        show={showCerrarModal}
        onConfirm={handleCerrarConfirm}
        onCancel={handleCerrarCancel}
      />
    </div>
  );
}