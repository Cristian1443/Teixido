import React, { useState } from 'react';
import svgPaths from '../imports/svg-xhujsyxfbl';
import Navigation from './Navigation';
import { Articulo } from '../App';

interface ArticulosScreenProps {
  onNavigate?: (screen: string) => void;
  articulos: Articulo[];
  onUpdateArticulo: (id: string, cantidad: number) => void;
}

const categorias = ['Todos', 'Fritos', 'Precocinados', 'Verduras', 'Conservas'];

export default function ArticulosScreen({ onNavigate, articulos: articulosIniciales, onUpdateArticulo }: ArticulosScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [sortBy, setSortBy] = useState<'nombre' | 'cantidad' | 'stock'>('nombre');
  const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);

  const filteredArticulos = articulosIniciales
    .filter((articulo) => {
      const matchSearch = articulo.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategoria = categoriaSeleccionada === 'Todos' || articulo.categoria === categoriaSeleccionada;
      return matchSearch && matchCategoria;
    })
    .sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'cantidad') return b.cantidad - a.cantidad;
      if (sortBy === 'stock') {
        const aStockBajo = a.cantidad < (a.stockMinimo || 0);
        const bStockBajo = b.cantidad < (b.stockMinimo || 0);
        return (bStockBajo ? 1 : 0) - (aStockBajo ? 1 : 0);
      }
      return 0;
    });

  const articulosStockBajo = articulosIniciales.filter(a => a.cantidad < (a.stockMinimo || 0));
  const totalArticulos = articulosIniciales.length;
  const valorTotal = articulosIniciales.reduce((sum, a) => {
    const precio = parseFloat(a.precio?.replace(',', '.').replace('€', '').trim() || '0');
    return sum + (precio * a.cantidad);
  }, 0);

  const handleVerMas = (articulo: Articulo) => {
    setSelectedArticulo(articulo);
  };

  const isStockBajo = (articulo: Articulo) => {
    return articulo.cantidad < (articulo.stockMinimo || 0);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="articulos" onNavigate={onNavigate || (() => {})} />
      
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
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
              Artículos
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => alert('Funcionalidad de Proveedores próximamente')}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <svg width="20" height="16" viewBox="0 0 21 16" fill="none">
                <path d={svgPaths.p34e60480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              Proveedores
            </button>
            <button
              onClick={() => alert('Funcionalidad de Divisiones próximamente')}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d={svgPaths.p29990a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              Divisiones
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Artículos</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {totalArticulos}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#fee2e2', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#dc2626', margin: 0 }}>Stock Bajo</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0' }}>
              {articulosStockBajo.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Valor Inventario</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {valorTotal.toFixed(2).replace('.', ',')} €
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
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
              <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
              }}
            />
          </div>
          
          {/* Filtro por categoría */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSeleccionada(categoria)}
                style={{
                  borderRadius: '30px',
                  border: categoriaSeleccionada === categoria ? 'none' : '1px solid #e2e8f0',
                  background: categoriaSeleccionada === categoria ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: categoriaSeleccionada === categoria ? 'white' : '#697b92',
                }}
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '8px 16px',
              borderRadius: '30px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#697b92',
              outline: 'none'
            }}
          >
            <option value="nombre">Ordenar: A-Z</option>
            <option value="cantidad">Ordenar: Cantidad</option>
            <option value="stock">Ordenar: Stock Bajo</option>
          </select>
        </div>

        {/* Lista de artículos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredArticulos.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
                No se encontraron artículos
              </p>
            </div>
          ) : (
            filteredArticulos.map((articulo) => (
              <div
                key={articulo.id}
                style={{
                  backgroundColor: isStockBajo(articulo) ? '#fef2f2' : 'white',
                  borderRadius: '12px',
                  border: `1px solid ${isStockBajo(articulo) ? '#fecaca' : '#e2e8f0'}`,
                  padding: '20px',
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
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Info principal */}
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                        <path d={svgPaths.p376af900} stroke="url(#paint0_linear_art)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <defs>
                          <linearGradient id="paint0_linear_art" x1="1" x2="21.0399" y1="1" y2="10.2046" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#092090" />
                            <stop offset="1" stopColor="#0C2ABF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <h3 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        {articulo.nombre}
                      </h3>
                      {isStockBajo(articulo) && (
                        <span style={{
                          padding: '4px 10px',
                          backgroundColor: '#dc2626',
                          borderRadius: '12px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'white'
                        }}>
                          Stock Bajo
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#697b92',
                        padding: '4px 10px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '12px'
                      }}>
                        {articulo.categoria}
                      </span>
                      {articulo.proveedor && (
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          color: '#697b92'
                        }}>
                          Proveedor: {articulo.proveedor}
                        </span>
                      )}
                    </div>

                    {articulo.precio && (
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#092090',
                        margin: '8px 0 0 0'
                      }}>
                        Precio: {articulo.precio}
                      </p>
                    )}
                  </div>

                  {/* Stock y acciones */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end', minWidth: '180px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: '0 0 4px 0' }}>
                        Stock Actual
                      </p>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '32px',
                        color: isStockBajo(articulo) ? '#dc2626' : '#1a1a1a',
                        margin: 0
                      }}>
                        {articulo.cantidad}
                      </p>
                      {articulo.stockMinimo && (
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#697b92', margin: '4px 0 0 0' }}>
                          Mínimo: {articulo.stockMinimo}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleVerMas(articulo)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(to right, #092090, #0C2ABF)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M6 7.2C6.31826 7.2 6.62348 7.07357 6.84853 6.84853C7.07357 6.62348 7.2 6.31826 7.2 6C7.2 5.68174 7.07357 5.37652 6.84853 5.15147C6.62348 4.92643 6.31826 4.8 6 4.8C5.68174 4.8 5.37652 4.92643 5.15147 5.15147C4.92643 5.37652 4.8 5.68174 4.8 6C4.8 6.31826 4.92643 6.62348 5.15147 6.84853C5.37652 7.07357 5.68174 7.2 6 7.2Z"
                          fill="white"
                        />
                        <path
                          clipRule="evenodd"
                          d="M0.2748 6C1.0392 3.5658 3.3132 1.8 6 1.8C8.6868 1.8 10.9608 3.5658 11.7252 6C10.9608 8.4342 8.6868 10.2 6 10.2C3.3132 10.2 1.0392 8.4342 0.2748 6ZM8.4 6C8.4 6.63652 8.14714 7.24697 7.69706 7.69706C7.24697 8.14714 6.63652 8.4 6 8.4C5.36348 8.4 4.75303 8.14714 4.30294 7.69706C3.85286 7.24697 3.6 6.63652 3.6 6C3.6 5.36348 3.85286 4.75303 4.30294 4.30294C4.75303 3.85286 5.36348 3.6 6 3.6C6.63652 3.6 7.24697 3.85286 7.69706 4.30294C8.14714 4.75303 8.4 5.36348 8.4 6Z"
                          fill="white"
                          fillRule="evenodd"
                        />
                      </svg>
                      Ver Más
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal simple de detalles */}
        {selectedArticulo && (
          <div
            onClick={() => setSelectedArticulo(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%'
              }}
            >
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                {selectedArticulo.nombre}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Categoría</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                    {selectedArticulo.categoria}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Stock Actual</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#092090', margin: '4px 0 0 0' }}>
                    {selectedArticulo.cantidad} unidades
                  </p>
                </div>
                {selectedArticulo.precio && (
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Precio</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: '4px 0 0 0' }}>
                      {selectedArticulo.precio}
                    </p>
                  </div>
                )}
                {selectedArticulo.proveedor && (
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Proveedor</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                      {selectedArticulo.proveedor}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedArticulo(null)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(to right, #092090, #0C2ABF)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
