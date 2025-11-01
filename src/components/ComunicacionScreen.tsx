import React, { useState } from 'react';
import svgPaths from '../imports/svg-wn90mckqhb';
import Navigation from './Navigation';
import { NotaVenta, Gasto, Documento } from '../App';

interface ComunicacionScreenProps {
  onNavigate?: (screen: string) => void;
  notasVenta?: NotaVenta[];
  gastos?: Gasto[];
  documentos?: Documento[];
}

export default function ComunicacionScreen({ onNavigate, notasVenta = [], gastos = [], documentos = [] }: ComunicacionScreenProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [exportType, setExportType] = useState<'ventas' | 'gastos' | 'todo'>('ventas');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const handleExport = () => {
    let dataToExport: any[] = [];
    let filename = '';

    switch (exportType) {
      case 'ventas':
        dataToExport = notasVenta;
        filename = `ventas_${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'gastos':
        dataToExport = gastos;
        filename = `gastos_${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'todo':
        dataToExport = { ventas: notasVenta, gastos, documentos };
        filename = `datos_completos_${new Date().toISOString().split('T')[0]}.json`;
        break;
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setShowExportModal(false);
    alert(`Exportado correctamente: ${filename}`);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = JSON.parse(e.target.result);
            console.log('Datos importados:', data);
            alert('Datos importados correctamente');
            setShowImportModal(false);
          } catch (error) {
            alert('Error al importar datos. Verifica el formato del archivo.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    setShowSyncModal(true);
    
    // Simulación de sincronización
    setTimeout(() => {
      setSyncStatus('success');
      setTimeout(() => {
        setShowSyncModal(false);
        setSyncStatus('idle');
      }, 2000);
    }, 2000);
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'white', display: 'flex' }}>
      <Navigation currentScreen="comunicacion" onNavigate={onNavigate || (() => {})} />

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
              Comunicación y Sincronización
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Ventas Registradas</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {notasVenta.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Gastos Registrados</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {gastos.length}
            </p>
          </div>
          <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Documentos</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {documentos.length}
            </p>
          </div>
        </div>

        {/* Botones de acción principales */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {/* Exportar Ventas */}
          <button
            onClick={() => setShowExportModal(true)}
            style={{
              flex: '1',
              minWidth: '150px',
              height: '120px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: 0,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d={svgPaths.p3fcbd0f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>
              Exportar<br />Datos
            </div>
          </button>

          {/* Importar Datos */}
          <button
            onClick={() => setShowImportModal(true)}
            style={{
              flex: '1',
              minWidth: '150px',
              height: '120px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: 0,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d={svgPaths.p31ca99f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>
              Importar<br />Datos
            </div>
          </button>

          {/* Sincronizar */}
          <button
            onClick={handleSync}
            style={{
              flex: '1',
              minWidth: '150px',
              height: '120px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(180deg, #092090 0%, #0C2ABF 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: 0,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="32" height="32" viewBox="0 0 22 22" fill="none">
              <path d={svgPaths.p21bd1a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>
              Sincronizar
            </div>
          </button>
        </div>

        {/* Información adicional */}
        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', margin: '0 0 16px 0' }}>
            Información de Sincronización
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
                Última sincronización:
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                Hoy, 15:30
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
                Estado de conexión:
              </span>
              <span style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                Conectado
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
                Modo de sincronización:
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                Automático
              </span>
            </div>
          </div>
        </div>

        {/* Modal de exportación */}
        {showExportModal && (
          <div
            onClick={() => setShowExportModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%'
              }}
            >
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Exportar Datos
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: '0 0 20px 0' }}>
                Selecciona qué datos deseas exportar:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { value: 'ventas', label: `Ventas (${notasVenta.length} registros)` },
                  { value: 'gastos', label: `Gastos (${gastos.length} registros)` },
                  { value: 'todo', label: 'Todos los datos' }
                ].map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: `2px solid ${exportType === option.value ? '#092090' : '#e2e8f0'}`,
                      backgroundColor: exportType === option.value ? '#f0f4ff' : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="exportType"
                      value={option.value}
                      checked={exportType === option.value as any}
                      onChange={(e) => setExportType(e.target.value as any)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1a1a1a' }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowExportModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#697b92'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExport}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(to right, #092090, #0C2ABF)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Exportar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de importación */}
        {showImportModal && (
          <div
            onClick={() => setShowImportModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%'
              }}
            >
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#1a1a1a', margin: '0 0 20px 0' }}>
                Importar Datos
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: '0 0 20px 0' }}>
                Selecciona un archivo JSON para importar los datos. Los datos actuales no se eliminarán, se agregarán los nuevos.
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowImportModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#697b92'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleImport}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(to right, #092090, #0C2ABF)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Seleccionar Archivo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de sincronización */}
        {showSyncModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
              }}
            >
              {syncStatus === 'syncing' && (
                <>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    margin: '0 auto 20px',
                    border: '4px solid #e2e8f0',
                    borderTopColor: '#092090',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                    Sincronizando datos...
                  </p>
                </>
              )}
              {syncStatus === 'success' && (
                <>
                  <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: '#10b981', margin: 0 }}>
                    ¡Sincronización completada!
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
