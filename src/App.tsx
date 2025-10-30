import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import LoginWithEmail from './components/LoginWithEmail';
import Dashboard from './components/Dashboard';
import VentasMenuScreen from './components/VentasMenuScreen';
import VentasScreen from './components/VentasScreen';
import NuevaVentaScreen from './components/NuevaVentaScreen';
import VerNotaScreen from './components/VerNotaScreen';
import ResumenDiaScreen from './components/ResumenDiaScreen';
import CobrosListScreen from './components/CobrosListScreen';
import CobrosScreen from './components/CobrosScreen';
import CobrosConfirmacionScreen from './components/CobrosConfirmacionScreen';
import GastosScreen from './components/GastosScreen';
import DocumentosScreen from './components/DocumentosScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [ventaActual, setVentaActual] = useState<any>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const [cobranzaActual, setCobranzaActual] = useState<any>(null);

  const handleSaveVenta = (ventaData: any) => {
    setVentaActual(ventaData);
  };

  const handleModificarVenta = () => {
    // Volver a nueva venta con los datos cargados (para implementación futura)
    setCurrentScreen('nuevaVenta');
  };

  const handleAnularVenta = () => {
    if (ventaActual) {
      setVentaActual({ ...ventaActual, estado: 'anulada' });
    }
  };

  const handleCerrarVenta = () => {
    if (ventaActual) {
      setVentaActual({ ...ventaActual, estado: 'cerrada' });
    }
  };

  const handleSelectCliente = (cliente: any) => {
    setClienteSeleccionado(cliente);
  };

  const handleConfirmarCobranza = (cobranza: any) => {
    setCobranzaActual(cobranza);
  };

  const handleVolverACobros = () => {
    setCobranzaActual(null);
    setClienteSeleccionado(null);
  };

  // Si estamos en login o loginEmail, mostrar solo esa pantalla
  if (currentScreen === 'login') {
    return <LoginScreen onContinue={() => setCurrentScreen('loginEmail')} />;
  }

  if (currentScreen === 'loginEmail') {
    return <LoginWithEmail onContinue={() => setCurrentScreen('dashboard')} />;
  }

  // Para el resto de pantallas, mostrar con navegación
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {currentScreen === 'dashboard' && <Dashboard onNavigate={setCurrentScreen} />}
      {currentScreen === 'ventasMenu' && <VentasMenuScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'ventas' && <VentasScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'nuevaVenta' && <NuevaVentaScreen onNavigate={setCurrentScreen} onSaveVenta={handleSaveVenta} />}
      {currentScreen === 'verNota' && (
        <VerNotaScreen 
          onNavigate={setCurrentScreen} 
          ventaData={ventaActual}
          onModificar={handleModificarVenta}
          onAnular={handleAnularVenta}
          onCerrar={handleCerrarVenta}
        />
      )}
      {currentScreen === 'resumenDia' && <ResumenDiaScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'cobrosList' && <CobrosListScreen onNavigate={setCurrentScreen} onSelectCliente={handleSelectCliente} />}
      {currentScreen === 'cobros' && <CobrosScreen onNavigate={setCurrentScreen} clienteSeleccionado={clienteSeleccionado} onConfirmarCobranza={handleConfirmarCobranza} />}
      {currentScreen === 'cobrosConfirmacion' && <CobrosConfirmacionScreen onNavigate={setCurrentScreen} cobranzaActual={cobranzaActual} onVolverACobros={handleVolverACobros} />}
      {currentScreen === 'gastos' && <GastosScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'documentos' && <DocumentosScreen onNavigate={setCurrentScreen} />}
    </div>
  );
}