import svgPaths from "../imports/svg-cgihkm6xsq";
import img from "figma:asset/64e22b9a1eb7f86d37f38817111a710f2aedc975.png";

export default function VentasScreen() {
  const clientes = [
    { id: '101', nombre: 'Panadería El Trigo Dorado', razonSocial: 'Martín Delgado S.L.', nif: 'B12345678', direccion: 'Av. Castilla 89, Oviedo, Asturias', telefono: '+34 985 234 789', email: 'contacto@eltrigodorado.es', cobrosPendientes: 4 },
    { id: '102', nombre: 'López Hermanos C.B.', razonSocial: 'López Hermanos C.B.', nif: 'E87654321', direccion: 'Calle Sol 22, Gijón, Asturias', telefono: '+34 984 556 210', email: 'info@ferrelopez.es', cobrosPendientes: 2 },
    { id: '103', nombre: 'Restaurante La Gallina Loca', razonSocial: 'Ramiro Fernández S.A.', nif: 'A23456789', direccion: 'C/ Doctor Fleming 1, Lugones, Asturias', telefono: '+34 985 441 032', email: 'reservas@gallinaloca.es', cobrosPendientes: 4 },
    { id: '104', nombre: 'Supermercado El Pino', razonSocial: 'Distribuciones El Pino S.L.', nif: 'B34567890', direccion: 'C/ del Centro 11, Lugones, Asturias', telefono: '+34 984 223 400', email: 'contacto@superelpino.es', cobrosPendientes: 3 },
    { id: '105', nombre: 'Boutique Encanto', razonSocial: 'Carmen Torres Moda S.L.', nif: 'B56789012', direccion: 'Plaza Mayor 3, Candás, Asturias', telefono: '+34 985 762 019', email: 'ventas@boutiqueencanto.es', cobrosPendientes: 6 },
    { id: '106', nombre: 'Consultoría Empresarial G&A', razonSocial: 'González & Asociados Consultores S.L.', nif: 'B67890123', direccion: 'C/ Prado 18, Avilés, Asturias', telefono: '+34 984 987 004', email: 'contacto@gyaconsultores.es', cobrosPendientes: 3 },
    { id: '107', nombre: 'Floristería Los Pétalos', razonSocial: 'Luna Pérez Flores y Arte S.L.', nif: 'B78901234', direccion: 'C/ Jardín 45, Mieres, Asturias', telefono: '+34 985 334 612', email: 'pedidos@lospetalos.es', cobrosPendientes: 4 },
    { id: '108', nombre: 'Taller Mecánico Norte', razonSocial: 'Automoción del Norte C.B.', nif: 'E89012345', direccion: 'Av. Galicia 102, Oviedo, Asturias', telefono: '+34 984 442 911', email: 'taller@autonorte.es', cobrosPendientes: 4 },
    { id: '109', nombre: 'Cafetería El Mirador', razonSocial: 'Hostelería del Mirador S.L.', nif: 'B90123456', direccion: 'Paseo del Río 7, Grado, Asturias', telefono: '+34 985 223 600', email: 'info@elmiradorcafe.es', cobrosPendientes: 2 },
    { id: '110', nombre: 'Librería La Página Abierta', razonSocial: 'Editorial y Librería La Página S.L.', nif: 'B91234567', direccion: 'C/ Cervantes 12, Avilés, Asturias', telefono: '+34 984 554 288', email: 'pedidos@lapaginaabierta.es', cobrosPendientes: 1 }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
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
        <div style={{ width: '48px', height: '48px', marginBottom: '32px' }}>
          <img alt="Logo" src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Menu items */}
        <SidebarMenuItem icon={svgPaths.p31930300} label="Panel" />
        <SidebarMenuItem icon={svgPaths.p23a48780} label="Ventas" active />
        <SidebarMenuItem icon={svgPaths.p535fb40} label="Almacen" viewBox="0 0 15 13" />
        <SidebarMenuItem icon={svgPaths.p10a85360} label="Comunica" />
        <SidebarMenuItem icon={svgPaths.pc902380} label="Agenda" viewBox="0 0 15 16" />
        
        <div style={{ flex: 1 }} />
        
        {/* Settings */}
        <div style={{ width: '79px', height: '63.672px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
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

      {/* Main content */}
      <div style={{ flex: 1, padding: '60px 140px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <svg width="16.1" height="20.7" viewBox="0 0 19 23" fill="none">
              <path d={svgPaths.p3cd0c6c0} stroke="url(#paint0_linear_header)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
              <defs>
                <linearGradient id="paint0_linear_header" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#092090" />
                  <stop offset="1" stopColor="#0C2ABF" />
                </linearGradient>
              </defs>
            </svg>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px', lineHeight: '24px', color: '#1a1a1a', margin: 0 }}>
              Crear Nota de Venta
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: '#697b92', margin: 0 }}>
            Gestioná tus notas de venta.
          </p>
          <button style={{
            position: 'absolute',
            top: '70px',
            right: '140px',
            padding: '15px 24px',
            backgroundColor: '#0C2ABF',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path clipRule="evenodd" d={svgPaths.p3b239480} fill="white" fillRule="evenodd" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff' }}>
              Crear Nota de Venta
            </span>
          </button>
        </div>

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
          marginBottom: '28px',
          position: 'relative'
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
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" style={{ position: 'absolute', right: '18px' }}>
            <path clipRule="evenodd" d={svgPaths.p54ce800} fill="#697B92" fillRule="evenodd" />
          </svg>
        </div>

        {/* Cliente list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {clientes.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
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
      borderRadius: active ? '10px' : '58.955px',
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

function ClienteCard({ cliente }: { cliente: any }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '24px 32px',
      minHeight: '116px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
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
            {cliente.id}
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
          {cliente.nombre}
        </p>
        <div style={{ display: 'flex', gap: '16px', marginLeft: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: '14px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Razón Social:
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#697b92'
            }}>
              {cliente.razonSocial}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: '14px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Cobros Pendientes:
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#697b92'
            }}>
              {cliente.cobrosPendientes}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <InfoField label="NIF:" value={cliente.nif} />
          <InfoField label="Dirección:" value={cliente.direccion} />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <InfoField label="Teléfono:" value={cliente.telefono} />
          <InfoField label="E-mail:" value={cliente.email} />
        </div>
      </div>

      <button style={{
        position: 'absolute',
        top: '45px',
        right: '32px',
        padding: '5px 10px',
        backgroundColor: '#0C2ABF',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d={svgPaths.pef88e00} fill="white" />
          <path clipRule="evenodd" d={svgPaths.p11994480} fill="white" fillRule="evenodd" />
        </svg>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          color: '#ffffff'
        }}>
          Seleccionar Cliente
        </span>
      </button>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '14px',
        background: 'linear-gradient(to right, #092090, #0C2ABF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#697b92'
      }}>
        {value}
      </span>
    </div>
  );
}
