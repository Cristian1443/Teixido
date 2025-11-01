import React from 'react';
import svgPaths from '../imports/svg-88ioolopk0';
import Navigation from './Navigation';

interface AlmacenScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function AlmacenScreen({ onNavigate }: AlmacenScreenProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="almacen" onNavigate={onNavigate || (() => {})} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '60px 140px', position: 'relative' }}>
        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '12px', width: '225px', height: '105px' }}>
          {/* Notas Almacen */}
          <button
            onClick={() => onNavigate && onNavigate('notasAlmacen')}
            style={{
              width: '105.319px',
              height: '105.267px',
              borderRadius: '12.532px',
              border: 'none',
              background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: 0,
            }}
          >
            <div style={{ width: '16.755px', height: '21.543px' }}>
              <svg
                style={{ display: 'block', width: '100%', height: '100%' }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 19 24"
              >
                <path
                  d={svgPaths.p7e93f80}
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.79521"
                />
              </svg>
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14.362px',
                lineHeight: '16.755px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0 }}>Notas</p>
              <p style={{ margin: 0 }}>Almacen</p>
            </div>
          </button>

          {/* Resumen Stock */}
          <button
            onClick={() => onNavigate && onNavigate('resumenStock')}
            style={{
              width: '105.319px',
              height: '105.267px',
              borderRadius: '12.532px',
              border: 'none',
              background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: 0,
            }}
          >
            <div style={{ width: '25px', height: '19px' }}>
              <svg
                style={{ display: 'block', width: '100%', height: '100%' }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 25 19"
              >
                <path
                  d={svgPaths.p3a9c8f98}
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.79521"
                />
              </svg>
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14.362px',
                lineHeight: '16.755px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0 }}>Resumen</p>
              <p style={{ margin: 0 }}>Stock</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
