import Navigation from "./Navigation";
import svgPaths from "../imports/svg-498jmb6ky1";
import { useState } from 'react';
import SeleccionarClienteModal from './SeleccionarClienteModal';
import { Cobro, Cliente } from '../App';

interface CobrosListScreenProps {
  onNavigate: (screen: string) => void;
  onSelectCliente: (cliente: any) => void;
  cobros: Cobro[];
  clientes: Cliente[];
}

export default function CobrosListScreen({ onNavigate, onSelectCliente, cobros, clientes }: CobrosListScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nombre' | 'monto' | 'fecha'>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Calcular totales desde los cobros globales
  const calcularTotales = () => {
    const cobradoTotal = cobros
      .filter(c => c.estado === 'pagado')
      .reduce((sum, cobro) => {
        const monto = parseFloat(cobro.monto.replace(',', '.').replace('€', '').trim() || '0');
        return sum + monto;
      }, 0);
    
    const totalGeneral = cobros.reduce((sum, cobro) => {
      const monto = parseFloat(cobro.monto.replace(',', '.').replace('€', '').trim() || '0');
      return sum + monto;
    }, 0);
    
    const porcentaje = totalGeneral > 0 ? Math.round((cobradoTotal / totalGeneral) * 100) : 0;
    
    return { cobradoTotal, totalGeneral, porcentaje };
  };

  const { cobradoTotal, totalGeneral, porcentaje } = calcularTotales();

  // Filtrar clientes que tienen cobros pendientes (para el modal) - USANDO clienteId
  const clientesConCobrosPendientes = clientes
    .filter(cliente => {
      return cobros.some(cobro => 
        cobro.estado === 'pendiente' && 
        (cobro.clienteId === cliente.id || 
         cobro.cliente.includes(cliente.nombre) || 
         cobro.cliente.includes(cliente.empresa))
      );
    })
    .map(cliente => {
      // Encontrar el cobro pendiente de este cliente (por ID preferentemente)
      const cobroPendiente = cobros.find(cobro => 
        cobro.estado === 'pendiente' && 
        (cobro.clienteId === cliente.id || 
         cobro.cliente.includes(cliente.nombre) || 
         cobro.cliente.includes(cliente.empresa))
      );
      const montoPendiente = cobroPendiente 
        ? parseFloat(cobroPendiente.monto.replace(',', '.').replace('€', '').trim() || '0')
        : 0;
      
      return {
        ...cliente,
        montoPendiente: montoPendiente,
        cobroId: cobroPendiente?.id
      };
    });

  // Transformar cobros a formato de cliente para mostrar
  const cobrosConFormato = cobros.map(cobro => {
    const monto = parseFloat(cobro.monto.replace(',', '.').replace('€', '').trim() || '0');
    return {
      id: cobro.id,
      nombre: cobro.cliente,
      empresa: cobro.cliente,
      direccion: '',
      fecha: cobro.fecha,
      monto: monto,
      estado: cobro.estado,
      estadoTexto: cobro.estado === 'pendiente' ? 'Pendiente' : 'Pagado',
      estadoColor: cobro.estado === 'pendiente' ? '#F59F0A' : '#07BC13'
    };
  });

  // Filtrar cobros
  const cobrosFiltrados = cobrosConFormato
    .filter(cobro => 
      cobro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cobro.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cobro.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'nombre') {
        return sortOrder === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
      } else if (sortBy === 'monto') {
        return sortOrder === 'asc' ? a.monto - b.monto : b.monto - a.monto;
      } else if (sortBy === 'fecha') {
        return sortOrder === 'asc' ? a.fecha.localeCompare(b.fecha) : b.fecha.localeCompare(a.fecha);
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
                gap: '8px',
                position: 'relative'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path clipRule="evenodd" d={svgPaths.p3b239480} fill="white" fillRule="evenodd" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff' }}>
                Nueva Cobranza
              </span>
              {clientesConCobrosPendientes.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#F59F0A',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  {clientesConCobrosPendientes.length}
                </span>
              )}
            </button>
          </div>
          
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.6, color: '#697b92', margin: 0 }}>
            Gestioná tus cobros.
          </p>
        </div>

        {/* Total bar - Conectado globalmente */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: '#1a1a1a', marginBottom: '14px' }}>
            <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Cobrado: {cobradoTotal.toFixed(2).replace('.', ',')} €
            </span>{' '}
            <span style={{ color: '#697b92' }}>de {totalGeneral.toFixed(2).replace('.', ',')} €</span>{' '}
            <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ({porcentaje}%)
            </span>
          </p>
          <div style={{ width: '100%', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${porcentaje}%`, 
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
            {/* Ordenar por monto */}
            <div 
              onClick={() => {
                if (sortBy === 'monto') {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy('monto');
                  setSortOrder('desc');
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Ordenar por monto"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d={svgPaths.p2489f5b2} stroke={sortBy === 'monto' ? '#0C2ABF' : '#697B92'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cobros list - Conectado globalmente */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cobrosFiltrados.length === 0 ? (
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
                No se encontraron cobros
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay cobros registrados'}
              </p>
            </div>
          ) : (
            cobrosFiltrados.map((cobro, index) => (
              <div key={cobro.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px',
                minHeight: '116px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                onSelectCliente({ nombre: cobro.nombre, empresa: cobro.empresa });
                onNavigate('cobros');
              }}
              style={{
                ...{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '24px',
                  minHeight: '116px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                },
                ...(hoveredCard === index ? {
                  boxShadow: '0 4px 12px rgba(9, 32, 144, 0.1)',
                  transform: 'translateY(-2px)'
                } : {})
              }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d={svgPaths.p1b638c80} stroke="#0C1C8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                      {cobro.id} — {cobro.nombre}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: '16px', color: '#697b92', margin: 0 }}>
                      Fecha: {cobro.fecha}
                    </p>
                  </div>
                </div>

                {/* Monto y estado */}
                <div style={{ position: 'absolute', right: '24px', top: '24px', textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px', lineHeight: '28px', margin: '0 0 8px 0' }}>
                    <span style={{ background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {cobro.monto.toFixed(2).replace('.', ',')} €
                    </span>
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: cobro.estado === 'pendiente' ? '#FEF3C7' : '#D1FAE5'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: cobro.estadoColor
                    }} />
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: cobro.estadoColor
                    }}>
                      {cobro.estadoTexto}
                    </span>
                  </div>
                </div>

                {/* Visualizar button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCliente({ nombre: cobro.nombre, empresa: cobro.empresa });
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

      {/* Modal para nueva cobranza - Solo clientes con cobros pendientes */}
      {showModal && (
        <SeleccionarClienteModal
          clientes={clientesConCobrosPendientes}
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