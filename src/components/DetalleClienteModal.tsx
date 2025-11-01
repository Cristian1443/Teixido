import React from 'react';
import svgPaths from '../imports/svg-52t0ipr5bv';

interface Cliente {
  id: string;
  nombre: string;
  razonSocial: string;
  nif: string;
  direccion: string;
  poblacion: string;
  provincia: string;
  cp: string;
  cobros: number;
}

interface DetalleClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
}

export default function DetalleClienteModal({ isOpen, onClose, cliente }: DetalleClienteModalProps) {
  if (!isOpen || !cliente) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '520px',
          height: '646px',
          backgroundColor: 'white',
          borderRadius: '20px 0 0 20px',
          boxShadow: '-202px 259px 92px 0px rgba(0,0,0,0), -129px 166px 84px 0px rgba(0,0,0,0.01), -73px 93px 71px 0px rgba(0,0,0,0.05), -32px 41px 53px 0px rgba(0,0,0,0.09), -8px 10px 29px 0px rgba(0,0,0,0.1)',
          border: '1px solid rgb(226, 232, 240)',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '46px 51px' }}>
          {/* Header con icono y nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '42px' }}>
            <div style={{ width: '18px', height: '18px', position: 'relative' }}>
              <svg
                style={{ display: 'block', width: '100%', height: '100%' }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
              >
                <path
                  d={svgPaths.p1b638c80}
                  stroke="#0C1C8D"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
              {cliente.nombre}
            </div>
          </div>

          {/* Línea separadora */}
          <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', marginBottom: '24px' }} />

          {/* Datos básicos */}
          <div style={{ marginBottom: '38px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '20px' }}>
              Datos básicos (Cliente)
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', lineHeight: '1.4' }}>
              <p style={{ margin: 0 }}>Código: {cliente.id}</p>
              <p style={{ margin: 0 }}>Tipo: Cliente</p>
              <p style={{ margin: 0 }}>CIF/NIF: {cliente.nif}</p>
              <p style={{ margin: 0 }}>Nombre 1: {cliente.nombre}</p>
              <p style={{ margin: 0 }}>Nombre 2: {cliente.razonSocial}</p>
              <p style={{ margin: 0 }}>Dirección: {cliente.direccion}</p>
              <p style={{ margin: 0 }}>Población: {cliente.poblacion}</p>
              <p style={{ margin: 0 }}>Provincia: {cliente.provincia}</p>
              <p style={{ margin: 0 }}>CP: {cliente.cp}</p>
              <p style={{ margin: 0 }}>Categoría 1: Distribuidor</p>
              <p style={{ margin: 0 }}>Categoría 2: Mayorista</p>
              <p style={{ margin: 0 }}>Observaciones: Cliente histórico, atiende pedidos grandes semanalmente</p>
            </div>
          </div>

          {/* Datos comerciales */}
          <div style={{ marginBottom: '38px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '20px' }}>
              Datos comerciales
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', lineHeight: '1.4' }}>
              <p style={{ margin: 0 }}>Cód. Tarifa: T01</p>
              <p style={{ margin: 0 }}>Cód. Tarifa Adic.: T05</p>
              <p style={{ margin: 0 }}>Cód. Tarifa Ind.: TI02</p>
              <p style={{ margin: 0 }}>Dto-1: 5%</p>
              <p style={{ margin: 0 }}>Dto-2: 2%</p>
              <p style={{ margin: 0 }}>Dto-3: 0%</p>
              <p style={{ margin: 0 }}>CCC: ES12 3456 7890 1234 5678 9012</p>
              <p style={{ margin: 0 }}>T. Imp: IVA 21%</p>
              <p style={{ margin: 0 }}>T. Ries: Riesgo medio</p>
              <p style={{ margin: 0 }}>Riesgo Imp: 50.000€</p>
              <p style={{ margin: 0 }}>Riesgo Not: 10.000€</p>
              <p style={{ margin: 0 }}>Riesgo Días: 30</p>
            </div>
          </div>

          {/* Horario */}
          <div style={{ marginBottom: '38px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '20px' }}>
              Horario
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
              <p style={{ lineHeight: '1.4', margin: 0 }}>Venta:</p>
              <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '21px' }}>
                <li style={{ margin: 0 }}>Lun, Mar, Mier, Jue, Vie → activo</li>
                <li style={{ margin: 0 }}>Hor. Venta 1: 09:00</li>
                <li style={{ margin: 0 }}>Hor. Venta 2: 13:30</li>
              </ul>
              <p style={{ lineHeight: '1.4', margin: 0, marginTop: '8px' }}>Reparto:</p>
              <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '21px' }}>
                <li style={{ margin: 0 }}>Lun, Mier, Vie → activo</li>
                <li style={{ margin: 0 }}>Hor. Rep 1: 14:00</li>
                <li style={{ margin: 0 }}>Hor. Rep 2: 17:00</li>
              </ul>
            </div>
          </div>

          {/* Contactos */}
          <div style={{ marginBottom: '38px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '20px' }}>
              Contactos
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
              <p style={{ lineHeight: '1.4', margin: 0 }}>Contactos:</p>
              <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '21px' }}>
                <li style={{ margin: 0 }}>Email: info@{cliente.nombre.toLowerCase().replace(/\s+/g, '')}.es</li>
                <li style={{ margin: 0 }}>Web: www.{cliente.nombre.toLowerCase().replace(/\s+/g, '')}.es</li>
                <li style={{ margin: 0 }}>Llamar: +34 985 123 456</li>
                <li style={{ margin: 0 }}>Mat.: +34 985 654 321</li>
              </ul>
              <p style={{ lineHeight: '1.4', margin: 0, marginTop: '8px' }}>Direcciones envío:</p>
              <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '21px' }}>
                <li style={{ margin: 0 }}>GPS: 43.3619, -5.8494</li>
                <li style={{ margin: 0 }}>Mapa: link Google Maps</li>
                <li style={{ margin: 0 }}>Mant.: Responsable de logística</li>
              </ul>
            </div>
          </div>

          {/* Notas / Competencia */}
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '20px' }}>
              Notas / Competencia
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
              <p style={{ lineHeight: '1.4', margin: 0 }}>Anotaciones:</p>
              <ul style={{ margin: 0, paddingLeft: '21px' }}>
                <li style={{ listStyle: 'disc' }}>"Cliente preferencial, pedidos grandes los lunes. Mantener stock prioritario."</li>
              </ul>
              <p style={{ lineHeight: '1.4', margin: 0, marginTop: '8px' }}>Competencia:</p>
              <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '21px' }}>
                <li style={{ margin: 0 }}>Nueva: "Distribuciones López"</li>
                <li style={{ margin: 0 }}>Modificar: "Distribuciones Central"</li>
                <li style={{ margin: 0 }}>Borrar: "Distribuciones Norte"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
