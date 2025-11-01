import { useState } from 'react';
import Navigation from "./Navigation";
import svgPaths from "../imports/svg-c5p8kwdoqq";
import svgPathsLineas from "../imports/svg-vr2wkzt2hw";
import svgPathsPorcentaje from "../imports/svg-rcci5w90mw";
import svgPathsPesos from "../imports/svg-q6030ad8oe";
import HistorialVentasModal from "./HistorialVentasModal";
import SeleccionarClienteModal from "./SeleccionarClienteModal";
import SeleccionarArticuloModal from "./SeleccionarArticuloModal";
import { Articulo, Cliente } from '../App';

interface ArticuloVenta {
  id: string;
  articuloId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  tipoDescuento: 'porcentaje' | 'pesos';
  nota?: string;
}

interface NuevaVentaScreenProps {
  onNavigate: (screen: string) => void;
  onSaveVenta?: (ventaData: any) => void;
  articulos: Articulo[];
  clientes: Cliente[];
  clienteSeleccionado?: Cliente | null;
  onSelectCliente: (cliente: Cliente) => void;
  onUpdateArticulo: (id: string, cantidad: number) => void;
}

export default function NuevaVentaScreen({ 
  onNavigate, 
  onSaveVenta, 
  articulos: articulosCatalogo,
  clientes,
  clienteSeleccionado,
  onSelectCliente,
  onUpdateArticulo
}: NuevaVentaScreenProps) {
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [showPagoDropdown, setShowPagoDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('lineas');
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showArticuloModal, setShowArticuloModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articuloToDelete, setArticuloToDelete] = useState<ArticuloVenta | null>(null);
  
  // Estados del formulario
  const [tieneDescuento, setTieneDescuento] = useState(false);
  const [descuentoAplicarTipo, setDescuentoAplicarTipo] = useState<'porcentaje' | 'pesos'>('porcentaje');
  const [aplicarDescuentoTipo, setAplicarDescuentoTipo] = useState<'porcentaje' | 'pesos'>('porcentaje');
  const [descuentoDocumentoValor, setDescuentoDocumentoValor] = useState('');
  const [descuentoArticuloValor, setDescuentoArticuloValor] = useState('');
  
  const [articuloBuscado, setArticuloBuscado] = useState('');
  const [articuloCantidad, setArticuloCantidad] = useState('1');
  const [articuloPrecio, setArticuloPrecio] = useState('');
  const [articuloNota, setArticuloNota] = useState('');
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);
  
  const [tipoNotaSeleccionado, setTipoNotaSeleccionado] = useState('Serie P (Oficiales)');
  const [formaPagoSeleccionado, setFormaPagoSeleccionado] = useState('Efectivo');
  
  // Lista de artículos en la venta
  const [articulosVenta, setArticulosVenta] = useState<ArticuloVenta[]>([]);

  const tiposNota = ['Serie P (Oficiales)', 'Serie X (No oficiales)', 'Pedido', 'Presupuesto', 'Adicional', 'Incidencia'];
  const formasPago = ['Efectivo', 'Tarjeta de Débito', 'Tarjeta de Crédito', 'Bizum', 'Transferencia Bancaria'];

  // Cuando se selecciona un artículo del modal
  const handleSelectArticulo = (articulo: Articulo) => {
    setArticuloSeleccionado(articulo);
    setArticuloBuscado(articulo.nombre);
    setArticuloPrecio(articulo.precio?.replace(' €', '') || '');
    setShowArticuloModal(false);
  };

  // Agregar artículo a la venta
  const handleAddArticulo = () => {
    if (!articuloSeleccionado) {
      alert('Por favor selecciona un artículo del catálogo');
      return;
    }

    if (!articuloPrecio || parseFloat(articuloPrecio) <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }

    const cantidad = parseInt(articuloCantidad) || 1;
    
    // Validar stock disponible
    if (cantidad > articuloSeleccionado.cantidad) {
      alert(`Stock insuficiente. Disponible: ${articuloSeleccionado.cantidad}`);
      return;
    }

    const descuento = tieneDescuento && descuentoArticuloValor 
      ? parseFloat(descuentoArticuloValor.replace(',', '.')) || 0 
      : 0;

    const nuevoArticulo: ArticuloVenta = {
      id: Date.now().toString(),
      articuloId: articuloSeleccionado.id,
      nombre: articuloSeleccionado.nombre,
      cantidad: cantidad,
      precioUnitario: parseFloat(articuloPrecio.replace(',', '.')),
      descuento: descuento,
      tipoDescuento: aplicarDescuentoTipo,
      nota: articuloNota
    };

    setArticulosVenta([...articulosVenta, nuevoArticulo]);
    
    // Limpiar formulario
    setArticuloBuscado('');
    setArticuloSeleccionado(null);
    setArticuloCantidad('1');
    setArticuloPrecio('');
    setArticuloNota('');
    setDescuentoArticuloValor('');
  };

  const handleDeleteClick = (articulo: ArticuloVenta) => {
    setArticuloToDelete(articulo);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (articuloToDelete) {
      setArticulosVenta(articulosVenta.filter(art => art.id !== articuloToDelete.id));
    }
    setShowDeleteModal(false);
    setArticuloToDelete(null);
  };

  const toggleDescuentoAplicar = () => {
    setDescuentoAplicarTipo(prev => prev === 'porcentaje' ? 'pesos' : 'porcentaje');
  };

  const toggleAplicarDescuento = () => {
    setAplicarDescuentoTipo(prev => prev === 'porcentaje' ? 'pesos' : 'porcentaje');
  };

  // Calcular totales
  const calcularTotales = () => {
    let subtotal = 0;
    let totalDescuentos = 0;
    
    articulosVenta.forEach(articulo => {
      const subtotalArticulo = articulo.precioUnitario * articulo.cantidad;
      subtotal += subtotalArticulo;
      
      if (articulo.descuento > 0) {
        if (articulo.tipoDescuento === 'porcentaje') {
          totalDescuentos += (subtotalArticulo * articulo.descuento) / 100;
        } else {
          totalDescuentos += articulo.descuento * articulo.cantidad;
        }
      }
    });
    
    // Aplicar descuento del documento
    if (tieneDescuento && descuentoDocumentoValor) {
      const descuentoDoc = parseFloat(descuentoDocumentoValor.replace(',', '.')) || 0;
      if (descuentoAplicarTipo === 'porcentaje') {
        totalDescuentos += (subtotal * descuentoDoc) / 100;
      } else {
        totalDescuentos += descuentoDoc;
      }
    }
    
    const baseImponible = subtotal - totalDescuentos;
    const iva = baseImponible * 0.21; // IVA 21%
    const total = baseImponible + iva;
    
    return {
      subtotal: subtotal.toFixed(2),
      descuentos: totalDescuentos.toFixed(2),
      porcentajeDescuento: subtotal > 0 ? ((totalDescuentos / subtotal) * 100).toFixed(0) : '0',
      baseImponible: baseImponible.toFixed(2),
      iva: iva.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const totales = calcularTotales();

  // Guardar o crear nota
  const handleResumenNota = (esBorrador = false) => {
    if (articulosVenta.length === 0) {
      alert('No hay artículos en la nota de venta. Por favor, añade al menos un artículo.');
      return;
    }
    
    if (!clienteSeleccionado) {
      alert('Por favor, selecciona un cliente antes de continuar.');
      return;
    }

    // Actualizar stock de artículos
    if (!esBorrador) {
      articulosVenta.forEach(artVenta => {
        const articuloCatalogo = articulosCatalogo.find(a => a.id === artVenta.articuloId);
        if (articuloCatalogo) {
          const nuevoStock = articuloCatalogo.cantidad - artVenta.cantidad;
          onUpdateArticulo(artVenta.articuloId, nuevoStock);
        }
      });
    }

    // Registrar cambio pendiente para sync
    const current = localStorage.getItem('pendingChanges');
    const newCount = (parseInt(current || '0', 10) + 1);
    localStorage.setItem('pendingChanges', String(newCount));
    
    // Preparar datos de la venta
    const ventaData = {
      cliente: clienteSeleccionado,
      tipoNota: tipoNotaSeleccionado,
      formaPago: formaPagoSeleccionado,
      articulos: articulosVenta,
      totales: totales,
      total: `${totales.total} €`,
      fecha: new Date().toISOString(),
      estado: esBorrador ? 'borrador' : 'pendiente',
      items: articulosVenta
    };
    
    if (onSaveVenta) {
      onSaveVenta(ventaData);
    }
    
    onNavigate('verNota');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="ventas" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            color: '#1a1a1a',
            margin: 0,
            background: 'linear-gradient(to right, #092090, #0C2ABF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Nueva Venta
          </h1>
        </div>

        <div style={{
          display: 'flex',
          gap: '28px',
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
              width: '351px',
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowHistorialModal(true)}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '4px 0',
                  borderRadius: '30px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '167px'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p3f6e59c8} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#697b92',
                  whiteSpace: 'nowrap'
                }}>
                  Historial de Ventas
                </span>
              </button>

              <button
                onClick={() => handleResumenNota(false)}
                style={{
                  backgroundImage: 'linear-gradient(to right, #8bd600, #c4ff57)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 5px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '155px'
                }}
              >
                <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
                  <path d={svgPaths.p30b56380} stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  Resumen Nota
                </span>
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
                height: tieneDescuento ? '74px' : '24px',
                overflow: 'clip',
                position: 'relative',
                flexShrink: 0,
                width: '100%',
                transition: 'height 0.3s'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1a1a1a',
                  position: 'absolute',
                  left: 0,
                  top: '5px',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  ¿Aplicar descuento en documento?
                </p>

                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  right: 0,
                  top: 0,
                  width: '88px'
                }}>
                  <button 
                    onClick={() => setTieneDescuento(true)}
                    style={{
                      backgroundColor: tieneDescuento ? '#0C2ABF' : '#ffffff',
                      cursor: 'pointer',
                      borderRadius: '30px',
                      width: '40px',
                      height: '30px',
                      border: tieneDescuento ? 'none' : '1px solid #092090',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: tieneDescuento ? '#ffffff' : '#092090'
                    }}>
                      Si
                    </span>
                  </button>

                  <button 
                    onClick={() => setTieneDescuento(false)}
                    style={{
                      backgroundColor: !tieneDescuento ? '#0C2ABF' : '#ffffff',
                      border: !tieneDescuento ? 'none' : '1px solid #092090',
                      cursor: 'pointer',
                      borderRadius: '30px',
                      width: '40px',
                      height: '30px',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: !tieneDescuento ? '#ffffff' : '#092090'
                    }}>
                      No
                    </span>
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
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      padding: '15px',
                      borderRadius: '5px',
                      position: 'absolute',
                      left: 'calc(50% - 26px)',
                      transform: 'translateX(-50%)',
                      width: '299px',
                      boxSizing: 'border-box',
                      border: '1px solid #e2e8f0',
                      top: 0
                    }}>
                      <input
                        type="text"
                        value={descuentoDocumentoValor}
                        onChange={(e) => setDescuentoDocumentoValor(e.target.value)}
                        placeholder={descuentoAplicarTipo === 'porcentaje' ? '17%' : '27,00'}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#697b92',
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          width: '100%'
                        }}
                      />
                    </div>

                    <button 
                      onClick={toggleDescuentoAplicar}
                      style={{
                        position: 'absolute',
                        left: 'calc(50% + 153.5px)',
                        transform: 'translateX(-50%)',
                        top: 0,
                        width: '44px',
                        height: '44px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'block'
                      }}>
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="0 0 44 44">
                        <rect fill="white" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
                        <rect height="43" rx="4.5" stroke="url(#paint0_linear_39_2877)" width="43" x="0.5" y="0.5" />
                        <path 
                          d={svgPathsPorcentaje.pfc210a0} 
                          stroke="url(#paint1_linear_39_2877)" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="1.5" 
                        />
                        <defs>
                          <linearGradient id="paint0_linear_39_2877" x1="0" x2="52.6721" y1="0" y2="27.2174" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#092090" />
                            <stop offset="1" stopColor="#0C2ABF" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_39_2877" x1="13" x2="34.5477" y1="13" y2="24.1344" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#092090" />
                            <stop offset="1" stopColor="#0C2ABF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Artículo form section */}
              <div style={{
                height: '300px',
                position: 'relative',
                flexShrink: 0,
                width: '100%'
              }}>
                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1a1a1a',
                  left: 0,
                  top: 0,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  Artículo
                </p>

                <p style={{
                  position: 'absolute',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1a1a1a',
                  left: '284px',
                  top: 0,
                  margin: 0,
                  whiteSpace: 'nowrap'
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
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1a1a1a',
                      margin: 0,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      whiteSpace: 'nowrap'
                    }}>
                      Descuento
                    </p>

                    <div style={{
                      position: 'absolute',
                      height: '44px',
                      left: 0,
                      top: '20px',
                      width: '171px'
                    }}>
                      <div style={{
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        padding: '15px',
                        borderRadius: '5px',
                        position: 'absolute',
                        left: 'calc(50% - 24px)',
                        transform: 'translateX(-50%)',
                        width: '123px',
                        boxSizing: 'border-box',
                        border: '1px solid #e2e8f0',
                        top: 0
                      }}>
                        <input
                          type="text"
                          value={descuentoArticuloValor}
                          onChange={(e) => setDescuentoArticuloValor(e.target.value)}
                          placeholder={aplicarDescuentoTipo === 'porcentaje' ? '17%' : '27,00'}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#697b92',
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            width: '100%'
                          }}
                        />
                      </div>

                      <button 
                        onClick={toggleAplicarDescuento}
                        style={{
                          position: 'absolute',
                          left: '127px',
                          top: 0,
                          width: '44px',
                          height: '44px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'block'
                        }}>
                        <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="0 0 44 44">
                          <rect fill="white" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
                          <rect height="43" rx="4.5" stroke="url(#paint0_linear_39_2874)" width="43" x="0.5" y="0.5" />
                          <path 
                            d={svgPathsPorcentaje.pfc210a0} 
                            stroke="url(#paint1_linear_39_2874)" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                          />
                          <defs>
                            <linearGradient id="paint0_linear_39_2874" x1="0" x2="52.6721" y1="0" y2="27.2174" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_39_2874" x1="13" x2="34.5477" y1="13" y2="24.1344" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#092090" />
                              <stop offset="1" stopColor="#0C2ABF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Artículo field - con botón para abrir modal */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(50% - 38.5px)',
                  transform: 'translateX(-50%)',
                  top: '20px',
                  width: '274px'
                }}>
                  <div
                    onClick={() => setShowArticuloModal(true)}
                    style={{
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px',
                      borderRadius: '5px',
                      width: '274px',
                      boxSizing: 'border-box',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer'
                    }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: articuloBuscado ? '#1a1a1a' : '#697b92',
                      fontWeight: articuloBuscado ? 400 : 400,
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {articuloBuscado || 'Artículo'}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                      <path d={svgPaths.p23be5b00} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </div>
                  {articuloSeleccionado && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      color: articuloSeleccionado.cantidad <= (articuloSeleccionado.stockMinimo || 0) ? '#F59F0A' : '#697b92',
                      margin: 0,
                      position: 'absolute',
                      left: '66px',
                      top: 0,
                      whiteSpace: 'nowrap'
                    }}>
                      Stock: {articuloSeleccionado.cantidad}
                    </p>
                  )}
                </div>

                {/* Precio */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '82px',
                  width: '170px'
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1a1a1a',
                    margin: 0,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    Precio
                  </p>

                  <div style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    padding: '15px',
                    borderRadius: '5px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '20px',
                    width: '170px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0'
                  }}>
                    <input
                      type="text"
                      value={articuloPrecio}
                      onChange={(e) => setArticuloPrecio(e.target.value)}
                      placeholder="27,90 €"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#697b92',
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
                  width: '351px'
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1a1a1a',
                    margin: 0,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    Nota:
                  </p>

                  <div style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                    padding: '15px',
                    borderRadius: '5px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '20px',
                    width: '351px',
                    height: '66px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0'
                  }}>
                    <textarea
                      value={articuloNota}
                      onChange={(e) => setArticuloNota(e.target.value)}
                      placeholder="Lorem ipsum dolor sit amet, consectet."
                      maxLength={40}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#697b92',
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        resize: 'none',
                        lineHeight: '1.2',
                        height: '100%'
                      }}
                    />
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '8px',
                    color: '#697b92',
                    position: 'absolute',
                    left: '323px',
                    top: '252px',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    40/40
                  </p>
                </div>

                {/* Cantidad */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(50% + 142px)',
                  transform: 'translateX(-50%)',
                  top: '20px',
                  width: '67px',
                  height: '46px'
                }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    borderRadius: '5px',
                    width: '67px',
                    height: '46px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0'
                  }}>
                    <input
                      type="text"
                      value={articuloCantidad}
                      onChange={(e) => setArticuloCantidad(e.target.value)}
                      placeholder="01"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#697b92',
                        textAlign: 'center',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Añadir Artículo button */}
                <div style={{
                  position: 'absolute',
                  height: '36px',
                  left: 0,
                  top: '294px',
                  width: '161px'
                }}>
                  <button
                    onClick={handleAddArticulo}
                    disabled={!articuloSeleccionado || !articuloPrecio}
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 15px',
                      borderRadius: '30px',
                      left: 0,
                      top: '-30px',
                      width: '161px',
                      backgroundColor: (!articuloSeleccionado || !articuloPrecio) ? '#d4d4d4' : '#0C2ABF',
                      border: 'none',
                      cursor: (!articuloSeleccionado || !articuloPrecio) ? 'not-allowed' : 'pointer',
                      opacity: (!articuloSeleccionado || !articuloPrecio) ? 0.6 : 1
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path clipRule="evenodd" d={svgPaths.p3b239480} fill="white" fillRule="evenodd" />
                    </svg>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#ffffff'
                    }}>
                      Añadir Artículo
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cliente, Tipo de Nota, Forma de Pago */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '351px',
              height: '120px'
            }}>
              {/* Cliente */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#1a1a1a',
                margin: 0,
                position: 'absolute',
                left: 0,
                top: 0,
                whiteSpace: 'nowrap'
              }}>
                Cliente
              </p>
              
              <div
                onClick={() => setShowClienteModal(true)}
                style={{
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  borderRadius: '5px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '20px',
                  width: '351px',
                  boxSizing: 'border-box',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: clienteSeleccionado ? '#1a1a1a' : '#697b92',
                  fontWeight: 400,
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {clienteSeleccionado ? `${clienteSeleccionado.id} | ${clienteSeleccionado.empresa}` : '105 | Boutique Encanto'}
                </span>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ flexShrink: 0 }}>
                  <path clipRule="evenodd" d={svgPaths.p21c6b980} fill="#697B92" fillRule="evenodd" />
                </svg>
              </div>

              {/* Tipo de Nota y Forma de Pago */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '76px',
                width: '172px',
                height: '44px',
                overflow: 'visible'
              }}>
                <div
                  onClick={() => setShowTipoDropdown(!showTipoDropdown)}
                  style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderRadius: '5px',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '172px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#697b92',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1
                  }}>
                    {tipoNotaSeleccionado}
                  </span>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ flexShrink: 0, marginLeft: '8px' }}>
                    <path clipRule="evenodd" d={svgPaths.p22e63200} fill="#697B92" fillRule="evenodd" />
                  </svg>
                </div>

                {showTipoDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '49px',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}>
                    {tiposNota.map((tipo, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTipoNotaSeleccionado(tipo);
                          setShowTipoDropdown(false);
                        }}
                        style={{
                          backgroundColor: '#ffffff',
                          padding: '12px 15px',
                          borderBottom: index < tiposNota.length - 1 ? '1px solid #e2e8f0' : 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                      >
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#697b92'
                        }}>
                          {tipo}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                position: 'absolute',
                left: '179px',
                top: '76px',
                width: '172px',
                height: '44px',
                overflow: 'visible'
              }}>
                <div
                  onClick={() => setShowPagoDropdown(!showPagoDropdown)}
                  style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderRadius: '5px',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '172px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#697b92',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1
                  }}>
                    {formaPagoSeleccionado}
                  </span>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{ flexShrink: 0, marginLeft: '8px' }}>
                    <path clipRule="evenodd" d={svgPaths.p21c6b980} fill="#697B92" fillRule="evenodd" />
                  </svg>
                </div>

                {showPagoDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '48px',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}>
                    {formasPago.map((forma, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormaPagoSeleccionado(forma);
                          setShowPagoDropdown(false);
                        }}
                        style={{
                          backgroundColor: '#ffffff',
                          padding: '12px 15px',
                          borderBottom: index < formasPago.length - 1 ? '1px solid #e2e8f0' : 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                      >
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#697b92'
                        }}>
                          {forma}
                        </span>
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
            position: 'relative',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}>
            {/* Header */}
            <div style={{
              height: '90px',
              width: '669px',
              position: 'sticky',
              top: 0,
              pointerEvents: 'auto'
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
                <div style={{ flexShrink: 0, transform: 'scaleY(-100%)' }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    height: '90px',
                    position: 'relative',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    width: '669px'
                  }}>
                    <div style={{
                      position: 'absolute',
                      border: '1px solid #e2e8f0',
                      inset: 0,
                      pointerEvents: 'none',
                      borderBottomLeftRadius: '20px',
                      borderBottomRightRadius: '20px'
                    }} />
                  </div>
                </div>
              </div>
              <p style={{
                position: 'absolute',
                backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '20px',
                left: '334.5px',
                transform: 'translateX(-50%)',
                top: '36px',
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}>
                Nota de Venta
              </p>
            </div>

            {/* Content area - productos */}
            <div style={{
              padding: '20px 34px',
              height: '426px',
              overflowY: 'auto'
            }}>
              {articulosVenta.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: '20px', opacity: 0.3 }}>
                    <path d="M32 4L40 20H56L44 32L48 48L32 40L16 48L20 32L8 20H24L32 4Z" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#1a1a1a',
                    margin: '0 0 8px 0'
                  }}>
                    No hay artículos añadidos
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#697b92',
                    margin: 0
                  }}>
                    Añade artículos para crear la nota de venta
                  </p>
                </div>
              ) : (
                articulosVenta.map((articulo) => (
                  <div key={articulo.id} style={{
                    marginBottom: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '16px',
                          color: '#1a1a1a',
                          margin: '0 0 8px 0'
                        }}>
                          {articulo.nombre}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#697b92'
                          }}>
                            Cant: <strong>{articulo.cantidad}</strong>
                          </span>
                          <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#697b92'
                          }}>
                            Precio: <strong>{articulo.precioUnitario.toFixed(2)} €</strong>
                          </span>
                          {articulo.descuento > 0 && (
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#07BC13',
                              fontWeight: 600
                            }}>
                              Desc: -{articulo.descuento}{articulo.tipoDescuento === 'porcentaje' ? '%' : '€'}
                            </span>
                          )}
                        </div>
                        {articulo.nota && (
                          <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            color: '#697b92',
                            margin: '8px 0 0 0',
                            fontStyle: 'italic'
                          }}>
                            Nota: {articulo.nota}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '18px',
                          color: '#0C2ABF',
                          margin: 0
                        }}>
                          {(() => {
                            const subtotal = articulo.precioUnitario * articulo.cantidad;
                            let descuentoAplicado = 0;
                            if (articulo.descuento > 0) {
                              descuentoAplicado = articulo.tipoDescuento === 'porcentaje'
                                ? (subtotal * articulo.descuento) / 100
                                : articulo.descuento * articulo.cantidad;
                            }
                            return (subtotal - descuentoAplicado).toFixed(2);
                          })()} €
                        </p>
                        <button
                          onClick={() => handleDeleteClick(articulo)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <svg width="18" height="18" viewBox="34 0 17 19.5" fill="none">
                            <path d={svgPathsLineas.p316f0580} stroke="#F59F0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with totals */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#f3f7fd',
              borderTop: '1px solid #e2e8f0',
              padding: '24px 34px',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px'
            }}>
              {/* Descuentos */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#697b92',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  Descuentos:
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#697b92',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  textAlign: 'right'
                }}>
                  <span>{totales.descuentos} € </span>
                  <span style={{ color: '#07bc13' }}>({totales.porcentajeDescuento}%)</span>
                </p>
              </div>

              {/* IVA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 18px',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#697b92'
                }}>
                  IVA (21%):
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#697b92'
                }}>
                  {totales.iva} €
                </span>
              </div>

              {/* Subtotal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: '50px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                position: 'absolute',
                left: '34px',
                top: '90px',
                width: '601px',
                boxSizing: 'border-box'
              }}>
                <span style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  whiteSpace: 'nowrap'
                }}>
                  Subtotal:
                </span>
                <span style={{
                  backgroundImage: 'linear-gradient(to right, #092090, #0C2ABF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  textAlign: 'right'
                }}>
                  {totales.total} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showHistorialModal && (
        <HistorialVentasModal 
          onClose={() => setShowHistorialModal(false)}
          onNavigate={onNavigate}
        />
      )}
      
      {showClienteModal && (
        <SeleccionarClienteModal
          clientes={clientes}
          onSelect={(cliente) => {
            onSelectCliente(cliente);
            setShowClienteModal(false);
          }}
          onClose={() => setShowClienteModal(false)}
        />
      )}

      {showArticuloModal && (
        <SeleccionarArticuloModal
          articulos={articulosCatalogo}
          onSelect={handleSelectArticulo}
          onClose={() => setShowArticuloModal(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div 
          onClick={() => setShowDeleteModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              width: '400px',
              textAlign: 'center'
            }}
          >
            <h3 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              color: '#1a1a1a',
              margin: '0 0 16px 0'
            }}>
              ¿Eliminar artículo?
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#697b92',
              margin: '0 0 24px 0'
            }}>
              Esta acción no se puede deshacer
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#697b92'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#F59F0A',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#ffffff'
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
