import { useState } from 'react';
import svgPaths from "../imports/svg-l9tk2wh0zt";
import imgRectangle26 from "figma:asset/d0c756551c7af151492348bd0486c6731ea8b378.png";
import Navigation from "./Navigation";
import { NotaVenta, Gasto, Cobro } from '../App';

interface ResumenDiaScreenProps {
  onNavigate: (screen: string) => void;
  notasVenta: NotaVenta[];
  gastos: Gasto[];
  cobros: Cobro[];
}

export default function ResumenDiaScreen({ onNavigate, notasVenta, gastos, cobros }: ResumenDiaScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Totales del Día');
  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');

  const filteredNotasVenta = notasVenta.filter((nota) =>
    nota.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nota.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGastos = gastos.filter((gasto) =>
    gasto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gasto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="resumenDia" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header con botón volver y acciones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
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
              Resumen del Día
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('nuevaVenta')}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                border: '2px solid #092090',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              + Nueva Venta
            </button>
            <button
              onClick={() => onNavigate('gastos')}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                border: '2px solid #092090',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              + Nuevo Gasto
            </button>
            <button
              onClick={() => window.print()}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 5V1H12V5M4 11H2C1.46957 11 0.960859 10.7893 0.585786 10.4142C0.210714 10.0391 0 9.53043 0 9V6C0 5.46957 0.210714 4.96086 0.585786 4.58579C0.960859 4.21071 1.46957 4 2 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V9C16 9.53043 15.7893 10.0391 15.4142 10.4142C15.0391 10.7893 14.5304 11 14 11H12M4 8H12V15H4V8Z" fill="white"/>
              </svg>
              Exportar
            </button>
          </div>
        </div>

        {/* Selector de fecha y búsqueda */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Hoy', 'Ayer', 'Semana', 'Mes'].map((periodo) => (
              <button
                key={periodo}
                onClick={() => setSelectedPeriod(periodo)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: selectedPeriod === periodo ? 'none' : '1px solid #e2e8f0',
                  background: selectedPeriod === periodo ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: selectedPeriod === periodo ? 'white' : '#697b92'
                }}
              >
                {periodo}
              </button>
            ))}
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '30px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px',
            flex: 1,
            maxWidth: '400px'
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Buscar cliente o nota..."
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
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {['Totales del Día', 'Notas de Venta', 'Cobros', 'Gastos', 'Incidencias'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '30px',
                border: activeTab === tab ? 'none' : '1px solid #092090',
                background: activeTab === tab ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: activeTab === tab ? 'white' : '#092090',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div 
            onClick={() => setActiveTab('Notas de Venta')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Ventas Hoy"
              value="2.450,00 €"
              change="+12% vs ayer"
              changeColor="#91e600"
              bgGradient="linear-gradient(to right, #092090, #0C2ABF)"
            />
          </div>
          <div 
            onClick={() => setActiveTab('Gastos')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Gastos Hoy"
              value="180,50 €"
              change="-8% vs ayer"
              changeColor="#f59f0a"
              titleBg="#0C2ABF"
            />
          </div>
          <div 
            onClick={() => setActiveTab('Notas de Venta')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Nº de Ventas"
              value="8"
              change="+2 vs ayer"
              changeColor="#91e600"
            />
          </div>
          <div 
            onClick={() => onNavigate('clientes')}
            style={{ cursor: 'pointer' }}
          >
            <StatsCard 
              title="Clientes Visitados"
              value="12"
              change="Objetivo: 15 clientes"
              changeColor="#697b92"
            />
          </div>
        </div>

        {/* Content basado en tab activo */}
        {activeTab === 'Totales del Día' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
            {/* Notas de Venta */}
            <ContentPanel 
              title="Notas de Venta"
              icon={svgPaths.p3cd0c6c0}
              onAddClick={() => onNavigate('nuevaVenta')}
            >
              {filteredNotasVenta.slice(0, 5).map((nota, index) => (
                <div 
                  key={index}
                  onClick={() => onNavigate('verNota')}
                  style={{ cursor: 'pointer' }}
                >
                  <NotaVentaItem {...nota} />
                </div>
              ))}
              {filteredNotasVenta.length > 5 && (
                <button
                  onClick={() => setActiveTab('Notas de Venta')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#092090'
                  }}
                >
                  Ver todas ({filteredNotasVenta.length})
                </button>
              )}
            </ContentPanel>

            {/* Gastos */}
            <ContentPanel 
              title="Gastos"
              icon={svgPaths.p3cd0c6c0}
              onAddClick={() => onNavigate('gastos')}
            >
              {filteredGastos.slice(0, 5).map((gasto, index) => (
                <div 
                  key={index}
                  onClick={() => onNavigate('gastos')}
                  style={{ cursor: 'pointer' }}
                >
                  <GastoItem {...gasto} imagen={imgRectangle26} />
                </div>
              ))}
              {filteredGastos.length > 5 && (
                <button
                  onClick={() => setActiveTab('Gastos')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#092090'
                  }}
                >
                  Ver todos ({filteredGastos.length})
                </button>
              )}
            </ContentPanel>
          </div>
        )}

        {activeTab === 'Notas de Venta' && (
          <ContentPanel 
            title="Todas las Notas de Venta"
            icon={svgPaths.p3cd0c6c0}
            onAddClick={() => onNavigate('nuevaVenta')}
          >
            {filteredNotasVenta.map((nota, index) => (
              <div 
                key={index}
                onClick={() => onNavigate('verNota')}
                style={{ cursor: 'pointer' }}
              >
                <NotaVentaItem {...nota} />
              </div>
            ))}
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Ventas</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  2.450,00 €
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Notas procesadas</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {filteredNotasVenta.length}
                </p>
              </div>
            </div>
          </ContentPanel>
        )}

        {activeTab === 'Gastos' && (
          <ContentPanel 
            title="Todos los Gastos"
            icon={svgPaths.p3cd0c6c0}
            onAddClick={() => onNavigate('gastos')}
          >
            {filteredGastos.map((gasto, index) => (
              <div 
                key={index}
                onClick={() => onNavigate('gastos')}
                style={{ cursor: 'pointer' }}
              >
                <GastoItem {...gasto} imagen={imgRectangle26} />
              </div>
            ))}
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Gastos</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#f59e0b', margin: '4px 0 0 0' }}>
                  180,50 €
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Gastos registrados</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {filteredGastos.length}
                </p>
              </div>
            </div>
          </ContentPanel>
        )}

        {activeTab === 'Cobros' && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92', marginBottom: '20px' }}>
              Gestión de cobros
            </p>
            <button
              onClick={() => onNavigate('cobrosList')}
              style={{
                padding: '12px 24px',
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
              Ir a Cobros
            </button>
          </div>
        )}

        {activeTab === 'Incidencias' && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
              No hay incidencias registradas hoy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Components
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  bgGradient?: string;
  titleBg?: string;
}

function StatsCard({ title, value, change, changeColor, bgGradient, titleBg }: StatsCardProps) {
  return (
    <div style={{
      backgroundColor: bgGradient || '#ffffff',
      border: bgGradient ? 'none' : '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '24px',
      transition: 'transform 0.2s'
    }}>
      <div style={{
        display: 'inline-block',
        padding: '5px 10px',
        backgroundColor: titleBg || (bgGradient ? 'rgba(255,255,255,0.2)' : '#0C2ABF'),
        borderRadius: '20px',
        marginBottom: '16px'
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
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
        color: bgGradient ? '#ffffff' : '#1a1a1a',
        margin: '0 0 8px 0'
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: changeColor,
        margin: 0
      }}>
        {change}
      </p>
    </div>
  );
}

interface ContentPanelProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onAddClick?: () => void;
}

function ContentPanel({ title, icon, children, onAddClick }: ContentPanelProps) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '28px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d={icon} stroke="url(#paint0_linear_panel)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <defs>
              <linearGradient id="paint0_linear_panel" x1="1" x2="22.5477" y1="1" y2="12.1344" gradientUnits="userSpaceOnUse">
                <stop stopColor="#092090" />
                <stop offset="1" stopColor="#0C2ABF" />
              </linearGradient>
            </defs>
          </svg>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            color: '#1a1a1a',
            margin: 0
          }}>
            {title}
          </h2>
        </div>
        {onAddClick && (
          <button
            onClick={onAddClick}
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: 'white'
            }}
          >
            + Añadir
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  );
}

interface NotaVentaItemProps {
  id: string;
  cliente: string;
  precio: string;
}

function NotaVentaItem({ id, cliente, precio }: NotaVentaItemProps) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      <div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#1a1a1a',
          margin: '0 0 4px 0'
        }}>
          {id}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#697b92',
          margin: 0
        }}>
          {cliente}
        </p>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        color: '#0C2ABF',
        margin: 0
      }}>
        {precio}
      </p>
    </div>
  );
}

interface GastoItemProps {
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
}

function GastoItem({ nombre, categoria, precio, imagen }: GastoItemProps) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '12px',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
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
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: '#f1f5f9'
      }}>
        <img 
          src={imagen} 
          alt={nombre} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          color: '#1a1a1a',
          margin: '0 0 4px 0'
        }}>
          {nombre}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#697b92',
          margin: 0
        }}>
          {categoria}
        </p>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        color: '#f59e0b',
        margin: 0
      }}>
        {precio}
      </p>
    </div>
  );
}
