import { useState, useEffect } from 'react';

interface SyncStatusProps {
  style?: React.CSSProperties;
}

export default function SyncStatus({ style }: SyncStatusProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [pendingChanges, setPendingChanges] = useState(0);

  // Simular última sincronización (en producción vendría del localStorage o estado global)
  useEffect(() => {
    // Cargar última sync del localStorage
    const savedLastSync = localStorage.getItem('lastSync');
    if (savedLastSync) {
      setLastSync(new Date(savedLastSync));
    }
    
    // Cargar cambios pendientes
    const savedPendingChanges = localStorage.getItem('pendingChanges');
    if (savedPendingChanges) {
      setPendingChanges(parseInt(savedPendingChanges, 10));
    }
  }, []);

  const handleSyncNow = () => {
    setIsSyncing(true);
    
    // Simular sincronización (en producción sería una llamada al ERP)
    setTimeout(() => {
      const now = new Date();
      setLastSync(now);
      setPendingChanges(0);
      setIsSyncing(false);
      localStorage.setItem('lastSync', now.toISOString());
      localStorage.setItem('pendingChanges', '0');
    }, 2000);
  };

  const getTimeSinceLastSync = (): string => {
    if (!lastSync) return 'Nunca';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSync.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24);
      return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Hace ${diffHours}h ${diffMinutes}m`;
    } else if (diffMinutes > 0) {
      return `Hace ${diffMinutes} min`;
    } else {
      return 'Ahora mismo';
    }
  };

  const isOffline = !navigator.onLine;
  const needsSync = pendingChanges > 0;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      ...style
    }}>
      {/* Indicador de estado */}
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: isOffline ? '#f59f0a' : (needsSync ? '#0C2ABF' : '#07bc13'),
        boxShadow: `0 0 8px ${isOffline ? '#f59f0a' : (needsSync ? '#0C2ABF' : '#07bc13')}`
      }} />
      
      {/* Info */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          color: '#1a1a1a',
          margin: '0 0 2px 0',
          lineHeight: 1
        }}>
          {isOffline ? 'Modo Offline' : (isSyncing ? 'Sincronizando...' : (needsSync ? 'Cambios pendientes' : 'Sincronizado'))}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: '#697b92',
          margin: 0,
          lineHeight: 1
        }}>
          {isSyncing ? 'Conectando con ERP' : `Última sync: ${getTimeSinceLastSync()}`}
        </p>
      </div>

      {/* Contador de cambios pendientes */}
      {pendingChanges > 0 && !isSyncing && (
        <div style={{
          backgroundColor: '#0C2ABF',
          borderRadius: '12px',
          padding: '4px 8px',
          minWidth: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1
          }}>
            {pendingChanges}
          </p>
        </div>
      )}

      {/* Botón de sincronización manual */}
      {!isOffline && !isSyncing && (
        <button
          onClick={handleSyncNow}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '6px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Sincronizar ahora"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path 
              d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C8.89543 1 10.5784 1.92325 11.6569 3.34315M11.6569 3.34315L11 1M11.6569 3.34315L14 3" 
              stroke="#0C2ABF" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Spinner cuando está sincronizando */}
      {isSyncing && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid #e2e8f0',
          borderTop: '2px solid #0C2ABF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

// Hook para registrar cambios pendientes
export const useRegisterChange = () => {
  const registerChange = () => {
    const current = localStorage.getItem('pendingChanges');
    const newCount = (parseInt(current || '0', 10) + 1);
    localStorage.setItem('pendingChanges', String(newCount));
  };
  
  return registerChange;
};
