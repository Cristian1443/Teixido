import { useState } from 'react';
import Navigation from './Navigation';
import svgPaths from "../imports/svg-n4pwssj5i5";
import { Documento } from '../App';

interface DocumentosScreenProps {
  onNavigate: (screen: string) => void;
  documentos: Documento[];
  onAddDocumento: (doc: Documento) => void;
  onDeleteDocumento: (id: string) => void;
}

export default function DocumentosScreen({ onNavigate, documentos: documentosIniciales, onAddDocumento, onDeleteDocumento }: DocumentosScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todos');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const categorias = ['Todos', 'Catálogos', 'Contratos', 'Facturas', 'Informes', 'Otros'];

  const handleUploadDocument = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const nuevoDoc: Documento = {
          id: `DOC${String(documentosIniciales.length + 1).padStart(3, '0')}`,
          nombre: file.name,
          categoria: 'Otros',
          fecha: new Date().toLocaleDateString('es-ES'),
          tamano: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          tipo: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'doc'
        };
        onAddDocumento(nuevoDoc);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    };
    input.click();
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este documento?')) {
      onDeleteDocumento(id);
    }
  };

  const handleDownloadDocument = (nombre: string) => {
    alert(`Descargando: ${nombre}`);
  };

  const filteredDocumentos = documentosIniciales.filter(doc => {
    const matchesSearch = doc.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === 'Todos' || doc.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  const getIconForType = (tipo: 'pdf' | 'image' | 'doc') => {
    switch (tipo) {
      case 'pdf':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#dc2626"/>
            <text x="16" y="21" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Inter, sans-serif">PDF</text>
          </svg>
        );
      case 'image':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#10b981"/>
            <path d="M8 24L12 16L16 20L20 14L24 24H8Z" fill="white"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        );
      case 'doc':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#2563eb"/>
            <text x="16" y="21" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Inter, sans-serif">DOC</text>
          </svg>
        );
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="documentos" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => onNavigate('dashboard')}
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
              Documentos
            </h1>
          </div>
          <button
            onClick={handleUploadDocument}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(to right, #092090, #0C2ABF)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M0.75 11.25V12.125C0.75 12.8212 1.02656 13.4889 1.51884 13.9812C2.01113 14.4734 2.67881 14.75 3.375 14.75H12.125C12.8212 14.75 13.4889 14.4734 13.9812 13.9812C14.4734 13.4889 14.75 12.8212 14.75 12.125V11.25M11.25 4.25L7.75 0.75M7.75 0.75L4.25 4.25M7.75 0.75V11.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Subir Documento
          </button>
        </div>

        {/* Success message */}
        {showSuccessMessage && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#91e600',
            borderRadius: '8px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="white"/>
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'white', fontWeight: 600 }}>
              ¡Documento subido correctamente!
            </span>
          </div>
        )}

        {/* Search and filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
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
              <path d="M15 15L10.3333 10.3333M1 6.44444C1 7.15942 1.14082 7.86739 1.41443 8.52794C1.68804 9.18849 2.08908 9.78868 2.59464 10.2942C3.1002 10.7998 3.7004 11.2008 4.36095 11.4745C5.0215 11.7481 5.72947 11.8889 6.44444 11.8889C7.15942 11.8889 7.86739 11.7481 8.52794 11.4745C9.18849 11.2008 9.78868 10.7998 10.2942 10.2942C10.7998 9.78868 11.2008 9.18849 11.4745 8.52794C11.7481 7.86739 11.8889 7.15942 11.8889 6.44444C11.8889 5.72947 11.7481 5.0215 11.4745 4.36095C11.2008 3.7004 10.7998 3.1002 10.2942 2.59464C9.78868 2.08908 9.18849 1.68804 8.52794 1.41443C7.86739 1.14082 7.15942 1 6.44444 1C5.72947 1 5.0215 1.14082 4.36095 1.41443C3.7004 1.68804 3.1002 2.08908 2.59464 2.59464C2.08908 3.1002 1.68804 3.7004 1.41443 4.36095C1.14082 5.0215 1 5.72947 1 6.44444Z" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
                flex: 1
              }}
            />
          </div>
          
          {/* Filtro por categoría */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoria(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: selectedCategoria === cat ? 'none' : '1px solid #e2e8f0',
                  background: selectedCategoria === cat ? 'linear-gradient(to right, #092090, #0C2ABF)' : 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: selectedCategoria === cat ? 'white' : '#697b92'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          padding: '16px 20px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '10px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
              Total Documentos {selectedCategoria !== 'Todos' ? `(${selectedCategoria})` : ''}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#092090', margin: '4px 0 0 0' }}>
              {filteredDocumentos.length}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>Categorías</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1a1a1a', margin: '4px 0 0 0' }}>
              {categorias.length - 1}
            </p>
          </div>
        </div>

        {/* Documents grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredDocumentos.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto 20px' }}>
                <rect width="64" height="64" rx="12" fill="#f1f5f9"/>
                <path d="M24 44V36M24 28V20M20 32H28M40 44V36M40 28V20M36 32H44" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#697b92' }}>
                No se encontraron documentos
              </p>
            </div>
          ) : (
            filteredDocumentos.map((doc) => (
              <div 
                key={doc.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 32, 144, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ flexShrink: 0 }}>
                    {getIconForType(doc.tipo)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1a1a1a',
                      margin: '0 0 8px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {doc.nombre}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        color: '#697b92',
                        padding: '3px 8px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '10px'
                      }}>
                        {doc.categoria}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#697b92' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>{doc.fecha}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>•</span>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>{doc.tamano}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleDownloadDocument(doc.nombre)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#092090',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M11 7.66667V9.88889C11 10.1836 10.883 10.4662 10.6746 10.6746C10.4662 10.883 10.1836 11 9.88889 11H2.11111C1.81643 11 1.53381 10.883 1.32544 10.6746C1.11706 10.4662 1 10.1836 1 9.88889V7.66667M3.22222 5.44444L6 8.22222M6 8.22222L8.77778 5.44444M6 8.22222V1" stroke="#092090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Descargar
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#fee2e2',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#dc2626'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1.5 3H2.5H10.5M4 3V2C4 1.73478 4.10536 1.48043 4.29289 1.29289C4.48043 1.10536 4.73478 1 5 1H7C7.26522 1 7.51957 1.10536 7.70711 1.29289C7.89464 1.48043 8 1.73478 8 2V3M9.5 3V10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10V3H9.5Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
