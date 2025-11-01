import { useState } from 'react';
import Navigation from "./Navigation";
import svgPaths from "../imports/svg-cc9dhroeo1";
import imgRectangle26 from "figma:asset/d0c756551c7af151492348bd0486c6731ea8b378.png";
import { Gasto } from '../App';

interface GastosScreenProps {
  onNavigate: (screen: string) => void;
  gastos: Gasto[];
  onAddGasto: (gasto: Gasto) => void;
  onDeleteGasto: (id: string) => void;
}

export default function GastosScreen({ onNavigate, gastos: gastosIniciales, onAddGasto, onDeleteGasto }: GastosScreenProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [nombreGasto, setNombreGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todas');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const tiposGasto = ['Comida', 'Combustible', 'Alojamiento', 'Transporte', 'Material', 'Otros'];
  const categoriasFiltro = ['Todas', 'Comida', 'Combustible', 'Alojamiento', 'Transporte', 'Material', 'Otros'];

  const handleAddGasto = () => {
    if (!nombreGasto || !selectedType || !valorGasto) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const nuevoGasto: Gasto = {
      id: `G${String(gastosIniciales.length + 1).padStart(3, '0')}`,
      nombre: nombreGasto,
      categoria: selectedType,
      precio: valorGasto.includes('€') ? valorGasto : `${valorGasto} €`,
      fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      imagen: imgRectangle26
    };

    onAddGasto(nuevoGasto);
    
    // Registrar cambio pendiente para sincronización
    const current = localStorage.getItem('pendingChanges');
    const newCount = (parseInt(current || '0', 10) + 1);
    localStorage.setItem('pendingChanges', String(newCount));
    
    // Limpiar formulario
    setNombreGasto('');
    setSelectedType('');
    setValorGasto('');
    
    // Mostrar mensaje de éxito
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDeleteGasto = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
      onDeleteGasto(id);
    }
  };

  const filteredGastos = gastosIniciales.filter(gasto => {
    const matchesSearch = gasto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gasto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === 'Todas' || gasto.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  const totalGastos = filteredGastos.reduce((sum, gasto) => {
    const valor = parseFloat(gasto.precio.replace(',', '.').replace('€', '').trim());
    return sum + valor;
  }, 0);

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="gastos" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
        
        {/* Header con botón volver */}
        <div style={{ 
          padding: '40px 60px 20px 60px', 
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#697b92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: 0 }}>
              Gestión de Gastos
            </h1>
          </div>
          <button
            onClick={() => onNavigate('resumenDia')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white'
            }}
          >
            Ver Resumen del Día
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1, gap: '0' }}>
          {/* Left side - Form */}
          <div style={{ padding: '40px 60px', width: '480px', borderRight: '1px solid #e2e8f0' }}>
            <h2 style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 600, 
              fontSize: '20px', 
              color: '#1a1a1a', 
              marginBottom: '24px' 
            }}>
              Registrar Nuevo Gasto
            </h2>

            {/* Success message */}
            {showSuccessMessage && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#91e600',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="white"/>
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'white', fontWeight: 600 }}>
                  ¡Gasto registrado correctamente!
                </span>
              </div>
            )}

            {/* Nombre del Gasto */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '5px',
              padding: '18px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '56px'
            }}>
              <input
                type="text"
                placeholder="Nombre del Gasto"
                value={nombreGasto}
                onChange={(e) => setNombreGasto(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
              />
            </div>

            {/* Tipo and Valor */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {/* Tipo de Gasto */}
              <div style={{ position: 'relative', flex: 1 }}>
                <div 
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '5px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    minHeight: '56px'
                  }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: selectedType ? '#1a1a1a' : '#697b92' }}>
                    {selectedType || 'Tipo de Gasto'}
                  </span>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M0.35092 0.355454C0.575682 0.137177 0.880483 0.0145561 1.1983 0.0145561C1.51611 0.0145561 1.82091 0.137177 2.04567 0.355454L5.99251 4.18957L9.93934 0.355454C10.0499 0.24425 10.1822 0.155549 10.3284 0.0945278C10.4746 0.0335067 10.6319 0.00138738 10.791 4.39614e-05C10.9502 -0.00129945 11.108 0.0281597 11.2553 0.0867029C11.4026 0.145246 11.5364 0.231701 11.649 0.341022C11.7615 0.450344 11.8505 0.580343 11.9107 0.723434C11.971 0.866525 12.0013 1.01984 12 1.17444C11.9986 1.32904 11.9655 1.48182 11.9027 1.62387C11.8399 1.76593 11.7486 1.8944 11.6341 2.00181L6.83988 6.6591C6.61512 6.87738 6.31032 7 5.99251 7C5.67469 7 5.36989 6.87738 5.14513 6.6591L0.35092 2.00181C0.126226 1.78346 0 1.48737 0 1.17863C0 0.869894 0.126226 0.573797 0.35092 0.355454Z" fill="#697B92" />
                  </svg>
                </div>
                
                {showTypeDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    zIndex: 10,
                    marginTop: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    {tiposGasto.map((tipo, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedType(tipo);
                          setShowTypeDropdown(false);
                        }}
                        style={{
                          padding: '14px 18px',
                          borderBottom: index < tiposGasto.length - 1 ? '1px solid #e2e8f0' : 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#1a1a1a',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        {tipo}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Valor */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '5px',
                padding: '18px',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                minHeight: '56px'
              }}>
                <input
                  type="text"
                  placeholder="Valor Ej: 12,69 €"
                  value={valorGasto}
                  onChange={(e) => setValorGasto(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#1a1a1a',
                    backgroundColor: 'transparent',
                    width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Upload button */}
            <label style={{
              backgroundColor: 'transparent',
              border: '1px dashed #e2e8f0',
              borderRadius: '8px',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginBottom: '24px',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <input 
                type="file" 
                accept="image/*,capture=camera"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    alert(`Imagen "${file.name}" seleccionada correctamente (${(file.size / 1024).toFixed(2)} KB)`);
                  }
                }}
                style={{ display: 'none' }}
              />
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M0.75 11.25V12.125C0.75 12.8212 1.02656 13.4889 1.51884 13.9812C2.01113 14.4734 2.67881 14.75 3.375 14.75H12.125C12.8212 14.75 13.4889 14.4734 13.9812 13.9812C14.4734 13.4889 14.75 12.8212 14.75 12.125V11.25M11.25 4.25L7.75 0.75M7.75 0.75L4.25 4.25M7.75 0.75V11.25" stroke="#697B92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
                Haz una foto o sube una imagen
              </span>
            </label>

            {/* Add button */}
            <button 
              onClick={handleAddGasto}
              style={{
                width: '100%',
                padding: '15px 24px',
                backgroundColor: '#0C2ABF',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z" fill="white"/>
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff' }}>
                Añadir Nuevo Gasto
              </span>
            </button>
          </div>

          {/* Right side - List */}
          <div style={{ 
            flex: 1, 
            padding: '40px 60px',
            overflowY: 'auto'
          }}>
            {/* Search and filters */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '30px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 18px',
                gap: '14px',
                flex: 1,
                minWidth: '300px'
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar gasto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#1a1a1a',
                    backgroundColor: 'transparent',
                    flex: 1
                  }}
                />
              </div>
              
              {/* Filtro por categoría */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categoriasFiltro.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoria(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '30px',
                      border: selectedCategoria === cat ? 'none' : '1px solid #e2e8f0',
                      background: selectedCategoria === cat ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: selectedCategoria === cat ? 'white' : '#697b92'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ 
              padding: '16px 20px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                  Total Gastos {selectedCategoria !== 'Todas' ? `(${selectedCategoria})` : ''}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#f59e0b', margin: '4px 0 0 0' }}>
                  {totalGastos.toFixed(2).replace('.', ',')} €
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Registros</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {filteredGastos.length}
                </p>
              </div>
            </div>

            {/* Gastos list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredGastos.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
                    No hay gastos registrados
                  </p>
                </div>
              ) : (
                filteredGastos.map((gasto, index) => (
                  <div key={gasto.id} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    gap: '16px',
                    position: 'relative',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  >
                    <div style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#f1f5f9'
                    }}>
                      {gasto.imagen && (
                        <img 
                          src={gasto.imagen} 
                          alt="Gasto" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#1a1a1a',
                        margin: '0 0 6px 0'
                      }}>
                        {gasto.nombre}
                      </p>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: '#697b92',
                          padding: '4px 10px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '12px'
                        }}>
                          {gasto.categoria}
                        </span>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: '#697b92'
                        }}>
                          {gasto.fecha}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '8px' }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: '#f59e0b',
                        margin: 0
                      }}>
                        {gasto.precio}
                      </p>
                      <button
                        onClick={() => handleDeleteGasto(gasto.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#fee2e2',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#dc2626'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
