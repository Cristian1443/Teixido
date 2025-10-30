import Navigation from "./Navigation";
import svgPaths from "../imports/svg-498jmb6ky1";
import { useState } from 'react';
import SeleccionarClienteModal from './SeleccionarClienteModal';

interface CobrosListScreenProps {
  onNavigate: (screen: string) => void;
  onSelectCliente: (cliente: any) => void;
}

export default function CobrosListScreen({ onNavigate, onSelectCliente }: CobrosListScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nombre' | 'porcentaje' | 'fecha'>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const clientes = [
    { id: '100', nombre: 'ALVAREZ CORDERO CONSUELO', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 49.99, total: 88.99, porcentaje: 55 },
    { id: '300', nombre: 'RAMIRO FERNANDEZ', empresa: 'Restaurante La Gallina Loca', direccion: 'C/ Doctor Fleming 1 — Lugones', desde: '01-10-2014', cobrado: 1263.5, total: 1763.5, porcentaje: 72 },
    { id: '302', nombre: 'SUPERMERCADO EL PINO', empresa: 'Supermercado El Pino', direccion: 'C/ del Centro 11 — Lugones', desde: '14-10-2014', cobrado: 200.00, total: 200.00, porcentaje: 100 },
    { id: '902', nombre: 'BAR ANTONIO Y MOD', empresa: '"La Taberna"', direccion: 'Calle La Libertad 55 — Oza', desde: '15-10-2014', cobrado: 553.0, total: 753.0, porcentaje: 73 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 },
    { id: '---', nombre: 'Almacenes López S.A.', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', desde: '24-09-2010', cobrado: 0, total: 0, porcentaje: 74 }
  ];

  const totalCobrado = 2065.49;
  const totalGeneral = 2805.49;
  const porcentajeTotal = 74;

  // Filtrar clientes
  const clientesFiltrados = clientes
    .filter(cliente => 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'nombre') {
        return sortOrder === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
      } else if (sortBy === 'porcentaje') {
        return sortOrder === 'asc' ? a.porcentaje - b.porcentaje : b.porcentaje - a.porcentaje;
      } else if (sortBy === 'fecha') {
        const parseDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split('-');
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).getTime();
        };
        return sortOrder === 'asc' ? parseDate(a.desde) - parseDate(b.desde) : parseDate(b.desde) - parseDate(a.desde);
      }
      return 0;
    });

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="cobros" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '122px 140px 60px 140px' }}>
        {/* Header */}
        <div style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="16.1" height="20.7" viewBox="0 0 19 23" fill="none">
                <path d={svgPaths.p3cd0c6c0} stroke="url(#paint0_linear_cobros_header)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
                <defs>
                  <linearGradient id="paint0_linear_cobros_header" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#092090" />
                    <stop offset="1" stopColor="#0C2ABF" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px', lineHeight: '24px', color: '#1a1a1a', margin: 0 }}>
                Cobros
              </h1>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              style={{
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
                Nueva Cobranza
              </span>
            </button>
          </div>
          
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: '#697b92', margin: 0 }}>
            Gestioná tus cobros.
          </p>
        </div>

        {/* Total bar */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#1a1a1a', marginBottom: '14px' }}>
            <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Total: {totalCobrado.toFixed(2)} €
            </span>{' '}
            <span style={{ color: '#697b92' }}>de {totalGeneral.toFixed(2)} €</span>{' '}
            <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ({porcentajeTotal}%)
            </span>
          </p>
          <div style={{ width: '100%', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${porcentajeTotal}%`, 
              height: '100%', 
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              borderRadius: '15px'
            }} />
          </div>
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
          marginBottom: '32px',
          position: 'relative'
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Buscar cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Ordenar alfabéticamente */}
            <div 
              onClick={() => {
                if (sortBy === 'nombre') {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy('nombre');
                  setSortOrder('asc');
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Ordenar por nombre"
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path clipRule="evenodd" d={svgPaths.p54ce800} fill={sortBy === 'nombre' ? '#0C2ABF' : '#697B92'} fillRule="evenodd" />
              </svg>
            </div>
            {/* Ordenar por fecha */}
            <div 
              onClick={() => {
                if (sortBy === 'fecha') {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy('fecha');
                  setSortOrder('asc');
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Ordenar por fecha"
            >
              <svg width="14" height="16" viewBox="0 0 16 18" fill="none">
                <path d={svgPaths.p29b92c80} stroke={sortBy === 'fecha' ? '#0C2ABF' : '#697B92'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Ordenar por porcentaje */}
            <div 
              onClick={() => {
                if (sortBy === 'porcentaje') {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy('porcentaje');
                  setSortOrder('desc');
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Ordenar por porcentaje"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d={svgPaths.p2489f5b2} stroke={sortBy === 'porcentaje' ? '#0C2ABF' : '#697B92'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cliente list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {clientesFiltrados.length === 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '60px 24px',
              textAlign: 'center'
            }}>
              <svg width="48" height="48" viewBox="0 0 16 16" fill="none" style={{ margin: '0 auto 20px' }}>
                <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                No se encontraron clientes
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                Intenta con otros términos de búsqueda
              </p>
            </div>
          ) : (
            clientesFiltrados.map((cliente, index) => (
              <div key={index} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px',
                minHeight: '116px',
                position: 'relative'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d={svgPaths.p1b638c80} stroke="#0C1C8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '14px', color: '#697b92', margin: '0 0 10px 0' }}>
                      {cliente.id} — {cliente.nombre}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '14px', color: '#697b92', margin: '0 0 8px 0' }}>
                      {cliente.empresa}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '14px', color: '#697b92', margin: 0 }}>
                      {cliente.direccion}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '14px', color: '#1a1a1a', margin: 0 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Desde:
                    </span>{' '}
                    <span style={{ color: '#697b92' }}>{cliente.desde}</span>
                  </p>
                </div>

                {/* Progress bar */}
                <div style={{ position: 'absolute', right: '24px', top: '21px', width: '221px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px', textAlign: 'right', margin: '0 0 6px 0' }}>
                    <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {cliente.cobrado.toFixed(2)} €
                    </span>{' '}
                    <span style={{ color: '#697b92' }}>de {cliente.total.toFixed(2)} €</span>{' '}
                    <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ({cliente.porcentaje}%)
                    </span>
                  </p>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '15px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${cliente.porcentaje}%`, 
                      height: '100%', 
                      background: 'linear-gradient(to right, #092090, #0C2ABF)',
                      borderRadius: '15px'
                    }} />
                  </div>
                </div>

                {/* Visualizar button */}
                <button 
                  onClick={() => {
                    onSelectCliente(cliente);
                    onNavigate('cobros');
                  }}
                  style={{
                    position: 'absolute',
                    right: '24px',
                    bottom: '24px',
                    padding: '5px 10px',
                    backgroundColor: '#0C2ABF',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: hoveredCard === index ? 1 : 0,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path clipRule="evenodd" d={svgPaths.pe4ad2f0} fill="white" fillRule="evenodd" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#ffffff' }}>
                    Visualizar
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <SeleccionarClienteModal
          clientes={clientes}
          onClose={() => setShowModal(false)}
          onSelect={(cliente) => {
            setShowModal(false);
            onNavigate('cobros');
            onSelectCliente(cliente);
          }}
        />
      )}
    </div>
  );
}