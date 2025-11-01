import svgPaths from "../imports/svg-2fxeo0qy2u";
import img from "figma:asset/64e22b9a1eb7f86d37f38817111a710f2aedc975.png";

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <div style={{
      width: '80px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '20px',
      boxShadow: '100px 33px 30px 0px rgba(0,9,77,0), 64px 21px 27px 0px rgba(0,9,77,0.01), 36px 12px 23px 0px rgba(0,9,77,0.05), 16px 5px 17px 0px rgba(0,9,77,0.09), 4px 1px 9px 0px rgba(0,9,77,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '25px',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }}>
      {/* Logo */}
      <div 
        onClick={() => onNavigate('dashboard')}
        style={{ width: '48px', height: '48px', marginBottom: '32px', cursor: 'pointer' }}
      >
        <img alt="Logo" src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Menu items */}
      <MenuItem 
        icon={svgPaths.p31930300} 
        label="Panel" 
        active={currentScreen === 'dashboard'}
        onClick={() => onNavigate('dashboard')}
      />
      <MenuItem 
        icon={svgPaths.p23a48780} 
        label="Ventas" 
        active={currentScreen === 'ventasMenu' || currentScreen === 'ventas' || currentScreen === 'nuevaVenta' || currentScreen === 'resumenDia' || currentScreen === 'cobrosList' || currentScreen === 'cobros' || currentScreen === 'cobrosConfirmacion' || currentScreen === 'gastos'}
        onClick={() => onNavigate('ventasMenu')}
      />
      <MenuItem 
        icon={svgPaths.p535fb40} 
        label="Almacen" 
        viewBox="0 0 15 13"
        active={currentScreen === 'almacen' || currentScreen === 'articulos' || currentScreen === 'notasAlmacen' || currentScreen === 'resumenStock'}
        onClick={() => onNavigate('almacen')}
      />
      <MenuItem 
        icon={svgPaths.p10a85360} 
        label="Comunica" 
        active={currentScreen === 'comunicacion' || currentScreen === 'clientes'}
        onClick={() => onNavigate('comunicacion')}
      />
      <MenuItem 
        icon={svgPaths.pc902380} 
        label="Agenda" 
        viewBox="0 0 15 16"
        active={currentScreen === 'agenda'}
        onClick={() => onNavigate('agenda')}
      />
      
      <div style={{ flex: 1 }} />
      
      {/* Settings */}
      <div 
        onClick={() => onNavigate('configuracion')}
        style={{ width: '79px', height: '63.672px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', cursor: 'pointer' }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d={svgPaths.p3fbdf600} stroke="url(#paint0_linear_settings)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p3c0282f0} stroke="url(#paint1_linear_settings)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <defs>
            <linearGradient id="paint0_linear_settings" x1="3.75" x2="30.6846" y1="3.75" y2="17.668" gradientUnits="userSpaceOnUse">
              <stop stopColor="#092090" />
              <stop offset="1" stopColor="#0C2ABF" />
            </linearGradient>
            <linearGradient id="paint1_linear_settings" x1="11.25" x2="20.2282" y1="11.25" y2="15.8893" gradientUnits="userSpaceOnUse">
              <stop stopColor="#092090" />
              <stop offset="1" stopColor="#0C2ABF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, active = false, viewBox = "0 0 15 15", onClick }: { 
  icon: string; 
  label: string; 
  active?: boolean; 
  viewBox?: string;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      style={{
        width: '79px',
        height: '63.672px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '14px',
        backgroundColor: active ? '#0C2ABF' : '#ffffff',
        borderRadius: active ? '10px' : '58.955px',
        cursor: 'pointer'
      }}
    >
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
