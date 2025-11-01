import Navigation from "./Navigation";
import svgPaths from "../imports/svg-hfr4v4wiwf";

interface VentasMenuScreenProps {
  onNavigate: (screen: string) => void;
}

export default function VentasMenuScreen({ onNavigate }: VentasMenuScreenProps) {
  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="ventas" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ 
        flex: 1, 
        padding: 'clamp(40px, 6vw, 60px) clamp(30px, 10vw, 140px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 105px))',
          gap: '18px',
          marginTop: '4px',
          justifyContent: 'center',
          maxWidth: '100%'
        }}>
          {/* Notas Venta */}
          <MenuCard
            label="Notas\nVenta"
            icon={svgPaths.p14fab3c0}
            active={true}
            onClick={() => onNavigate('ventas')}
          />

          {/* Resumen Día */}
          <MenuCard
            label="Resumen\nDia"
            icon="resumen"
            onClick={() => onNavigate('resumenDia')}
          />

          {/* Cobros */}
          <MenuCard
            label="Cobros"
            icon={svgPaths.pa1b6af0}
            onClick={() => onNavigate('cobrosList')}
          />

          {/* Gastos */}
          <MenuCard
            label="Gastos"
            icon={svgPaths.p7bc3580}
            onClick={() => onNavigate('gastos')}
          />

          {/* Documen. */}
          <MenuCard
            label="Documen."
            icon={svgPaths.p164ac600}
            onClick={() => onNavigate('documentos')}
          />

          {/* Clientes */}
          <MenuCard
            label="Clientes"
            icon={svgPaths.p7b85270}
            onClick={() => onNavigate('clientes')}
          />

          {/* Artículos */}
          <MenuCard
            label="Articulos"
            icon={svgPaths.p1dbedbc0}
            onClick={() => onNavigate('articulos')}
          />
        </div>
      </div>
    </div>
  );
}

interface MenuCardProps {
  label: string;
  icon: string;
  active?: boolean;
  onClick: () => void;
}

function MenuCard({ label, icon, active = false, onClick }: MenuCardProps) {
  const isResumen = icon === "resumen";
  
  return (
    <div
      onClick={onClick}
      style={{
        width: '105px',
        height: '105px',
        backgroundColor: active ? '#0C2ABF' : '#0C2ABF',
        borderRadius: '12.543px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        opacity: active ? 1 : 0.9
      }}
    >
      {/* Icon */}
      <div style={{
        marginTop: '24px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isResumen ? (
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d={svgPaths.p12b8f2f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
            <path d={svgPaths.p2a508600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
            <path d={svgPaths.p272c3100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
            <path d={svgPaths.p271ad740} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.p14fab3c0 ? (
          <svg width="18" height="23" viewBox="0 0 19 24" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.pa1b6af0 ? (
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.p7bc3580 ? (
          <svg width="24" height="22" viewBox="0 0 25 23" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.p164ac600 ? (
          <svg width="18" height="23" viewBox="0 0 19 24" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.p7b85270 ? (
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : icon === svgPaths.p1dbedbc0 ? (
          <svg width="25" height="25" viewBox="0 0 26 26" fill="none">
            <path d={icon} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79688" />
          </svg>
        ) : null}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '14.375px',
        lineHeight: '16.771px',
        color: '#ffffff',
        textAlign: 'center',
        margin: 0,
        whiteSpace: 'pre-line'
      }}>
        {label}
      </p>
    </div>
  );
}
