import React, { useState } from 'react';
import svgPaths from '../imports/svg-5evn1rh8pi';
import DetalleClienteModal from './DetalleClienteModal';
import Navigation from './Navigation';
import { Cliente as ClienteGlobal, NotaVenta, Cobro } from '../App';

interface ClienteExtendido extends ClienteGlobal {
  razonSocial?: string;
  nif?: string;
  poblacion?: string;
  provincia?: string;
  cp?: string;
  cobros?: number;
  nota?: string;
}

interface ClientesScreenProps {
  onNavigate: (screen: string) => void;
  clientes: ClienteGlobal[];
  notasVenta: NotaVenta[];
  cobros: Cobro[];
}

export default function ClientesScreen({ onNavigate, clientes: clientesGlobales, notasVenta, cobros }: ClientesScreenProps) {
  // Función mejorada para buscar cobros de un cliente (USANDO clienteId)
  const buscarCobrosDeCliente = (cliente: ClienteGlobal) => {
    return cobros.filter(c => {
      if (c.estado !== 'pendiente') return false;
      
      // Primero intentar match por ID (más confiable)
      if (c.clienteId && c.clienteId === cliente.id) {
        return true;
      }
      
      // Fallback: match por nombre (para cobros legacy sin clienteId)
      const nombreCliente = cliente.nombre.toLowerCase().trim();
      const empresaCliente = cliente.empresa.toLowerCase().trim();
      const nombreCobro = c.cliente.toLowerCase().trim();
      
      return nombreCobro.includes(nombreCliente) || 
             nombreCliente.includes(nombreCobro) ||
             nombreCobro.includes(empresaCliente) ||
             empresaCliente.includes(nombreCobro) ||
             nombreCliente.split(' ').some(palabra => 
               palabra.length > 3 && nombreCobro.includes(palabra)
             ) ||
             empresaCliente.split(' ').some(palabra => 
               palabra.length > 3 && nombreCobro.includes(palabra)
             );
    });
  };

  // Transformar clientes globales a formato extendido con datos calculados
  const clientesData: ClienteExtendido[] = clientesGlobales.map(cliente => {
    // Calcular cobros pendientes de este cliente con mejor lógica
    const cobrosPendientesArray = buscarCobrosDeCliente(cliente);
    const cobrosPendientes = cobrosPendientesArray.length;

    return {
      ...cliente,
      razonSocial: cliente.empresa,
      nif: 'N/A',
      poblacion: cliente.direccion?.split('—')[1]?.trim() || '',
      provincia: '',
      cp: '',
      cobros: cobrosPendientes,
      nota: cobrosPendientes > 0 
        ? `${cobrosPendientes} cobro${cobrosPendientes > 1 ? 's' : ''} pendiente${cobrosPendientes > 1 ? 's' : ''} de cobrar`
        : `Cliente sin cobros pendientes - Última visita: ${cliente.ultimaVisita || 'No registrada'}`
    };
  });

  const clientesDataLegacy: ClienteExtendido[] = [
  {
    id: '100',
    nombre: 'Distribuciones Rivera S.L.',
    razonSocial: 'Rivera Antonio y Hermanos',
    nif: '12345678A',
    direccion: 'Calle Mayor 12',
    poblacion: 'Oviedo',
    provincia: 'Asturias',
    cp: '33001',
    cobros: 3,
    nota: 'Prefieren visitas después de las 10h.',
    ultimaVisita: 'Hace 2 días',
    telefono: '985 123 456',
    email: 'rivera@email.com'
  },
  {
    id: '101',
    nombre: 'Almacenes López S.A.',
    razonSocial: 'López Manuel y Hermanos',
    nif: '87654321B',
    direccion: 'Calle Real 45',
    poblacion: 'Madrid',
    provincia: 'Madrid',
    cp: '28013',
    cobros: 5,
    nota: 'Cliente preferente, horario flexible.',
    ultimaVisita: 'Hace 1 día',
    telefono: '915 234 567',
    email: 'lopez@email.com'
  },
  {
    id: '102',
    nombre: 'Transportes García S.L.',
    razonSocial: 'García Antonio y Hermanos',
    nif: '11223344C',
    direccion: 'Avenida de la Constitución 78',
    poblacion: 'Sevilla',
    provincia: 'Sevilla',
    cp: '41001',
    cobros: 2,
    nota: 'Pedir cita previa por teléfono.',
    ultimaVisita: 'Hace 5 días',
    telefono: '954 345 678',
    email: 'garcia@email.com'
  },
  {
    id: '103',
    nombre: 'Panaderías Martín S.L.',
    razonSocial: 'Martín Javier y Hermanos',
    nif: '22334455D',
    direccion: 'Calle San Pedro 19',
    poblacion: 'Valencia',
    provincia: 'Valencia',
    cp: '46002',
    cobros: 4,
    nota: 'Mejor horario de visita: 8h-10h.',
    ultimaVisita: 'Hace 3 días',
    telefono: '963 456 789',
    email: 'martin@email.com'
  },
  {
    id: '104',
    nombre: 'Supermercados Central',
    razonSocial: 'Central Distribución S.A.',
    nif: '33445566E',
    direccion: 'Polígono Industrial 23',
    poblacion: 'Barcelona',
    provincia: 'Barcelona',
    cp: '08001',
    cobros: 6,
    nota: 'Solicitar badge de acceso en portería.',
    ultimaVisita: 'Hoy',
    telefono: '932 567 890',
    email: 'central@email.com'
  },
  {
    id: '105',
    nombre: 'Alimentación Sur',
    razonSocial: 'Sur Alimentos y Bebidas S.L.',
    nif: '44556677F',
    direccion: 'Calle Comercio 56',
    poblacion: 'Málaga',
    provincia: 'Málaga',
    cp: '29001',
    cobros: 1,
    nota: 'Nuevo cliente en prueba.',
    ultimaVisita: 'Hace 7 días',
    telefono: '951 678 901',
    email: 'sur@email.com'
  },
];

  // Combinar clientes globales con datos legacy (solo si no existen en globales)
  const todosLosClientes = [
    ...clientesData,
    ...clientesDataLegacy.filter(legacy => 
      !clientesData.some(global => global.id === legacy.id)
    )
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<ClienteExtendido | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvincia, setSelectedProvincia] = useState('Todas');
  const [sortBy, setSortBy] = useState<'nombre' | 'ultimaVisita' | 'cobros'>('nombre');

  const provincias = ['Todas', ...Array.from(new Set(todosLosClientes.map(c => c.provincia || 'N/A')))];

  const filteredClientes = todosLosClientes
    .filter((cliente) => {
      const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (cliente.razonSocial || cliente.empresa).toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (cliente.poblacion || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvincia = selectedProvincia === 'Todas' || cliente.provincia === selectedProvincia;
      return matchesSearch && matchesProvincia;
    })
    .sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'cobros') return (b.cobros || 0) - (a.cobros || 0);
      return 0;
    });

  const handleMasOpciones = (cliente: ClienteExtendido) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleVerDetalles = (cliente: ClienteExtendido) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleIncidencia = (cliente: ClienteExtendido) => {
    alert(`Registrar incidencia para: ${cliente.nombre}`);
  };

  const handleLlamar = (telefono: string) => {
    window.location.href = `tel:${telefono}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="clientes" onNavigate={onNavigate || (() => {})} />
      
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
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
              Clientes
            </h1>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('nuevaVenta')}
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
            Nueva Venta
          </button>
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
              {filteredClientes.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Visitados Hoy</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {clientesData.filter(c => c.ultimaVisita === 'Hoy').length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Pendientes Visita</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#f59e0b', margin: '4px 0 0 0' }}>
              {clientesData.filter(c => c.ultimaVisita && c.ultimaVisita.includes('7')).length}
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '30px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            gap: '14px',
            flex: 1,
            minWidth: '300px'
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a6fe300} stroke="#697B92" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
              }}
            />
          </div>
          
          {/* Filtro por provincia */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {provincias.map(prov => (
              <button
                key={prov}
                onClick={() => setSelectedProvincia(prov)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: selectedProvincia === prov ? 'none' : '1px solid #e2e8f0',
                  background: selectedProvincia === prov ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: selectedProvincia === prov ? 'white' : '#697b92'
                }}
              >
                {prov}
              </button>
            ))}
          </div>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '8px 16px',
              borderRadius: '30px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#697b92',
              outline: 'none'
            }}
          >
            <option value="nombre">Ordenar: A-Z</option>
            <option value="cobros">Ordenar: Cobros</option>
            <option value="ultimaVisita">Ordenar: Última Visita</option>
          </select>
        </div>

        {/* Lista de clientes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredClientes.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
                No se encontraron clientes
              </p>
            </div>
          ) : (
            filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: cliente.cobros && cliente.cobros > 0 ? '2px solid #F59F0A' : '1px solid #e2e8f0',
                  padding: '20px',
                  transition: 'all 0.2s',
                  position: 'relative'
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
                {/* Badge de cobros pendientes */}
                {cliente.cobros && cliente.cobros > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    backgroundColor: '#F59F0A',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(245, 159, 10, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M12.25 9.91667V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H4.08333M9.33333 0.583333H10.5M9.33333 4.08333H10.5M5.25 7H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {cliente.cobros} COBRO{cliente.cobros > 1 ? 'S' : ''} PENDIENTE{cliente.cobros > 1 ? 'S' : ''}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  {/* Info principal */}
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d={svgPaths.p1b638c80} stroke="#0C1C8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                      <h3 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        {cliente.nombre}
                      </h3>
                      {cliente.ultimaVisita === 'Hoy' && (
                        <span style={{
                          padding: '4px 10px',
                          backgroundColor: '#91e600',
                          borderRadius: '12px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'white'
                        }}>
                          Visitado hoy
                        </span>
                      )}
                    </div>
                    
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#697b92',
                      margin: '0 0 12px 0'
                    }}>
                      {cliente.razonSocial} • NIF: {cliente.nif}
                    </p>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M12.25 5.83333C12.25 9.91667 7 13.4167 7 13.4167C7 13.4167 1.75 9.91667 1.75 5.83333C1.75 4.44058 2.30312 3.10476 3.28769 2.12019C4.27226 1.13562 5.60807 0.583332 7 0.583332C8.39193 0.583332 9.72774 1.13562 10.7123 2.12019C11.6969 3.10476 12.25 4.44058 12.25 5.83333Z" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 7.58333C7.9665 7.58333 8.75 6.79983 8.75 5.83333C8.75 4.86683 7.9665 4.08333 7 4.08333C6.0335 4.08333 5.25 4.86683 5.25 5.83333C5.25 6.79983 6.0335 7.58333 7 7.58333Z" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#697b92' }}>
                          {cliente.poblacion}, {cliente.provincia}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M9.33333 1.75V4.08333M4.66667 1.75V4.08333M1.75 6.41667H12.25M2.91667 2.33333H11.0833C11.7277 2.33333 12.25 2.85567 12.25 3.5V11.6667C12.25 12.311 11.7277 12.8333 11.0833 12.8333H2.91667C2.27233 12.8333 1.75 12.311 1.75 11.6667V3.5C1.75 2.85567 2.27233 2.33333 2.91667 2.33333Z" stroke="#697b92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#697b92' }}>
                          {cliente.ultimaVisita}
                        </span>
                      </div>
                      {cliente.cobros && cliente.cobros > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.25 9.91667V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H4.08333M9.33333 0.583333H10.5M9.33333 4.08333H10.5M5.25 7H8.75" stroke="#F59F0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#F59F0A', fontWeight: 700 }}>
                            {cliente.cobros} cobro{cliente.cobros > 1 ? 's' : ''} pendiente{cliente.cobros > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      padding: '10px 12px', 
                      backgroundColor: cliente.cobros && cliente.cobros > 0 ? '#FFF7ED' : '#f8fafc', 
                      borderRadius: '8px',
                      borderLeft: `3px solid ${cliente.cobros && cliente.cobros > 0 ? '#F59F0A' : '#092090'}`
                    }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        <span style={{ fontWeight: 700 }}>Nota:</span>{' '}
                        <span style={{ color: '#697b92' }}>{cliente.nota}</span>
                      </p>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                    {/* Botón de cobro destacado si hay cobros pendientes */}
                    {cliente.cobros && cliente.cobros > 0 && (
                      <button
                        onClick={() => {
                          // Guardar el cliente seleccionado y navegar a cobros
                          alert(`Ir a cobrar: ${cliente.nombre} (${cliente.cobros} cobro${cliente.cobros > 1 ? 's' : ''})`);
                          onNavigate && onNavigate('cobrosList');
                        }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#F59F0A',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: '13px',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 2px 8px rgba(245, 159, 10, 0.3)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#D97706';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#F59F0A';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M12.25 9.91667V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H4.08333M9.33333 0.583333H10.5M9.33333 4.08333H10.5M5.25 7H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        COBRAR AHORA ({cliente.cobros})
                      </button>
                    )}

                    <button
                      onClick={() => handleVerDetalles(cliente)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(to right, #092090, #0C2ABF)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      Ver Detalles
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d={svgPaths.p76d5040} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <button
                        onClick={() => handleLlamar(cliente.telefono || '')}
                        title="Llamar"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M12.8333 9.91667V11.6667C12.8333 12.0203 12.6929 12.3594 12.4428 12.6095C12.1928 12.8595 11.8536 13 11.5 13C9.68333 12.8083 7.94167 12.1583 6.44167 11.1083C5.025 10.1333 3.85 8.85833 2.89167 7.44167C1.84167 5.94167 1.19167 4.2 1 2.38333C1 2.025 1.14167 1.68333 1.39167 1.43333C1.64167 1.18333 1.98333 1.04167 2.34167 1.04167H4.09167C4.41667 1.04167 4.71667 1.15833 4.96667 1.36667C5.21667 1.575 5.39167 1.86667 5.45833 2.18333C5.58333 2.81667 5.8 3.43333 6.10833 4.01667C6.19167 4.18333 6.23333 4.36667 6.23333 4.55C6.23333 4.78333 6.15833 5.00833 6.00833 5.19167L5.29167 5.91667C6.18333 7.33333 7.5 8.65 8.91667 9.54167L9.64167 8.82500C9.825 8.675 10.05 8.6 10.2833 8.6C10.4667 8.6 10.65 8.64167 10.8167 8.725C11.4 9.03333 12.0167 9.25 12.65 9.375C12.9667 9.44167 13.2583 9.61667 13.4667 9.86667C13.675 10.1167 13.7917 10.4167 13.7917 10.7417" stroke="#092090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEmail(cliente.email || '')}
                        title="Email"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.33333 2.33333H11.6667C12.3583 2.33333 12.9167 2.89167 12.9167 3.58333V10.4167C12.9167 11.1083 12.3583 11.6667 11.6667 11.6667H2.33333C1.64167 11.6667 1.08333 11.1083 1.08333 10.4167V3.58333C1.08333 2.89167 1.64167 2.33333 2.33333 2.33333Z" stroke="#092090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.9167 3.58333L7 7.58333L1.08333 3.58333" stroke="#092090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleIncidencia(cliente)}
                        title="Incidencia"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: '1px solid #fee2e2',
                          backgroundColor: '#fee2e2',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d={svgPaths.p16485400} stroke="#dc2626" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={() => onNavigate && onNavigate('nuevaVenta')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #092090',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: '#092090'
                      }}
                    >
                      Crear Nota de Venta
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Panel de Debug - Cobros */}
        {cobros.filter(c => c.estado === 'pendiente').length > 0 && (
          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            backgroundColor: '#FFF7ED', 
            border: '2px solid #F59F0A',
            borderRadius: '12px'
          }}>
            <h3 style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 700, 
              fontSize: '16px', 
              color: '#F59F0A',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.33333V14.6667M8 14.6667L14.6667 8M8 14.6667L1.33333 8" stroke="#F59F0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cobros Pendientes en el Sistema
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cobros.filter(c => c.estado === 'pendiente').map((cobro) => {
                const clienteMatch = clientesGlobales.find(cliente => 
                  buscarCobrosDeCliente(cliente).some(c => c.id === cobro.id)
                );
                return (
                  <div key={cobro.id} style={{ 
                    padding: '12px 16px', 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: clienteMatch ? '1px solid #91e600' : '1px solid #F59F0A',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 600, 
                        fontSize: '14px', 
                        color: '#1a1a1a',
                        margin: 0
                      }}>
                        {cobro.cliente}
                      </p>
                      <p style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontSize: '12px', 
                        color: '#697b92',
                        margin: '4px 0 0 0'
                      }}>
                        {clienteMatch 
                          ? `✅ Vinculado a: ${clienteMatch.nombre}` 
                          : '⚠️ Sin vincular - cliente no encontrado'}
                      </p>
                    </div>
                    <div style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontWeight: 700, 
                      fontSize: '16px', 
                      color: '#F59F0A'
                    }}>
                      {cobro.monto}
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontSize: '12px', 
              color: '#697b92',
              margin: '16px 0 0 0',
              fontStyle: 'italic'
            }}>
              💡 Los cobros vinculados a clientes muestran el número correcto en sus tarjetas. 
              Los no vinculados pueden deberse a nombres que no coinciden exactamente.
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      <DetalleClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cliente={selectedCliente}
      />
    </div>
  );
}
