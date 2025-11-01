import React, { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-9ynjxh4cz8';
import Navigation from './Navigation';
import { printerService, PrinterConfig } from '../services/printer.service';
import { syncService } from '../services/sync.service';
import { agendaService } from '../services/agenda.service';

interface ConfiguracionScreenProps {
  onNavigate?: (screen: string) => void;
}

type ModalType = 'printer' | 'user' | 'bell' | 'sync' | 'globe' | 'database' | 'info' | null;

export default function ConfiguracionScreen({ onNavigate }: ConfiguracionScreenProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [printerSettings, setPrinterSettings] = useState<PrinterConfig>({
    type: 'bluetooth',
    deviceName: '',
    address: '',
    port: 9100,
    paperWidth: 80
  });
  const [printerConnected, setPrinterConnected] = useState(false);
  const [userProfile, setUserProfile] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@4ventas.com',
    telefono: '+34 600 123 456',
    puesto: 'Vendedor'
  });
  const [notifications, setNotifications] = useState({
    ventasNuevas: true,
    cobros: true,
    gastos: false,
    documentos: true
  });
  const [syncStatus, setSyncStatus] = useState({
    lastSync: '14/11/2024 - 10:45',
    status: 'Sincronizado',
    autoSync: true
  });
  const [language, setLanguage] = useState('Español');
  
  const opcionesConfig = [
    { id: 1, nombre: 'Impresora', descripcion: 'Configurar dispositivo de impresión', icono: 'printer' },
    { id: 2, nombre: 'Perfil de Usuario', descripcion: 'Editar información personal', icono: 'user' },
    { id: 3, nombre: 'Notificaciones', descripcion: 'Gestionar alertas y avisos', icono: 'bell' },
    { id: 4, nombre: 'Sincronización', descripcion: 'Estado de sincronización con servidor', icono: 'sync' },
    { id: 5, nombre: 'Idioma y Región', descripcion: 'Cambiar configuración regional', icono: 'globe' },
    { id: 6, nombre: 'Respaldo de Datos', descripcion: 'Exportar e importar información', icono: 'database' },
    { id: 7, nombre: 'Acerca de', descripcion: 'Versión y términos de uso', icono: 'info' },
  ];

  const handleSalir = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      onNavigate && onNavigate('login');
    }
  };

  const handleOptionClick = (icono: string) => {
    setActiveModal(icono as ModalType);
  };

  const handleExportData = () => {
    alert('Exportando datos... (Esta funcionalidad exportaría todos los datos a un archivo JSON)');
  };

  const handleImportData = () => {
    alert('Importando datos... (Esta funcionalidad permitiría importar datos desde un archivo)');
  };

  useEffect(() => {
    const config = printerService.getConfig();
    if (config) {
      setPrinterSettings(config);
    }
    setPrinterConnected(printerService.isConnected());
  }, []);

  const handlePrinterConnect = async () => {
    printerService.configure(printerSettings);
    const connected = await printerService.connect();
    setPrinterConnected(connected);
    
    if (connected) {
      alert('Impresora conectada correctamente');
    } else {
      alert('Error al conectar con la impresora. Verifique la configuración.');
    }
  };

  const handlePrinterTest = async () => {
    try {
      const success = await printerService.printTest();
      if (success) {
        alert('Página de prueba enviada a la impresora');
      } else {
        alert('Error al imprimir página de prueba');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSync = async () => {
    setSyncStatus({
      ...syncStatus,
      status: 'Sincronizando...'
    });
    
    try {
      await syncService.processQueue();
      const pendingCount = syncService.getPendingCount();
      const errorCount = syncService.getErrors().length;
      
      setSyncStatus({
        lastSync: new Date().toLocaleString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: pendingCount > 0 
          ? `${pendingCount} pendientes` 
          : errorCount > 0
            ? `${errorCount} errores`
            : 'Sincronizado',
        autoSync: syncStatus.autoSync
      });
    } catch (error) {
      setSyncStatus({
        ...syncStatus,
        status: 'Error en sincronización'
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="configuracion" onNavigate={onNavigate || (() => {})} />

      <div style={{ flex: 1, position: 'relative', height: '100%', backgroundColor: 'white', overflow: 'auto' }}>
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            minHeight: '62px',
            backgroundColor: 'white',
            borderBottom: '1px solid rgb(226, 232, 240)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '61px',
              padding: '10px 24px',
            }}
          >
            <div style={{ width: '26px', height: '26px' }} />
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: '#1a1a1a',
                textAlign: 'center',
                margin: 0,
              }}
            >
              Configuración
            </p>
            <div
              onClick={() => onNavigate && onNavigate('dashboard')}
              style={{ width: '26px', height: '26px', position: 'relative', cursor: 'pointer' }}
            >
              <svg
                style={{ display: 'block', width: '100%', height: '100%' }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 26 26"
              >
                <path
                  clipRule="evenodd"
                  d="M15.6445 7.35092C15.8628 7.57568 15.9854 7.88048 15.9854 8.1983C15.9854 8.51611 15.8628 8.82091 15.6445 9.04567L11.8104 12.9925L15.6445 16.9393C15.7558 17.0499 15.8445 17.1822 15.9055 17.3284C15.9665 17.4746 15.9986 17.6319 16 17.791C16.0013 17.9502 15.9718 18.108 15.9133 18.2553C15.8548 18.4026 15.7683 18.5364 15.659 18.649C15.5497 18.7615 15.4197 18.8505 15.2766 18.9107C15.1335 18.971 14.9802 19.0013 14.8256 19C14.671 18.9986 14.5182 18.9655 14.3761 18.9027C14.2341 18.8399 14.1056 18.7486 13.9982 18.6341L9.3409 13.8399C9.12262 13.6151 9 13.3103 9 12.9925C9 12.6747 9.12262 12.3699 9.3409 12.1451L13.9982 7.35092C14.2165 7.12623 14.5126 7 14.8214 7C15.1301 7 15.4262 7.12623 15.6445 7.35092Z"
                  fill="#697B92"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 24px 60px 24px', maxWidth: '1080px', margin: '0 auto' }}>
          {/* Opciones de configuración */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {opcionesConfig.map((opcion, index) => (
              <div
                key={opcion.id}
                onClick={() => handleOptionClick(opcion.icono)}
                style={{
                  width: '100%',
                  borderTop: '1px solid rgb(226, 232, 240)',
                  borderLeft: '1px solid rgb(226, 232, 240)',
                  borderRight: '1px solid rgb(226, 232, 240)',
                  borderBottom: index === opcionesConfig.length - 1 ? '1px solid rgb(226, 232, 240)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#1a1a1a',
                        margin: 0,
                        marginBottom: '4px',
                      }}
                    >
                      {opcion.nombre}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#697b92',
                        margin: 0,
                      }}
                    >
                      {opcion.descripcion}
                    </p>
                  </div>
                  <div style={{ width: '20px', height: '20px' }}>
                    <svg
                      style={{ display: 'block', width: '100%', height: '100%' }}
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#697b92"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            {/* Separador */}
            <div style={{ height: '20px' }} />

            {/* Opción de Salir */}
            <div
              onClick={handleSalir}
              style={{
                width: '100%',
                border: '1px solid rgb(226, 232, 240)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '18px 24px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#f59e0b',
                    margin: 0,
                  }}
                >
                  Salir
                </p>
              </div>
            </div>
          </div>

          {/* Información de la aplicación */}
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              4Ventas v1.0.0
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              © 2024 Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>

      {/* Modales */}
      {activeModal === 'printer' && (
        <ConfigModal title="Configuración de Impresora" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Impresión habilitada</span>
              <input
                type="checkbox"
                checked={printerSettings.enabled}
                onChange={(e) => setPrinterSettings({ ...printerSettings, enabled: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Impresión automática</span>
              <input
                type="checkbox"
                checked={printerSettings.autoprint}
                onChange={(e) => setPrinterSettings({ ...printerSettings, autoprint: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Número de copias
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={printerSettings.copies}
                onChange={(e) => setPrinterSettings({ ...printerSettings, copies: parseInt(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Guardar Configuración
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'user' && (
        <ConfigModal title="Perfil de Usuario" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Nombre completo
              </label>
              <input
                type="text"
                value={userProfile.nombre}
                onChange={(e) => setUserProfile({ ...userProfile, nombre: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Teléfono
              </label>
              <input
                type="tel"
                value={userProfile.telefono}
                onChange={(e) => setUserProfile({ ...userProfile, telefono: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Puesto
              </label>
              <input
                type="text"
                value={userProfile.puesto}
                onChange={(e) => setUserProfile({ ...userProfile, puesto: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'bell' && (
        <ConfigModal title="Notificaciones" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Ventas nuevas</span>
              <input
                type="checkbox"
                checked={notifications.ventasNuevas}
                onChange={(e) => setNotifications({ ...notifications, ventasNuevas: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Cobros pendientes</span>
              <input
                type="checkbox"
                checked={notifications.cobros}
                onChange={(e) => setNotifications({ ...notifications, cobros: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Gastos registrados</span>
              <input
                type="checkbox"
                checked={notifications.gastos}
                onChange={(e) => setNotifications({ ...notifications, gastos: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Documentos nuevos</span>
              <input
                type="checkbox"
                checked={notifications.documentos}
                onChange={(e) => setNotifications({ ...notifications, documentos: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Guardar Preferencias
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'sync' && (
        <ConfigModal title="Sincronización" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#166534', margin: '0 0 4px 0', fontWeight: 600 }}>
                Estado: {syncStatus.status}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#16a34a', margin: 0 }}>
                Última sincronización: {syncStatus.lastSync}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>Sincronización automática</span>
              <input
                type="checkbox"
                checked={syncStatus.autoSync}
                onChange={(e) => setSyncStatus({ ...syncStatus, autoSync: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            <button
              onClick={handleSync}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sincronizar Ahora
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'globe' && (
        <ConfigModal title="Idioma y Región" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', display: 'block', marginBottom: '8px' }}>
                Idioma de la aplicación
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px'
                }}
              >
                <option value="Español">Español</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
                <option value="Deutsch">Deutsch</option>
              </select>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#1e40af', margin: 0 }}>
                ℹ️ La aplicación se reiniciará para aplicar el cambio de idioma
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #092090, #0C2ABF)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Aplicar Cambios
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'database' && (
        <ConfigModal title="Respaldo de Datos" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #fed7aa' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a3412', margin: 0 }}>
                ⚠️ Los respaldos incluyen todas las ventas, gastos, cobros y documentos
              </p>
            </div>
            <button
              onClick={handleExportData}
              style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📥 Exportar Datos
            </button>
            <button
              onClick={handleImportData}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📤 Importar Datos
            </button>
          </div>
        </ConfigModal>
      )}

      {activeModal === 'info' && (
        <ConfigModal title="Acerca de 4Ventas" onClose={() => setActiveModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 700, color: '#092090', margin: '0 0 8px 0' }}>
                4Ventas
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: '#697b92', margin: 0 }}>
                Versión 1.0.0
              </p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                Sistema de gestión de ventas para vendedores
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#697b92', margin: 0 }}>
                © 2024 Todos los derechos reservados
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <button
                onClick={() => alert('Términos y condiciones...')}
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#092090',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                📄 Términos y Condiciones
              </button>
              <button
                onClick={() => alert('Política de privacidad...')}
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#092090',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🔒 Política de Privacidad
              </button>
              <button
                onClick={() => alert('Licencias de software...')}
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#092090',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                ⚖️ Licencias
              </button>
            </div>
          </div>
        </ConfigModal>
      )}
    </div>
  );
}

function ConfigModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: 0 }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#697b92'
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
