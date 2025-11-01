import { useState } from 'react';
import Navigation from "./Navigation";
import svgPaths from "../imports/svg-cgihkm6xsq";
import { Cliente as ClienteGlobal, Cobro } from '../App';

interface ClienteVentas extends ClienteGlobal {
  razonSocial?: string;
  nif?: string;
  cobrosPendientes: number;
  poblacion?: string;
  provincia?: string;
}

interface VentasScreenProps {
  onNavigate: (screen: string) => void;
  clientes: ClienteGlobal[];
  cobros: Cobro[];
}

export default function VentasScreen({ onNavigate, clientes: clientesGlobales, cobros }: VentasScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'todos' | 'cobros' | 'sin-cobros'>('todos');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Función mejorada para buscar cobros de un cliente
  const buscarCobrosDeCliente = (cliente: ClienteGlobal) => {
    return cobros.filter(c => {
      if (c.estado !== 'pendiente') return false;
      
      const nombreCliente = cliente.nombre.toLowerCase().trim();
      const empresaCliente = cliente.empresa.toLowerCase().trim();
      const nombreCobro = c.cliente.toLowerCase().trim();
      
      // Buscar coincidencias más flexibles
      return nombreCobro.includes(nombreCliente) || 
             nombreCliente.includes(nombreCobro) ||
             nombreCobro.includes(empresaCliente) ||
             empresaCliente.includes(nombreCobro) ||
             // También buscar por palabras clave (ej: "Rivera" en ambos)
             nombreCliente.split(' ').some(palabra => 
               palabra.length > 3 && nombreCobro.includes(palabra)
             ) ||
             empresaCliente.split(' ').some(palabra => 
               palabra.length > 3 && nombreCobro.includes(palabra)
             );
    });
  };

  // Transformar clientes globales con datos calculados
  const clientesData: ClienteVentas[] = clientesGlobales.map(cliente => {
    const cobrosPendientesArray = buscarCobrosDeCliente(cliente);
    const cobrosPendientes = cobrosPendientesArray.length;

    return {
      ...cliente,
      razonSocial: cliente.empresa,
      nif: 'N/A',
      cobrosPendientes,
      poblacion: cliente.direccion?.split('—')[1]?.trim() || '',
      provincia: ''
    };
  });

  const clientesDataLegacy: ClienteVentas[] = [
    { id: '100', nombre: 'Distribuciones Rivera S.L.', razonSocial: 'Rivera Antonio y Hermanos', nif: 'B12345678', direccion: 'Calle Mayor 12', poblacion: 'Oviedo', provincia: 'Asturias', telefono: '+34 985 123 456', email: 'rivera@email.com', cobrosPendientes: 4 },
    { id: '101', nombre: 'Panadería El Trigo Dorado', razonSocial: 'Martín Delgado S.L.', nif: 'B12345678', direccion: 'Av. Castilla 89', poblacion: 'Oviedo', provincia: 'Asturias', telefono: '+34 985 234 789', email: 'contacto@eltrigodorado.es', cobrosPendientes: 4 },
    { id: '102', nombre: 'López Hermanos C.B.', razonSocial: 'López Hermanos C.B.', nif: 'E87654321', direccion: 'Calle Sol 22', poblacion: 'Gijón', provincia: 'Asturias', telefono: '+34 984 556 210', email: 'info@ferrelopez.es', cobrosPendientes: 2 },
    { id: '103', nombre: 'Restaurante La Gallina Loca', razonSocial: 'Ramiro Fernández S.A.', nif: 'A23456789', direccion: 'C/ Doctor Fleming 1', poblacion: 'Lugones', provincia: 'Asturias', telefono: '+34 985 441 032', email: 'reservas@gallinaloca.es', cobrosPendientes: 4 },
    { id: '104', nombre: 'Supermercado El Pino', razonSocial: 'Distribuciones El Pino S.L.', nif: 'B34567890', direccion: 'C/ del Centro 11', poblacion: 'Lugones', provincia: 'Asturias', telefono: '+34 984 223 400', email: 'contacto@superelpino.es', cobrosPendientes: 3 },
    { id: '105', nombre: 'Boutique Encanto', razonSocial: 'Carmen Torres Moda S.L.', nif: 'B56789012', direccion: 'Plaza Mayor 3', poblacion: 'Candás', provincia: 'Asturias', telefono: '+34 985 762 019', email: 'ventas@boutiqueencanto.es', cobrosPendientes: 6 },
    { id: '106', nombre: 'Almacenes López S.A.', razonSocial: 'López Manuel y Hermanos', nif: '87654321B', direccion: 'Calle Real 45', poblacion: 'Madrid', provincia: 'Madrid', telefono: '915 234 567', email: 'lopez@email.com', cobrosPendientes: 5 },
    { id: '107', nombre: 'Transportes García S.L.', razonSocial: 'García Antonio y Hermanos', nif: '11223344C', direccion: 'Avenida de la Constitución 78', poblacion: 'Sevilla', provincia: 'Sevilla', telefono: '954 345 678', email: 'garcia@email.com', cobrosPendientes: 0 },
  ];

  // Combinar clientes globales con legacy (solo si no existen)
  const todosLosClientes = [
    ...clientesData,
    ...clientesDataLegacy.filter(legacy => 
      !clientesData.some(global => global.id === legacy.id)
    )
  ];

  const filteredClientes = todosLosClientes.filter(cliente => {
    const matchesSearch = 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.razonSocial || cliente.empresa).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.nif || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.poblacion && cliente.poblacion.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cliente.provincia && cliente.provincia.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = 
      filterBy === 'todos' ||
      (filterBy === 'cobros' && cliente.cobrosPendientes > 0) ||
      (filterBy === 'sin-cobros' && cliente.cobrosPendientes === 0);

    return matchesSearch && matchesFilter;
  });

  const totalClientes = clientesData.length;
  const clientesConCobros = clientesData.filter(c => c.cobrosPendientes > 0).length;
  const totalCobrosPendientes = clientesData.reduce((sum, c) => sum + c.cobrosPendientes, 0);

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="ventas" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px clamp(20px, 5vw, 60px)', overflowY: 'auto', position: 'relative', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            <button 
              onClick={() => onNavigate('nuevaVenta')}
              style={{
                padding: '15px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
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
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', color: '#697b92', margin: 0 }}>
            Selecciona un cliente para crear una nueva nota de venta
          </p>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Clientes</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {totalClientes}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Con Cobros Pendientes</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#f59e0b', margin: '4px 0 0 0' }}>
              {clientesConCobros}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Total Cobros</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {totalCobrosPendientes}
            </p>
          </div>
        </div>

        {/* Search bar and filter */}
        <div style={{ marginBottom: '28px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '300px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '30px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            gap: '14px',
            position: 'relative'
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, razón social, NIF, ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
                flex: 1
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="#697B92" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <div 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path clipRule="evenodd" d={svgPaths.p54ce800} fill="#697B92" fillRule="evenodd" />
              </svg>

              {/* Filter dropdown */}
              {showFilterMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '8px',
                  minWidth: '200px',
                  zIndex: 10
                }}>
                  {[
                    { value: 'todos', label: 'Todos los clientes' },
                    { value: 'cobros', label: 'Con cobros pendientes' },
                    { value: 'sin-cobros', label: 'Sin cobros pendientes' }
                  ].map(option => (
                    <div
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterBy(option.value as any);
                        setShowFilterMenu(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: filterBy === option.value ? '#092090' : '#1a1a1a',
                        backgroundColor: filterBy === option.value ? '#f0f4ff' : 'transparent',
                        fontWeight: filterBy === option.value ? 600 : 400
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = filterBy === option.value ? '#f0f4ff' : '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = filterBy === option.value ? '#f0f4ff' : 'transparent'}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filterBy !== 'todos' && (
            <button
              onClick={() => setFilterBy('todos')}
              style={{
                padding: '12px 20px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#697b92',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Limpiar filtros
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="#697B92" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Results count */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: '0 0 16px 0' }}>
          Mostrando {filteredClientes.length} de {totalClientes} clientes
        </p>

        {/* Cliente list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredClientes.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92', margin: 0 }}>
                No se encontraron clientes
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBy('todos');
                  }}
                  style={{
                    marginTop: '16px',
                    padding: '10px 20px',
                    background: 'linear-gradient(to right, #092090, #0C2ABF)',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white'
                  }}
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            filteredClientes.map((cliente) => (
              <div key={cliente.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px 32px',
                minHeight: '116px',
                position: 'relative',
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
                      <span style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 600, 
                        fontSize: '12px', 
                        lineHeight: '14px', 
                        color: cliente.cobrosPendientes > 0 ? '#f59e0b' : '#10b981' 
                      }}>
                        {cliente.cobrosPendientes}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <InfoField label="NIF:" value={cliente.nif} />
                    <InfoField label="Dirección:" value={`${cliente.direccion}, ${cliente.poblacion}, ${cliente.provincia}`} />
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
                    background: 'linear-gradient(to right, #092090, #0C2ABF)',
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
            ))
          )}
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
