import svgPaths from "../imports/svg-l9tk2wh0zt";
import imgRectangle26 from "figma:asset/d0c756551c7af151492348bd0486c6731ea8b378.png";
import Navigation from "./Navigation";

interface ResumenDiaScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ResumenDiaScreen({ onNavigate }: ResumenDiaScreenProps) {
  const notasVenta = Array(7).fill({
    id: 'P001',
    nombre: '100 Distribuciones Rivera S.L.',
    precio: '28,90 €'
  });

  const gastos = Array(7).fill({
    nombre: 'Gasto 01',
    categoria: 'Comida',
    precio: '28,90 €'
  });

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="resumenDia" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '60px 140px', overflowY: 'auto' }}>
        {/* Search bar */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '5px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: '14px',
          marginBottom: '28px'
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Buscar cliente"
            style={{
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#697b92',
              backgroundColor: 'transparent',
              flex: 1
            }}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <TabButton label="Totales del Día" active />
          <TabButton label="Notas de Venta" />
          <TabButton label="Cobros" />
          <TabButton label="Gastos" />
          <TabButton label="Incidencias" />
          <TabButton label="Ingresos Banco" />
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <StatsCard 
            title="Ventas Hoy"
            value="2.450,00 €"
            change="+12% vs ayer"
            changeColor="#91e600"
            bgGradient="linear-gradient(to right, #092090, #0C2ABF)"
          />
          <StatsCard 
            title="Gastos Hoy"
            value="180,50 €"
            change="-8% vs ayer"
            changeColor="#f59f0a"
            titleBg="#0C2ABF"
          />
          <StatsCard 
            title="Nº de Ventas"
            value="8"
            change="+2 vs ayer"
            changeColor="#91e600"
          />
          <StatsCard 
            title="Clientes Visitados"
            value="12"
            change="Objetivo: 15 clientes"
            changeColor="#697b92"
          />
        </div>

        {/* Content panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Notas de Venta */}
          <ContentPanel 
            title="Notas de Venta"
            icon={svgPaths.p3cd0c6c0}
          >
            {notasVenta.map((nota, index) => (
              <NotaVentaItem key={index} {...nota} />
            ))}
          </ContentPanel>

          {/* Gastos */}
          <ContentPanel 
            title="Gastos"
            icon={svgPaths.p3cd0c6c0}
          >
            {gastos.map((gasto, index) => (
              <GastoItem key={index} {...gasto} imagen={imgRectangle26} />
            ))}
          </ContentPanel>
        </div>
      </div>
    </div>
  );
}

function SidebarMenuItem({ icon, label, active = false, viewBox = "0 0 15 15" }: { icon: string; label: string; active?: boolean; viewBox?: string }) {
  return (
    <div style={{
      width: '79px',
      height: '63.672px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '14px',
      backgroundColor: active ? '#0C2ABF' : '#ffffff',
      borderRadius: '58.955px',
      cursor: 'pointer'
    }}>
      <svg width="13.5" height="13.5" viewBox={viewBox} fill="none" style={{ marginBottom: '8px' }}>
        <path 
          d={icon} 
          stroke={active ? "white" : "url(#paint0_linear_menu)"} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.1791" 
        />
        {!active && (
          <defs>
            <linearGradient id="paint0_linear_menu" x1="0.589552" x2="16" y1="0.589552" y2="9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#092090" />
              <stop offset="1" stopColor="#0C2ABF" />
            </linearGradient>
          </defs>
        )}
      </svg>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '11.791px',
        lineHeight: '11.791px',
        color: active ? '#ffffff' : 'transparent',
        background: active ? 'transparent' : 'linear-gradient(to right, #092090, #0C2ABF)',
        WebkitBackgroundClip: active ? 'unset' : 'text',
        WebkitTextFillColor: active ? '#ffffff' : 'transparent',
        margin: 0
      }}>
        {label}
      </p>
    </div>
  );
}

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div style={{
      padding: '5px 10px',
      backgroundColor: active ? '#0C2ABF' : '#ffffff',
      border: active ? 'none' : '1px solid #092090',
      borderRadius: '30px',
      cursor: 'pointer'
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '14px',
        color: active ? '#ffffff' : 'transparent',
        background: active ? 'transparent' : 'linear-gradient(to right, #092090, #0C2ABF)',
        WebkitBackgroundClip: active ? 'unset' : 'text',
        WebkitTextFillColor: active ? '#ffffff' : 'transparent'
      }}>
        {label}
      </span>
    </div>
  );
}

function StatsCard({ title, value, change, changeColor, bgGradient, titleBg }: { 
  title: string; 
  value: string; 
  change: string; 
  changeColor: string; 
  bgGradient?: string;
  titleBg?: string;
}) {
  return (
    <div style={{
      backgroundColor: bgGradient ? 'transparent' : '#ffffff',
      background: bgGradient || '#ffffff',
      border: bgGradient ? 'none' : '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '28px',
      position: 'relative',
      minHeight: '145px'
    }}>
      <div style={{
        display: 'inline-block',
        padding: '5px 10px',
        backgroundColor: titleBg || '#ffffff',
        borderRadius: '20px',
        marginBottom: '38px'
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: titleBg ? '#ffffff' : 'transparent',
          background: titleBg ? 'transparent' : 'linear-gradient(to right, #092090, #0C2ABF)',
          WebkitBackgroundClip: titleBg ? 'unset' : 'text',
          WebkitTextFillColor: titleBg ? '#ffffff' : 'transparent'
        }}>
          {title}
        </span>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '28px',
        lineHeight: '28px',
        color: bgGradient ? '#ffffff' : '#1a1a1a',
        margin: '0 0 12px 0'
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '14px',
        color: changeColor,
        margin: 0
      }}>
        {change}
      </p>
    </div>
  );
}

function ContentPanel({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '26px',
      minHeight: '958px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
        <svg width="16.1" height="20.7" viewBox="0 0 19 23" fill="none">
          <path d={icon} stroke="url(#paint0_linear_panel)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
          <defs>
            <linearGradient id="paint0_linear_panel" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941" gradientUnits="userSpaceOnUse">
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
          {title}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  );
}

function NotaVentaItem({ id, nombre, precio }: { id: string; nombre: string; precio: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '18px',
      minHeight: '112px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          padding: '3px 5px',
          backgroundColor: '#91e600',
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
          margin: 0
        }}>
          {nombre}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '14px',
          background: 'linear-gradient(to right, #092090, #0C2ABF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          cursor: 'pointer'
        }}>
          Ver Detalles
        </p>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d={svgPaths.p76d5040} stroke="url(#paint0_linear_arrow)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <defs>
            <linearGradient id="paint0_linear_arrow" x1="0.75" x2="12.7209" y1="0.75" y2="6.93576" gradientUnits="userSpaceOnUse">
              <stop stopColor="#092090" />
              <stop offset="1" stopColor="#0C2ABF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p style={{
        position: 'absolute',
        top: '51px',
        right: '18px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '14px',
        color: '#0c1c8d',
        margin: 0
      }}>
        {precio}
      </p>
    </div>
  );
}

function GastoItem({ nombre, categoria, precio, imagen }: { nombre: string; categoria: string; precio: string; imagen: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '12px',
      minHeight: '112px',
      position: 'relative',
      display: 'flex',
      gap: '11px'
    }}>
      <div style={{
        width: '88px',
        height: '88px',
        borderRadius: '10px',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img 
          src={imagen} 
          alt="Gasto" 
          style={{
            width: '203.5%',
            height: '135.23%',
            objectFit: 'cover',
            transform: 'translate(-46.5%, -17.6%)'
          }}
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '14px',
          color: '#1a1a1a',
          margin: '0 0 8px 0'
        }}>
          {nombre}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '10px',
          lineHeight: '10px',
          color: '#697b92',
          margin: 0
        }}>
          {categoria}
        </p>
      </div>
      <div style={{ position: 'absolute', right: '18px', top: '37px', textAlign: 'right' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '14px',
          color: '#0c1c8d',
          margin: '0 0 8px 0'
        }}>
          {precio}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '14px',
            background: 'linear-gradient(to right, #092090, #0C2ABF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            cursor: 'pointer'
          }}>
            Ver Detalles
          </p>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d={svgPaths.p76d5040} stroke="url(#paint0_linear_arrow2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <defs>
              <linearGradient id="paint0_linear_arrow2" x1="0.75" x2="12.7209" y1="0.75" y2="6.93576" gradientUnits="userSpaceOnUse">
                <stop stopColor="#092090" />
                <stop offset="1" stopColor="#0C2ABF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
