import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import LoginWithEmail from './components/LoginWithEmail';
import Dashboard from './components/Dashboard';
import VentasScreen from './components/VentasScreen';
import ResumenDiaScreen from './components/ResumenDiaScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'loginEmail' | 'dashboard' | 'ventas' | 'resumenDia'>('login');

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => setCurrentScreen('login')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentScreen === 'login' ? '#0C2ABF' : '#e2e8f0',
            color: currentScreen === 'login' ? '#ffffff' : '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Pantalla Login 1
        </button>
        <button 
          onClick={() => setCurrentScreen('loginEmail')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentScreen === 'loginEmail' ? '#0C2ABF' : '#e2e8f0',
            color: currentScreen === 'loginEmail' ? '#ffffff' : '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Pantalla Login 2
        </button>
        <button 
          onClick={() => setCurrentScreen('dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentScreen === 'dashboard' ? '#0C2ABF' : '#e2e8f0',
            color: currentScreen === 'dashboard' ? '#ffffff' : '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentScreen('ventas')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentScreen === 'ventas' ? '#0C2ABF' : '#e2e8f0',
            color: currentScreen === 'ventas' ? '#ffffff' : '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Notas de Venta
        </button>
        <button 
          onClick={() => setCurrentScreen('resumenDia')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentScreen === 'resumenDia' ? '#0C2ABF' : '#e2e8f0',
            color: currentScreen === 'resumenDia' ? '#ffffff' : '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}
        >
          Resumen Día
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '1280px' }}>
        {currentScreen === 'login' && <LoginScreen />}
        {currentScreen === 'loginEmail' && <LoginWithEmail />}
        {currentScreen === 'dashboard' && <Dashboard />}
        {currentScreen === 'ventas' && <VentasScreen />}
        {currentScreen === 'resumenDia' && <ResumenDiaScreen />}
      </div>
    </div>
  );
}
