import React, { useState } from 'react';
import svgPaths from '../imports/svg-qepo8zbfsg';
import Navigation from './Navigation';

interface ResumenStockScreenProps {
  onNavigate?: (screen: string) => void;
}

interface ArticuloStock {
  id: string;
  nombre: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  ultimaEntrada: string;
  ultimaSalida: string;
}

const stockData: ArticuloStock[] = [
  { id: '001', nombre: 'Croqueta Jamón', categoria: 'Fritos', stock: 100, stockMinimo: 50, ultimaEntrada: '18/09/2024', ultimaSalida: '15/09/2024' },
  { id: '002', nombre: 'Croqueta Pollo', categoria: 'Fritos', stock: 85, stockMinimo: 50, ultimaEntrada: '17/09/2024', ultimaSalida: '14/09/2024' },
  { id: '003', nombre: 'Empanadilla Atún', categoria: 'Fritos', stock: 120, stockMinimo: 60, ultimaEntrada: '19/09/2024', ultimaSalida: '16/09/2024' },
  { id: '004', nombre: 'Pizza Margarita', categoria: 'Precocinados', stock: 30, stockMinimo: 40, ultimaEntrada: '15/09/2024', ultimaSalida: '18/09/2024' },
  { id: '005', nombre: 'Lasaña Boloñesa', categoria: 'Precocinados', stock: 45, stockMinimo: 50, ultimaEntrada: '16/09/2024', ultimaSalida: '17/09/2024' },
  { id: '006', nombre: 'Guisantes Congelados', categoria: 'Verduras', stock: 200, stockMinimo: 100, ultimaEntrada: '20/09/2024', ultimaSalida: '15/09/2024' },
  { id: '007', nombre: 'Pimientos Asados', categoria: 'Conservas', stock: 75, stockMinimo: 30, ultimaEntrada: '18/09/2024', ultimaSalida: '16/09/2024' },
  { id: '008', nombre: 'Tortilla Española', categoria: 'Precocinados', stock: 50, stockMinimo: 40, ultimaEntrada: '19/09/2024', ultimaSalida: '17/09/2024' },
];

export default function ResumenStockScreen({ onNavigate }: ResumenStockScreenProps) {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  const categorias = ['Todos', ...Array.from(new Set(stockData.map(a => a.categoria)))];

  const filteredData = filtroCategoria === 'Todos' 
    ? stockData 
    : stockData.filter(a => a.categoria === filtroCategoria);

  const stockBajo = filteredData.filter(a => a.stock < a.stockMinimo);
  const totalStock = filteredData.reduce((acc, a) => acc + a.stock, 0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="resumenStock" onNavigate={onNavigate || (() => {})} />

      <div style={{ flex: 1, position: 'relative', height: '100%', backgroundColor: 'white' }}>
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '62px',
            backgroundColor: 'white',
            borderBottom: '1px solid rgb(226, 232, 240)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '61px',
              padding: '10px 24px',
            }}
          >
            <div style={{ width: '26px', height: '26px' }} />
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: '#1a1a1a',
                textAlign: 'center',
                margin: 0,
              }}
            >
              Resumen Stock
            </p>
            <div
              onClick={() => onNavigate && onNavigate('almacen')}
              style={{ width: '26px', height: '26px', position: 'relative', cursor: 'pointer' }}
            >
              <svg
                style={{ display: 'block', width: '100%', height: '100%' }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 26 26"
              >
                <path
                  clipRule="evenodd"
                  d="M15.6445 7.35092C15.8628 7.57568 15.9854 7.88048 15.9854 8.1983C15.9854 8.51611 15.8628 8.82091 15.6445 9.04567L11.8104 12.9925L15.6445 16.9393C15.7558 17.0499 15.8445 17.1822 15.9055 17.3284C15.9665 17.4746 15.9986 17.6319 16 17.791C16.0013 17.9502 15.9718 18.108 15.9133 18.2553C15.8548 18.4026 15.7683 18.5364 15.659 18.649C15.5497 18.7615 15.4197 18.8505 15.2766 18.9107C15.1335 18.971 14.9802 19.0013 14.8256 19C14.671 18.9986 14.5182 18.9655 14.3761 18.9027C14.2341 18.8399 14.1056 18.7486 13.9982 18.6341L9.3409 13.8399C9.12262 13.6151 9 13.3103 9 12.9925C9 12.6747 9.12262 12.3699 9.3409 12.1451L13.9982 7.35092C14.2165 7.12623 14.5126 7 14.8214 7C15.1301 7 15.4262 7.12623 15.6445 7.35092Z"
                  fill="#697B92"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '60px' }}>
          {/* Estadísticas */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <div
              style={{
                flex: 1,
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid rgb(226, 232, 240)',
                background: 'linear-gradient(135deg, #092090 0%, #0C2ABF 100%)',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                Total Artículos
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px', color: 'white', margin: '8px 0 0 0' }}>
                {filteredData.length}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid rgb(226, 232, 240)',
                backgroundColor: 'white',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                Stock Total
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px', color: '#1a1a1a', margin: '8px 0 0 0' }}>
                {totalStock}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid #fbbf24',
                backgroundColor: '#fffbeb',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#92400e', margin: 0 }}>
                Stock Bajo
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px', color: '#f59e0b', margin: '8px 0 0 0' }}>
                {stockBajo.length}
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                style={{
                  borderRadius: '30px',
                  border: filtroCategoria === cat ? 'none' : '1px solid #092090',
                  background: filtroCategoria === cat ? 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)' : 'white',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: filtroCategoria === cat ? 'white' : '#092090',
                    margin: 0,
                  }}
                >
                  {cat}
                </p>
              </button>
            ))}
          </div>

          {/* Tabla de stock */}
          <div style={{ border: '1px solid rgb(226, 232, 240)', borderRadius: '10px', overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 150px 100px 100px 120px 120px',
                padding: '16px 24px',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid rgb(226, 232, 240)',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0 }}>ID</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0 }}>Nombre</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0 }}>Categoría</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0, textAlign: 'center' }}>Stock</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0, textAlign: 'center' }}>Mínimo</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0 }}>Últ. Entrada</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#64748b', margin: 0 }}>Últ. Salida</p>
            </div>

            {/* Rows */}
            {filteredData.map((articulo, index) => {
              const isBajoStock = articulo.stock < articulo.stockMinimo;
              return (
                <div
                  key={articulo.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 150px 100px 100px 120px 120px',
                    padding: '16px 24px',
                    borderBottom: index < filteredData.length - 1 ? '1px solid rgb(226, 232, 240)' : 'none',
                    backgroundColor: isBajoStock ? '#fffbeb' : 'white',
                  }}
                >
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: 0 }}>{articulo.id}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: 0 }}>{articulo.nombre}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>{articulo.categoria}</p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: isBajoStock ? '#f59e0b' : '#10b981',
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    {articulo.stock}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0, textAlign: 'center' }}>
                    {articulo.stockMinimo}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>{articulo.ultimaEntrada}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>{articulo.ultimaSalida}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
