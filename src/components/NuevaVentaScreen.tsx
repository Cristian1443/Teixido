import { useState } from 'react';
import Navigation from "./Navigation";
import svgPaths from "../imports/svg-c5p8kwdoqq";
import svgPathsLineas from "../imports/svg-vr2wkzt2hw";
import svgPathsModal from "../imports/svg-snvqwdfu14";
import svgPathsPorcentaje from "../imports/svg-rcci5w90mw";
import svgPathsPesos from "../imports/svg-q6030ad8oe";
import HistorialVentasModal from "./HistorialVentasModal";

interface NuevaVentaScreenProps {
  onNavigate: (screen: string) => void;
  onSaveVenta?: (ventaData: any) => void;
}

export default function NuevaVentaScreen({ onNavigate, onSaveVenta }: NuevaVentaScreenProps) {
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [showPagoDropdown, setShowPagoDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('lineas');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingArticulo, setEditingArticulo] = useState<any>(null);
  const [descuentoTipo, setDescuentoTipo] = useState<'porcentaje' | 'pesos'>('porcentaje');
  const [notaTexto, setNotaTexto] = useState('Lorem ipsum dolor sit amet. Et explicabo modi eum tempora voluptate ut itaque voluptatem id recusandae beatae?');
  const [tieneDescuento, setTieneDescuento] = useState(false);
  const [descuentoAplicarTipo, setDescuentoAplicarTipo] = useState<'porcentaje' | 'pesos'>('porcentaje');
  const [aplicarDescuentoTipo, setAplicarDescuentoTipo] = useState<'porcentaje' | 'pesos'>('porcentaje');
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articuloToDelete, setArticuloToDelete] = useState<any>(null);
  
  // Estados para el formulario de artículos
  const [articuloNombre, setArticuloNombre] = useState('');
  const [articuloCantidad, setArticuloCantidad] = useState('1');
  const [articuloPrecio, setArticuloPrecio] = useState('');
  const [articuloNota, setArticuloNota] = useState('');
  const [descuentoDocumentoValor, setDescuentoDocumentoValor] = useState('17');
  const [descuentoArticuloValor, setDescuentoArticuloValor] = useState('17');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('105 | Boutique Encanto');
  const [tipoNotaSeleccionado, setTipoNotaSeleccionado] = useState('Serie P (Oficiales)');
  const [formaPagoSeleccionado, setFormaPagoSeleccionado] = useState('Tarjeta de Débito');
  
  // Lista de artículos agregados
  const [articulos, setArticulos] = useState<any[]>([
    { id: 1, nombre: 'Artículo Ejemplo 1', cantidad: '01', valor: '27,00 €', descuento: '16,00 €', porcentaje: '12%' },
    { id: 2, nombre: 'Artículo Ejemplo 2', cantidad: '01', valor: '27,00 €', descuento: '16,00 €', porcentaje: '12%' },
    { id: 3, nombre: 'Artículo Ejemplo 3', cantidad: '01', valor: '27,00 €', descuento: '16,00 €', porcentaje: '12%' },
  ]);

  const tiposNota = ['Serie P (Oficiales)', 'Serie X (No oficiales)', 'Pedido', 'Presupuesto', 'Adicional', 'Incidencia'];
  const formasPago = ['Tarjeta de Débito', 'Tarjeta de Crédito', 'Bizum', 'Transferencia Bancaria'];

  const handleEditClick = (articulo: any) => {
    setEditingArticulo(articulo);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingArticulo(null);
    setDescuentoTipo('porcentaje');
    setNotaTexto('Lorem ipsum dolor sit amet. Et explicabo modi eum tempora voluptate ut itaque voluptatem id recusandae beatae?');
  };

  const toggleDescuentoTipo = () => {
    setDescuentoTipo(prev => prev === 'porcentaje' ? 'pesos' : 'porcentaje');
  };

  const toggleDescuentoAplicar = () => {
    setDescuentoAplicarTipo(prev => prev === 'porcentaje' ? 'pesos' : 'porcentaje');
  };

  const toggleAplicarDescuento = () => {
    setAplicarDescuentoTipo(prev => prev === 'porcentaje' ? 'pesos' : 'porcentaje');
  };

  const handleAddArticulo = () => {
    if (!articuloNombre || !articuloPrecio) {
      alert('Por favor completa el nombre y precio del artículo');
      return;
    }

    const nuevoArticulo = {
      id: Date.now(),
      nombre: articuloNombre,
      cantidad: articuloCantidad.padStart(2, '0'),
      valor: `${articuloPrecio} €`,
      descuento: tieneDescuento ? `${descuentoArticuloValor} ${aplicarDescuentoTipo === 'porcentaje' ? '%' : '€'}` : '0 €',
      porcentaje: tieneDescuento ? `${descuentoArticuloValor}%` : '0%'
    };

    setArticulos([...articulos, nuevoArticulo]);
    
    // Limpiar el formulario
    setArticuloNombre('');
    setArticuloCantidad('1');
    setArticuloPrecio('');
    setArticuloNota('');
    setDescuentoArticuloValor('17');
  };

  const handleDeleteClick = (articulo: any) => {
    setArticuloToDelete(articulo);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (articuloToDelete) {
      setArticulos(articulos.filter(art => art.id !== articuloToDelete.id));
    }
    setShowDeleteModal(false);
    setArticuloToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setArticuloToDelete(null);
  };

  const handleResumenNota = () => {
    if (articulos.length === 0) {
      alert('No hay artículos en la nota de venta. Por favor, añade al menos un artículo antes de continuar.');
      return;
    }
    
    if (!clienteSeleccionado) {
      alert('Por favor, selecciona un cliente antes de continuar.');
      return;
    }
    
    // Preparar datos de la venta
    const ventaData = {
      cliente: {
        codigo: clienteSeleccionado.split('|')[0].trim(),
        nombre: clienteSeleccionado.split('|')[1]?.trim() || clienteSeleccionado,
        razonSocial: 'Martín Delgado S.L.',
        nif: 'B12345678',
        direccion: 'Av. Castilla 89, Oviedo, Asturias',
        telefono: '+34 985 234 789',
        email: 'contacto@eltrigodorado.es'
      },
      tipoNota: tipoNotaSeleccionado,
      formaPago: formaPagoSeleccionado,
      articulos: articulos,
      totales: calcularTotales(),
      fecha: new Date().toISOString(),
      estado: 'pendiente' // pendiente, cerrada, anulada
    };
    
    // Guardar la venta
    if (onSaveVenta) {
      onSaveVenta(ventaData);
    }
    
    // Navegar a la pantalla de resumen
    onNavigate('verNota');
  };

  // Calcular totales dinámicamente
  const calcularTotales = () => {
    let subtotal = 0;
    let totalDescuentos = 0;
    
    articulos.forEach(articulo => {
      // Extraer el valor numérico del precio (formato: "27,00 €")
      const precio = parseFloat(articulo.valor.replace(/[€\s]/g, '').replace(',', '.')) || 0;
      const cantidad = parseInt(articulo.cantidad) || 0;
      
      // Calcular subtotal del artículo
      const subtotalArticulo = precio * cantidad;
      subtotal += subtotalArticulo;
      
      // Extraer el valor del descuento (formato: "16,00 €")
      const descuento = parseFloat(articulo.descuento.replace(/[€$%\s]/g, '').replace(',', '.')) || 0;
      totalDescuentos += descuento * cantidad;
    });
    
    // Aplicar descuento del documento si existe
    if (tieneDescuento && descuentoDocumentoValor) {
      const descuentoDoc = parseFloat(descuentoDocumentoValor.replace(/[€$%\s]/g, '').replace(',', '.')) || 0;
      if (descuentoAplicarTipo === 'porcentaje') {
        totalDescuentos += (subtotal * descuentoDoc) / 100;
      } else {
        totalDescuentos += descuentoDoc;
      }
    }
    
    const subtotalConDescuento = subtotal - totalDescuentos;
    const iva = subtotalConDescuento * 0.21; // 21% IVA
    const total = subtotalConDescuento + iva;
    
    const porcentajeDescuento = subtotal > 0 ? ((totalDescuentos / subtotal) * 100).toFixed(0) : 0;
    
    return {
      subtotal: subtotal.toFixed(2),
      descuentos: totalDescuentos.toFixed(2),
      porcentajeDescuento,
      iva: iva.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const totales = calcularTotales();

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <Navigation currentScreen="ventas" onNavigate={onNavigate} />

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header móvil */}
        <div style={{
          backgroundColor: '#ffffff',
          height: '62px',
          width: '100%',
          borderBottom: '1px solid #e2e8f0',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            height: '61px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            width: '100%',
            maxWidth: '1200px'
          }}>
            <div style={{ width: '26px', height: '26px' }} />
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '18px',
              color: '#1a1a1a',
              fontSize: '18px',
              textAlign: 'center',
              whiteSpace: 'pre',
              margin: 0
            }}>
              Nueva Venta
            </p>
            <div 
              onClick={() => onNavigate('ventas')}
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

        {/* Content Container - Scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '60px',
            justifyContent: 'center',
            padding: '34px 40px 40px 40px',
            maxWidth: '1200px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Panel izquierdo - Formulario */}
            <div style={{
              height: '670px',
              width: '351px',
              flexShrink: 0,
              position: 'relative'
            }}>
              {/* Bottom buttons */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '634px',
                height: '36px',
                width: '351px'
              }}>
                <button
                  onClick={() => setShowHistorialModal(true)}
                  style={{
                    position: 'absolute',
                    left: '167px',
                    top: '7px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    padding: '4px 0',
                    borderRadius: '30px',
                    width: '150px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'relative', flexShrink: 0, width: '14px', height: '14px' }}>
                    <div style={{ position: 'absolute', inset: '-5.36%' }}>
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p3f6e59c8} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#697b92',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'pre',
                    margin: 0
                  }}>
                    Historial de Ventas
                  </p>
                </button>

                <button
                  onClick={handleResumenNota}
                  style={{
                    position: 'absolute',
                    backgroundImage: 'linear-gradient(to right, #8bd600, #c4ff57)',
                    left: 0,
                    top: 0,
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 5px',
                    borderRadius: '30px',
                    width: '155px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ height: '16px', position: 'relative', flexShrink: 0, width: '12px' }}>
                    <div style={{ position: 'absolute', inset: '-4.69% -6.25%' }}>
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
                        <path d={svgPaths.p30b56380} stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#1a1a1a',
                    fontSize: '14px',
                    textAlign: 'center',
                    whiteSpace: 'pre',
                    margin: 0
                  }}>
                    Resumen Nota
                  </p>
                </button>
              </div>

              {/* Sección de artículos */}
              <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                gap: '34px',
                alignItems: 'flex-start',
                left: 0,
                top: '154px',
                width: '351px'
              }}>
                {/* ¿Aplicar descuento en documento? */}
                <div style={{
                  height: '74px',
                  overflow: 'visible',
                  position: 'relative',
                  flexShrink: 0,
                  width: '100%'
                }}>
                  <div style={{
                    position: 'absolute',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    left: '252px',
                    top: 0,
                    width: '88px'
                  }}>
                    <button 
                      onClick={() => setTieneDescuento(true)}
                      style={{
                        backgroundColor: tieneDescuento ? '#0C2ABF' : '#ffffff',
                        cursor: 'pointer',
                        position: 'relative',
                        borderRadius: '30px',
                        flexShrink: 0,
                        width: '40px',
                        height: '30px',
                        border: tieneDescuento ? 'none' : '1px solid #092090',
                        padding: 0
                      }}>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '5px 10px',
                        position: 'relative',
                        borderRadius: 'inherit',
                        width: '40px'
                      }}>
                        <p style={{
                          backgroundImage: tieneDescuento ? 'none' : 'linear-gradient(to right, #092090, #0C2ABF)',
                          WebkitBackgroundClip: tieneDescuento ? 'initial' : 'text',
                          WebkitTextFillColor: tieneDescuento ? '#ffffff' : 'transparent',
                          color: tieneDescuento ? '#ffffff' : 'transparent',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          lineHeight: '14px',
                          position: 'relative',
                          flexShrink: 0,
                          fontSize: '12px',
                          textAlign: 'center',
                          whiteSpace: 'pre',
                          margin: 0
                        }}>
                          Si
                        </p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setTieneDescuento(false)}
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '5px 10px',
                        position: 'relative',
                        borderRadius: '30px',
                        flexShrink: 0,
                        width: '40px',
                        backgroundColor: !tieneDescuento ? '#0C2ABF' : '#ffffff',
                        border: !tieneDescuento ? 'none' : '1px solid #092090',
                        cursor: 'pointer'
                      }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        lineHeight: '14px',
                        position: 'relative',
                        flexShrink: 0,
                        fontSize: '12px',
                        textAlign: 'center',
                        whiteSpace: 'pre',
                        color: !tieneDescuento ? '#ffffff' : 'transparent',
                        backgroundImage: !tieneDescuento ? 'none' : 'linear-gradient(to right, #092090, #0C2ABF)',
                        WebkitBackgroundClip: !tieneDescuento ? 'initial' : 'text',
                        WebkitTextFillColor: !tieneDescuento ? '#ffffff' : 'transparent',
                        margin: 0
                      }}>
                        No
                      </p>
                    </button>
                  </div>

                  {tieneDescuento && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '30px',
                      height: '44px',
                      width: '351px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        left: 'calc(50% - 26px)',
                        padding: '15px',
                        borderRadius: '5px',
                        top: 0,
                        transform: 'translateX(-50%)',
                        width: '299px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <input
                          type="text"
                          value={descuentoDocumentoValor}
                          onChange={(e) => setDescuentoDocumentoValor(e.target.value)}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '14px',
                            position: 'relative',
                            flexShrink: 0,
                            color: '#697b92',
                            fontSize: '14px',
                            whiteSpace: 'pre',
                            margin: 0,
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            width: '100%'
                          }}
                          placeholder={descuentoAplicarTipo === 'porcentaje' ? '17%' : '27,00 $'}
                        />
                      </div>

                      <button 
                        onClick={toggleDescuentoAplicar}
                        style={{
                          position: 'absolute',
                          display: 'block',
                          cursor: 'pointer',
                          left: 'calc(50% + 153.5px)',
                          width: '44px',
                          height: '44px',
                          top: 0,
                          transform: 'translateX(-50%)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: 0
                        }}>
                        <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                          <rect fill="white" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
                          <rect height="43" rx="4.5" stroke={descuentoAplicarTipo === 'porcentaje' ? "url(#paint0_linear_desc1)" : "url(#paint0_linear_desc1_pesos)"} width="43" x="0.5" y="0.5" />
                          <path 
                            d={descuentoAplicarTipo === 'porcentaje' ? svgPathsPorcentaje.pfc210a0 : svgPathsPesos.p28b56e40} 
                            stroke={descuentoAplicarTipo === 'porcentaje' ? "url(#paint1_linear_desc1)" : "url(#paint1_linear_desc1_pesos)"} 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                          />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_desc1" x1="0" x2="52.6721" y1="0" y2="27.2174">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_desc1" x1="13" x2="34.5477" y1="13" y2="24.1344">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_desc1_pesos" x1="0" x2="52.6721" y1="0" y2="27.2174">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_desc1_pesos" x1="17" x2="31.0125" y1="13" y2="17.0226">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  )}

                  <p style={{
                    position: 'absolute',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    left: 0,
                    color: '#1a1a1a',
                    fontSize: '14px',
                    whiteSpace: 'pre',
                    top: '5px',
                    margin: 0
                  }}>
                    ¿Aplicar descuento en documento?
                  </p>
                </div>

                {/* Artículo form section */}
                <div style={{
                  height: '330px',
                  position: 'relative',
                  flexShrink: 0,
                  width: '100%'
                }}>
                  <p style={{
                    position: 'absolute',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    left: 0,
                    color: '#1a1a1a',
                    fontSize: '14px',
                    whiteSpace: 'pre',
                    top: 0,
                    margin: 0
                  }}>
                    Artículo
                  </p>

                  <p style={{
                    position: 'absolute',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '14px',
                    left: '284px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    whiteSpace: 'pre',
                    top: 0,
                    margin: 0
                  }}>
                    Cant.
                  </p>

                  {/* Descuento */}
                  {tieneDescuento && (
                    <div style={{
                      position: 'absolute',
                      left: '180px',
                      top: '82px',
                      height: '64px',
                      width: '171px'
                    }}>
                      <p style={{
                        position: 'absolute',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        lineHeight: '14px',
                        left: 0,
                        color: '#1a1a1a',
                        fontSize: '14px',
                        whiteSpace: 'pre',
                        top: 0,
                        margin: 0
                      }}>
                        Descuento
                      </p>

                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '20px',
                        height: '44px',
                        width: '171px'
                      }}>
                        <div style={{
                          position: 'absolute',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          left: 'calc(50% - 24px)',
                          padding: '15px',
                          borderRadius: '5px',
                          top: 0,
                          transform: 'translateX(-50%)',
                          width: '123px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <input
                            type="text"
                            value={descuentoArticuloValor}
                            onChange={(e) => setDescuentoArticuloValor(e.target.value)}
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              lineHeight: '14px',
                              position: 'relative',
                              flexShrink: 0,
                              color: '#697b92',
                              fontSize: '14px',
                              whiteSpace: 'pre',
                              margin: 0,
                              border: 'none',
                              outline: 'none',
                              backgroundColor: 'transparent',
                              width: '100%'
                            }}
                            placeholder={aplicarDescuentoTipo === 'porcentaje' ? '17%' : '27,00 $'}
                          />
                        </div>

                        <button 
                          onClick={toggleAplicarDescuento}
                          style={{
                            position: 'absolute',
                            display: 'block',
                            cursor: 'pointer',
                            left: '127px',
                            width: '44px',
                            height: '44px',
                            top: 0,
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: 0
                          }}>
                          <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                            <rect fill="white" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
                            <rect height="43" rx="4.5" stroke={aplicarDescuentoTipo === 'porcentaje' ? "url(#paint0_linear_desc2)" : "url(#paint0_linear_desc2_pesos)"} width="43" x="0.5" y="0.5" />
                            <path 
                              d={aplicarDescuentoTipo === 'porcentaje' ? svgPathsPorcentaje.pfc210a0 : svgPathsPesos.p28b56e40} 
                              stroke={aplicarDescuentoTipo === 'porcentaje' ? "url(#paint1_linear_desc2)" : "url(#paint1_linear_desc2_pesos)"} 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="1.5" 
                            />
                            <defs>
                              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_desc2" x1="0" x2="52.6721" y1="0" y2="27.2174">
                                <stop stopColor="#092090" />
                                <stop offset="1" stopColor="#0C2ABF" />
                              </linearGradient>
                              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_desc2" x1="13" x2="34.5477" y1="13" y2="24.1344">
                                <stop stopColor="#092090" />
                                <stop offset="1" stopColor="#0C2ABF" />
                              </linearGradient>
                              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_desc2_pesos" x1="0" x2="52.6721" y1="0" y2="27.2174">
                                <stop stopColor="#092090" />
                                <stop offset="1" stopColor="#0C2ABF" />
                              </linearGradient>
                              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_desc2_pesos" x1="17" x2="31.0125" y1="13" y2="17.0226">
                                <stop stopColor="#092090" />
                                <stop offset="1" stopColor="#0C2ABF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Artículo field */}
                  <div style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    left: 'calc(50% - 38.5px)',
                    padding: '15px',
                    borderRadius: '5px',
                    top: '20px',
                    transform: 'translateX(-50%)',
                    width: '274px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <input
                      type="text"
                      value={articuloNombre}
                      onChange={(e) => setArticuloNombre(e.target.value)}
                      placeholder="Buscar artículo..."
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '14px',
                        position: 'relative',
                        flex: 1,
                        color: '#697b92',
                        fontSize: '14px',
                        margin: 0,
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent'
                      }}
                    />
                    <div style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px' }}>
                      <div style={{ position: 'absolute', inset: '-4.688%' }}>
                        <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                          <path d={svgPaths.p23be5b00} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Precio */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '82px',
                    height: '64px',
                    width: '170px'
                  }}>
                    <p style={{
                      position: 'absolute',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '14px',
                      left: 0,
                      color: '#1a1a1a',
                      fontSize: '14px',
                      whiteSpace: 'pre',
                      top: 0,
                      margin: 0
                    }}>
                      Precio
                    </p>

                    <div style={{
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      left: '50%',
                      padding: '15px',
                      borderRadius: '5px',
                      top: '20px',
                      transform: 'translateX(-50%)',
                      width: '170px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={articuloPrecio}
                        onChange={(e) => setArticuloPrecio(e.target.value)}
                        placeholder="0,00"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '14px',
                          position: 'relative',
                          flexShrink: 0,
                          color: '#697b92',
                          fontSize: '14px',
                          margin: 0,
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          width: '100%'
                        }}
                      />
                    </div>
                  </div>

                  {/* Nota */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '162px',
                    height: '86px',
                    width: '351px'
                  }}>
                    <p style={{
                      position: 'absolute',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '14px',
                      left: 0,
                      color: '#1a1a1a',
                      fontSize: '14px',
                      whiteSpace: 'pre',
                      top: 0,
                      margin: 0
                    }}>
                      Nota:
                    </p>

                    <div style={{
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      gap: '8px',
                      height: '66px',
                      alignItems: 'flex-start',
                      left: '50%',
                      padding: '15px',
                      borderRadius: '5px',
                      top: '20px',
                      transform: 'translateX(-50%)',
                      width: '351px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <textarea
                        value={articuloNota}
                        onChange={(e) => setArticuloNota(e.target.value)}
                        placeholder="Escribe una nota opcional..."
                        maxLength={40}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '1.2',
                          position: 'relative',
                          flexShrink: 0,
                          color: '#697b92',
                          fontSize: '14px',
                          width: '321px',
                          margin: 0,
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          resize: 'none',
                          height: '36px'
                        }}
                      />
                    </div>
                  </div>

                  <p style={{
                    position: 'absolute',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '8px',
                    left: '323px',
                    color: '#697b92',
                    fontSize: '8px',
                    whiteSpace: 'pre',
                    top: '252px',
                    margin: 0
                  }}>
                    {articuloNota.length}/40
                  </p>

                  {/* Cantidad */}
                  <div style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    gap: '8px',
                    height: '46px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 'calc(50% + 142px)',
                    padding: '15px',
                    borderRadius: '5px',
                    top: '20px',
                    transform: 'translateX(-50%)',
                    width: '67px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <input
                      type="number"
                      min="1"
                      value={articuloCantidad}
                      onChange={(e) => setArticuloCantidad(e.target.value)}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '14px',
                        position: 'relative',
                        flexShrink: 0,
                        color: '#697b92',
                        fontSize: '14px',
                        textAlign: 'center',
                        margin: 0,
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        width: '37px'
                      }}
                    />
                  </div>

                  <p style={{
                    position: 'absolute',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '14px',
                    left: '66px',
                    color: '#697b92',
                    fontSize: '10px',
                    whiteSpace: 'pre',
                    top: 0,
                    margin: 0
                  }}>
                    Stock: 6
                  </p>

                  {/* Añadir Artículo button */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '264px',
                    height: '36px',
                    width: '161px'
                  }}>
                    <button
                      onClick={handleAddArticulo}
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 0,
                        padding: '10px 15px',
                        borderRadius: '30px',
                        top: 0,
                        width: '161px',
                        backgroundColor: '#0C2ABF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px' }}>
                        <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path clipRule="evenodd" d={svgPaths.p3b239480} fill="white" fillRule="evenodd" />
                        </svg>
                      </div>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        lineHeight: '14px',
                        position: 'relative',
                        flexShrink: 0,
                        fontSize: '14px',
                        textAlign: 'center',
                        whiteSpace: 'pre',
                        color: '#ffffff',
                        margin: 0
                      }}>
                        Añadir Artículo
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cliente, Tipo de Nota, Forma de Pago */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '120px',
                width: '351px'
              }}>
                <div style={{
                  position: 'absolute',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  left: '50%',
                  padding: '15px',
                  borderRadius: '5px',
                  top: '20px',
                  transform: 'translateX(-50%)',
                  width: '351px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '14px',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#697b92',
                    fontSize: '14px',
                    whiteSpace: 'pre',
                    margin: 0
                  }}>
                    105 | Boutique Encanto
                  </p>
                  <div style={{ height: '7px', position: 'relative', flexShrink: 0, width: '12px' }}>
                    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                      <path clipRule="evenodd" d={svgPaths.p21c6b980} fill="#697B92" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  left: 0,
                  color: '#1a1a1a',
                  fontSize: '14px',
                  whiteSpace: 'pre',
                  top: 0,
                  margin: 0
                }}>
                  Cliente
                </p>

                {/* Tipo de Nota dropdown */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '76px',
                  height: '44px',
                  width: '172px'
                }}>
                  <div
                    onClick={() => setShowTipoDropdown(!showTipoDropdown)}
                    style={{
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      left: 0,
                      padding: '15px',
                      borderRadius: '5px',
                      top: 0,
                      width: '172px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer'
                    }}
                  >
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '14px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '14px',
                      whiteSpace: 'pre',
                      margin: 0
                    }}>
                      {tipoNotaSeleccionado}
                    </p>
                    <button style={{
                      display: 'block',
                      cursor: 'pointer',
                      height: '7px',
                      position: 'relative',
                      flexShrink: 0,
                      width: '12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: 0
                    }}>
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                        <path clipRule="evenodd" d={svgPaths.p22e63200} fill="#697B92" fillRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {showTipoDropdown && (
                    <div style={{
                      position: 'absolute',
                      left: '5px',
                      top: '49px',
                      width: '162px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      zIndex: 20
                    }}>
                      {tiposNota.map((tipo, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setTipoNotaSeleccionado(tipo);
                            setShowTipoDropdown(false);
                          }}
                          style={{
                            backgroundColor: '#e2e8f0',
                            padding: '3px 10px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: index < tiposNota.length - 1 ? '1px solid rgba(105,123,146,0.22)' : 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {tipo}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Forma de Pago dropdown */}
                <div style={{
                  position: 'absolute',
                  left: '179px',
                  top: '76px',
                  height: '44px',
                  width: '172px'
                }}>
                  <div
                    onClick={() => setShowPagoDropdown(!showPagoDropdown)}
                    style={{
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      left: 0,
                      padding: '15px',
                      borderRadius: '5px',
                      top: 0,
                      width: '172px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '14px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '14px',
                      whiteSpace: 'pre',
                      margin: 0
                    }}>
                      {formaPagoSeleccionado}
                    </p>
                    <button style={{
                      display: 'block',
                      cursor: 'pointer',
                      height: '7px',
                      position: 'relative',
                      flexShrink: 0,
                      width: '12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: 0
                    }}>
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                        <path clipRule="evenodd" d={svgPaths.p21c6b980} fill="#697B92" fillRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {showPagoDropdown && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '48px',
                      width: '172px',
                      backgroundColor: '#ffffff',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      zIndex: 100,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e2e8f0'
                    }}>
                      {formasPago.map((forma, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormaPagoSeleccionado(forma);
                            setShowPagoDropdown(false);
                          }}
                          style={{
                            backgroundColor: '#ffffff',
                            padding: '12px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: index < formasPago.length - 1 ? '1px solid #e2e8f0' : 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                        >
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#697b92',
                            margin: 0
                          }}>
                            {forma}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Panel derecho - Nota de Venta */}
            <div style={{
              overflow: 'hidden',
              height: '670px',
              width: '669px',
              flexShrink: 0,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                height: '670px',
                left: 0,
                borderRadius: '20px',
                top: 0,
                width: '669px',
                border: '1px solid #e2e8f0'
              }} />

              {/* Sticky header */}
              <div style={{
                height: '90px',
                pointerEvents: 'auto',
                position: 'sticky',
                top: 0,
                width: '669px'
              }}>
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  height: '90px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 0,
                  top: 0,
                  width: '669px'
                }}>
                  <div style={{ flexShrink: 0, transform: 'scaleY(-1)' }}>
                    <div style={{
                      backgroundColor: '#ffffff',
                      height: '90px',
                      position: 'relative',
                      borderBottomLeftRadius: '20px',
                      borderBottomRightRadius: '20px',
                      width: '669px',
                      border: '1px solid #e2e8f0'
                    }} />
                  </div>
                </div>

                <p style={{
                  position: 'absolute',
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '18px',
                  left: '334.5px',
                  fontSize: '20px',
                  textAlign: 'center',
                  whiteSpace: 'pre',
                  top: '36px',
                  transform: 'translateX(-50%)',
                  margin: 0
                }}>
                  Nota de Venta
                </p>
              </div>

              {/* Lineas y Familias content area */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '115px',
                height: '411px',
                width: '669px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  overflow: 'hidden',
                  top: 0,
                  height: '399px',
                  width: '669px'
                }}>
                  <div style={{
                    height: '367px',
                    overflow: 'hidden',
                    position: 'relative',
                    width: '669px',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    {/* Content area - productos */}
                    <div style={{
                      padding: '20px 34px',
                      height: '100%',
                      overflowY: 'auto'
                    }}>
                      {activeTab === 'lineas' ? (
                        // Vista Líneas con columnas completas
                        <div style={{ position: 'relative' }}>
                          {articulos.map((articulo, index) => (
                            <div key={articulo.id} style={{
                              height: '56px',
                              width: '100%',
                              position: 'relative',
                              marginBottom: index < articulos.length - 1 ? '12px' : '0'
                            }}>
                              {/* Artículo */}
                              <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '241px',
                                height: '56px'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  gap: '8px',
                                  alignItems: 'center',
                                  left: '50%',
                                  padding: '15px 8px',
                                  borderRadius: '5px',
                                  top: '12px',
                                  transform: 'translateX(-50%)',
                                  width: '241px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '14px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#697b92',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    margin: 0
                                  }}>
                                    {articulo.nombre}
                                  </p>
                                </div>
                                <p style={{
                                  position: 'absolute',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '8px',
                                  left: '8px',
                                  fontSize: '8px',
                                  whiteSpace: 'nowrap',
                                  top: 0,
                                  margin: 0,
                                  color: 'transparent'
                                }}>
                                  Artículo
                                </p>
                              </div>

                              {/* Cantidad */}
                              <div 
                                onClick={() => handleEditClick(articulo)}
                                style={{
                                  position: 'absolute',
                                  left: '249px',
                                  top: 0,
                                  width: '60px',
                                  height: '56px',
                                  cursor: 'pointer'
                                }}>
                                <div style={{
                                  position: 'absolute',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  gap: '16px',
                                  alignItems: 'center',
                                  left: '50%',
                                  padding: '15px 8px',
                                  borderRadius: '5px',
                                  top: '12px',
                                  transform: 'translateX(-50%)',
                                  width: '60px',
                                  border: '1px solid #e2e8f0',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                                >
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '14px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#697b92',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    margin: 0
                                  }}>
                                    {articulo.cantidad}
                                  </p>
                                </div>
                                <p style={{
                                  position: 'absolute',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '8px',
                                  left: '8px',
                                  fontSize: '8px',
                                  whiteSpace: 'nowrap',
                                  top: 0,
                                  margin: 0,
                                  color: '#697b92'
                                }}>
                                  Cantidad
                                </p>
                              </div>

                              {/* Valor */}
                              <div style={{
                                position: 'absolute',
                                left: '317px',
                                top: 0,
                                width: '93px',
                                height: '56px'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  gap: '20px',
                                  alignItems: 'center',
                                  left: '50%',
                                  padding: '15px 8px',
                                  borderRadius: '5px',
                                  top: '12px',
                                  transform: 'translateX(-50%)',
                                  width: '93px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '14px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#697b92',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    margin: 0
                                  }}>
                                    {articulo.valor}
                                  </p>
                                </div>
                                <p style={{
                                  position: 'absolute',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '8px',
                                  left: '8px',
                                  fontSize: '8px',
                                  whiteSpace: 'nowrap',
                                  top: 0,
                                  margin: 0,
                                  color: 'transparent'
                                }}>
                                  Valor
                                </p>
                              </div>

                              {/* Descuento */}
                              <div style={{
                                position: 'absolute',
                                left: '418px',
                                top: 0,
                                width: '115px',
                                height: '56px'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  left: '50%',
                                  padding: '15px 8px',
                                  borderRadius: '5px',
                                  top: '12px',
                                  transform: 'translateX(-50%)',
                                  width: '115px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '14px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#697b92',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    margin: 0
                                  }}>
                                    {articulo.descuento}
                                  </p>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '12px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#07bc13',
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'right',
                                    margin: 0
                                  }}>
                                    {articulo.porcentaje}
                                  </p>
                                </div>
                                <p style={{
                                  position: 'absolute',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '8px',
                                  left: '8px',
                                  fontSize: '8px',
                                  whiteSpace: 'nowrap',
                                  top: 0,
                                  margin: 0,
                                  color: 'transparent'
                                }}>
                                  Descuento
                                </p>
                              </div>

                              {/* Botones Editar y Eliminar */}
                              <div style={{
                                position: 'absolute',
                                left: '551px',
                                top: '19px',
                                height: '18px',
                                width: '50px',
                                display: 'flex',
                                gap: '8px'
                              }}>
                                {/* Botón Editar */}
                                <div 
                                  style={{
                                    cursor: 'pointer',
                                    width: '18px',
                                    height: '18px'
                                  }}
                                  onClick={() => handleEditClick(articulo)}
                                >
                                  <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="0 0 19.5 19.5">
                                    <path d={svgPathsLineas.p25694bc0} stroke="#07BC13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                  </svg>
                                </div>
                                {/* Botón Eliminar */}
                                <div 
                                  style={{
                                    cursor: 'pointer',
                                    width: '18px',
                                    height: '18px'
                                  }}
                                  onClick={() => handleDeleteClick(articulo)}
                                >
                                  <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="34 0 17 19.5">
                                    <path d={svgPathsLineas.p316f0580} stroke="#F59F0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Vista Familias más simple
                        <div style={{ position: 'relative' }}>
                          {articulos.map((articulo, index) => (
                            <div key={articulo.id} style={{
                              height: '56px',
                              width: '100%',
                              position: 'relative',
                              marginBottom: index < articulos.length - 1 ? '12px' : '0'
                            }}>
                              {/* Artículo */}
                              <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '565px',
                                height: '56px'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  gap: '8px',
                                  alignItems: 'center',
                                  left: '50%',
                                  padding: '15px 8px',
                                  borderRadius: '5px',
                                  top: '12px',
                                  transform: 'translateX(-50%)',
                                  width: '565px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '14px',
                                    position: 'relative',
                                    flexShrink: 0,
                                    color: '#697b92',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    margin: 0
                                  }}>
                                    {articulo.nombre}
                                  </p>
                                </div>
                                <p style={{
                                  position: 'absolute',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '8px',
                                  left: '8px',
                                  fontSize: '8px',
                                  whiteSpace: 'nowrap',
                                  top: 0,
                                  margin: 0,
                                  color: 'transparent'
                                }}>
                                  Artículo
                                </p>
                              </div>

                              {/* Botón agregar */}
                              <div style={{
                                position: 'absolute',
                                left: '581px',
                                width: '20px',
                                height: '20px',
                                top: '24px'
                              }}>
                                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <path clipRule="evenodd" d={svgPathsLineas.p1e609d00} fill="url(#paint0_linear_28_1094)" fillRule="evenodd" />
                                  <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_28_1094" x1="0" x2="23.9419" y1="0" y2="12.3715">
                                      <stop stopColor="#092090" />
                                      <stop offset="1" stopColor="#0C2ABF" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lineas button */}
                <div
                  onClick={() => setActiveTab('lineas')}
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    gap: '10px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: '468px',
                    padding: '8px 10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    top: '367px',
                    backgroundColor: activeTab === 'lineas' ? '#0C2ABF' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    whiteSpace: 'pre',
                    color: activeTab === 'lineas' ? '#ffffff' : '#092090',
                    margin: 0
                  }}>
                    Lineas
                  </p>
                </div>

                {/* Familias button */}
                <button
                  onClick={() => setActiveTab('familias')}
                  style={{
                    position: 'absolute',
                    backgroundColor: activeTab === 'familias' ? '#0C2ABF' : '#ffffff',
                    display: 'flex',
                    gap: '10px',
                    height: '34px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: '553px',
                    overflow: 'visible',
                    padding: '8px 10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    top: '367px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <p style={{
                    backgroundImage: activeTab === 'familias' ? 'none' : 'linear-gradient(to right, #092090, #0C2ABF)',
                    WebkitBackgroundClip: activeTab === 'familias' ? 'initial' : 'text',
                    WebkitTextFillColor: activeTab === 'familias' ? '#ffffff' : 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    whiteSpace: 'pre',
                    margin: 0,
                    color: activeTab === 'familias' ? '#ffffff' : 'transparent'
                  }}>
                    Familias
                  </p>
                </button>
              </div>

              {/* Footer with totals */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '516px',
                height: '154px',
                width: '669px'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  pointerEvents: 'none',
                  top: 0
                }}>
                  <div style={{
                    backgroundColor: '#f3f7fd',
                    height: '154px',
                    pointerEvents: 'auto',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    position: 'sticky',
                    top: 0,
                    width: '669px',
                    border: '1px solid #e2e8f0'
                  }} />
                </div>

                {/* Subtotal */}
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  left: '34px',
                  padding: '12px 18px',
                  borderRadius: '50px',
                  top: '90px',
                  width: '601px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{
                    backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    whiteSpace: 'pre',
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
                    lineHeight: '16px',
                    position: 'relative',
                    flexShrink: 0,
                    fontSize: '16px',
                    whiteSpace: 'pre',
                    textAlign: 'right',
                    margin: 0
                  }}>
                    {totales.total} €
                  </p>
                </div>

                {/* Descuentos */}
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  left: '34px',
                  padding: '0 18px',
                  top: '34px',
                  width: '601px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '16px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '16px',
                      whiteSpace: 'pre',
                      margin: 0
                    }}>
                      Descuentos:
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '16px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '16px',
                      whiteSpace: 'pre',
                      textAlign: 'right',
                      margin: 0
                    }}>
                      <span>{totales.descuentos} € </span>
                      <span style={{ color: '#07bc13' }}>({totales.porcentajeDescuento}%)</span>
                    </p>
                  </div>
                </div>

                {/* IVA o RE */}
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  left: '34px',
                  padding: '0 18px',
                  top: '62px',
                  width: '601px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '16px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '16px',
                      whiteSpace: 'pre',
                      margin: 0
                    }}>
                      IVA o RE
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: '16px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '16px',
                      whiteSpace: 'pre',
                      textAlign: 'right',
                      margin: 0
                    }}>
                      {totales.iva} €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
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
            height: '600px'
          }}>
            {/* Fondo blanco del modal */}
            <div style={{
              position: 'absolute',
              backgroundColor: '#ffffff',
              left: 0,
              borderRadius: '20px',
              width: '600px',
              height: '600px',
              top: 0
            }} />

            {/* Título */}
            <p style={{
              position: 'absolute',
              backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '18px',
              left: '299.5px',
              fontSize: '20px',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              top: '80px',
              transform: 'translateX(-50%)',
              margin: 0
            }}>
              Edición de Artículo
            </p>

            {/* Formulario */}
            <div style={{
              position: 'absolute',
              left: '124px',
              top: '149px',
              height: '276px',
              width: '351px'
            }}>
              {/* Label Artículo */}
              <p style={{
                position: 'absolute',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '14px',
                left: 0,
                color: '#1a1a1a',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                top: 0,
                margin: 0
              }}>
                Artículo
              </p>

              {/* Campo Artículo */}
              <div style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                left: 'calc(50% - 38.5px)',
                padding: '15px',
                borderRadius: '5px',
                top: '20px',
                transform: 'translateX(-50%)',
                width: '274px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '14px',
                  position: 'relative',
                  flexShrink: 0,
                  color: '#697b92',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  margin: 0
                }}>
                  {editingArticulo?.nombre}
                </p>
                <div style={{ position: 'relative', flexShrink: 0, width: '16px', height: '16px' }}>
                  <div style={{ position: 'absolute', inset: '-4.688%' }}>
                    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <path d={svgPathsModal.p23be5b00} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Valor */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '82px',
                height: '64px',
                width: '170px'
              }}>
                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  left: 0,
                  color: '#1a1a1a',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  top: 0,
                  margin: 0
                }}>
                  Valor:
                </p>
                <div style={{
                  position: 'absolute',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  left: '50%',
                  padding: '15px',
                  borderRadius: '5px',
                  top: '20px',
                  transform: 'translateX(-50%)',
                  width: '170px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '14px',
                    position: 'relative',
                    flexShrink: 0,
                    color: '#697b92',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    margin: 0
                  }}>
                    {editingArticulo?.valor}
                  </p>
                </div>
              </div>

              {/* Descuento */}
              <div style={{
                position: 'absolute',
                left: '180px',
                top: '82px',
                height: '64px',
                width: '171px'
              }}>
                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  left: 0,
                  color: '#1a1a1a',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  top: 0,
                  margin: 0
                }}>
                  Descuento
                </p>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '20px',
                  height: '44px',
                  width: '171px'
                }}>
                  <div style={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    left: 'calc(50% - 24px)',
                    padding: '15px',
                    borderRadius: '5px',
                    top: 0,
                    transform: 'translateX(-50%)',
                    width: '123px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '14px',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}>
                      {descuentoTipo === 'porcentaje' ? '17%' : '27,00 $'}
                    </p>
                  </div>

                  <button 
                    onClick={toggleDescuentoTipo}
                    style={{
                      position: 'absolute',
                      display: 'block',
                      cursor: 'pointer',
                      left: '127px',
                      width: '44px',
                      height: '44px',
                      top: 0,
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: 0
                    }}>
                    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                      <g>
                        <rect fill="white" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
                        <rect height="43" rx="4.5" stroke={descuentoTipo === 'porcentaje' ? "url(#paint0_linear_modal_desc)" : "url(#paint0_linear_modal_pesos)"} width="43" x="0.5" y="0.5" />
                        <path 
                          d={descuentoTipo === 'porcentaje' ? svgPathsPorcentaje.pfc210a0 : svgPathsPesos.p28b56e40} 
                          stroke={descuentoTipo === 'porcentaje' ? "url(#paint1_linear_modal_desc)" : "url(#paint1_linear_modal_pesos)"} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="1.5" 
                        />
                      </g>
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_modal_desc" x1="0" x2="52.6721" y1="0" y2="27.2174">
                          <stop stopColor="#092090" />
                          <stop offset="1" stopColor="#0C2ABF" />
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_modal_desc" x1="13" x2="34.5477" y1="13" y2="24.1344">
                          <stop stopColor="#092090" />
                          <stop offset="1" stopColor="#0C2ABF" />
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_modal_pesos" x1="0" x2="52.6721" y1="0" y2="27.2174">
                          <stop stopColor="#092090" />
                          <stop offset="1" stopColor="#0C2ABF" />
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_modal_pesos" x1="17" x2="31.0125" y1="13" y2="17.0226">
                          <stop stopColor="#092090" />
                          <stop offset="1" stopColor="#0C2ABF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Nota */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '162px',
                height: '64px',
                width: '170px'
              }}>
                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  left: 0,
                  color: '#1a1a1a',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  top: 0,
                  margin: 0
                }}>
                  Nota:
                </p>
                <div style={{
                  position: 'absolute',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  gap: '8px',
                  height: '94px',
                  alignItems: 'flex-start',
                  left: 'calc(50% + 90.5px)',
                  padding: '15px',
                  borderRadius: '5px',
                  top: '20px',
                  transform: 'translateX(-50%)',
                  width: '351px',
                  border: '1px solid #e2e8f0'
                }}>
                  <textarea
                    value={notaTexto}
                    onChange={(e) => setNotaTexto(e.target.value)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '1.2',
                      position: 'relative',
                      flexShrink: 0,
                      color: '#697b92',
                      fontSize: '14px',
                      width: '321px',
                      height: '64px',
                      margin: 0,
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </div>

              {/* Cantidad */}
              <div style={{
                position: 'absolute',
                backgroundColor: '#ffffff',
                display: 'flex',
                gap: '8px',
                height: '46px',
                alignItems: 'center',
                justifyContent: 'center',
                left: 'calc(50% + 142px)',
                padding: '15px',
                borderRadius: '5px',
                top: '20px',
                transform: 'translateX(-50%)',
                width: '67px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '14px',
                  position: 'relative',
                  flexShrink: 0,
                  color: '#697b92',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  margin: 0
                }}>
                  {editingArticulo?.cantidad}
                </p>
              </div>
            </div>

            {/* Botones Cancelar y Finalizar */}
            <div style={{
              position: 'absolute',
              left: '175px',
              top: '476px',
              height: '44px',
              width: '250px'
            }}>
              {/* Botón Finalizar */}
              <div 
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: '114px',
                  padding: '15px',
                  borderRadius: '30px',
                  top: 0,
                  width: '136px',
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  cursor: 'pointer'
                }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  position: 'relative',
                  flexShrink: 0,
                  fontSize: '14px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  color: '#ffffff',
                  margin: 0
                }}>
                  Finalizar
                </p>
              </div>

              {/* Botón Cancelar */}
              <div 
                onClick={handleCloseModal}
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
                  border: '1px solid #092090',
                  cursor: 'pointer'
                }}>
                <p style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  lineHeight: '14px',
                  position: 'relative',
                  flexShrink: 0,
                  fontSize: '14px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  margin: 0
                }}>
                  Cancelar
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Historial de Ventas */}
      {showHistorialModal && (
        <HistorialVentasModal onClose={() => setShowHistorialModal(false)} />
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && articuloToDelete && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '480px',
            width: '90%',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            {/* Botón cerrar */}
            <button
              onClick={cancelDelete}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="#697B92" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Icono de advertencia */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 10V17M16 22H16.01M7 28H25C27.21 28 29 26.21 29 24V8C29 5.79 27.21 4 25 4H7C4.79 4 3 5.79 3 8V24C3 26.21 4.79 28 7 28Z" stroke="#F59F0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Título */}
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 600,
              color: '#1a1a1a',
              textAlign: 'center',
              margin: '0 0 12px 0',
              lineHeight: '32px'
            }}>
              ¿Eliminar artículo?
            </h2>

            {/* Descripción */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#697b92',
              textAlign: 'center',
              margin: '0 0 32px 0',
              lineHeight: '24px'
            }}>
              ¿Estás seguro de que deseas eliminar "<strong>{articuloToDelete.nombre}</strong>" de la nota de venta? Esta acción no se puede deshacer.
            </p>

            {/* Botones */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={cancelDelete}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: '1px solid #092090',
                  backgroundColor: '#ffffff',
                  color: '#092090',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'linear-gradient(to right, #F59F0A, #F97316)',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '120px'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}