import Navigation from "./Navigation";
import svgPaths from "../imports/svg-cgihkm6xsq";

interface VentasScreenProps {
  onNavigate: (screen: string) => void;
}

export default function VentasScreen({ onNavigate }: VentasScreenProps) {
  const clientes = [
    { id: '101', nombre: 'Panadería El Trigo Dorado', razonSocial: 'Martín Delgado S.L.', nif: 'B12345678', direccion: 'Av. Castilla 89, Oviedo, Asturias', telefono: '+34 985 234 789', email: 'contacto@eltrigodorado.es', cobrosPendientes: 4 },
    { id: '102', nombre: 'López Hermanos C.B.', razonSocial: 'López Hermanos C.B.', nif: 'E87654321', direccion: 'Calle Sol 22, Gijón, Asturias', telefono: '+34 984 556 210', email: 'info@ferrelopez.es', cobrosPendientes: 2 },
    { id: '103', nombre: 'Restaurante La Gallina Loca', razonSocial: 'Ramiro Fernández S.A.', nif: 'A23456789', direccion: 'C/ Doctor Fleming 1, Lugones, Asturias', telefono: '+34 985 441 032', email: 'reservas@gallinaloca.es', cobrosPendientes: 4 },
    { id: '104', nombre: 'Supermercado El Pino', razonSocial: 'Distribuciones El Pino S.L.', nif: 'B34567890', direccion: 'C/ del Centro 11, Lugones, Asturias', telefono: '+34 984 223 400', email: 'contacto@superelpino.es', cobrosPendientes: 3 },
    { id: '105', nombre: 'Boutique Encanto', razonSocial: 'Carmen Torres Moda S.L.', nif: 'B56789012', direccion: 'Plaza Mayor 3, Candás, Asturias', telefono: '+34 985 762 019', email: 'ventas@boutiqueencanto.es', cobrosPendientes: 6 }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="ventas" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '60px 140px', overflowY: 'auto', position: 'relative' }}>
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
          <button 
            onClick={() => onNavigate('nuevaVenta')}
            style={{
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
            }}
          >
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
            <div key={cliente.id} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '24px 32px',
              minHeight: '116px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ padding: '3px 5px', backgroundColor: '#91e600', borderRadius: '5px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '10px', lineHeight: '10px', color: '#1a1a1a' }}>
                    {cliente.id}
                  </span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '14px', color: '#1a1a1a', margin: 0 }}>
                  {cliente.nombre}
                </p>
                <div style={{ display: 'flex', gap: '16px', marginLeft: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', lineHeight: '14px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Razón Social:
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#697b92' }}>
                      {cliente.razonSocial}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', lineHeight: '14px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Cobros Pendientes:
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#697b92' }}>
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

              <button 
                onClick={() => onNavigate('nuevaVenta')}
                style={{
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
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d={svgPaths.pef88e00} fill="white" />
                  <path clipRule="evenodd" d={svgPaths.p11994480} fill="white" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#ffffff' }}>
                  Nueva Nota de Venta
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', lineHeight: '14px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#697b92' }}>
        {value}
      </span>
    </div>
  );
}
