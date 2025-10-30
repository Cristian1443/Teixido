import { useState } from 'react';
import Navigation from "./Navigation";
import svgPaths from "../imports/svg-si67kkuii8";

interface CobrosScreenProps {
  onNavigate: (screen: string) => void;
  clienteSeleccionado?: any;
  onConfirmarCobranza?: (cobranza: any) => void;
}

export default function CobrosScreen({ onNavigate, clienteSeleccionado, onConfirmarCobranza }: CobrosScreenProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const paymentMethods = [
    'Tarjeta de Débito',
    'Tarjeta de Crédito',
    'Bizum',
    'Transferencia Bancaria'
  ];

  // Base de datos de notas pendientes por cliente
  const allPendingNotes: Record<string, any[]> = {
    '100': [
      { id: 'P001', client: '100 — ALVAREZ CORDERO CONSUELO', date: '15-10-2024', amount: 45.50 },
      { id: 'P008', client: '100 — ALVAREZ CORDERO CONSUELO', date: '20-10-2024', amount: 32.75 },
      { id: 'P015', client: '100 — ALVAREZ CORDERO CONSUELO', date: '25-10-2024', amount: 89.90 }
    ],
    '300': [
      { id: 'P002', client: '300 — RAMIRO FERNANDEZ', date: '18-10-2024', amount: 150.00 },
      { id: 'P009', client: '300 — RAMIRO FERNANDEZ', date: '22-10-2024', amount: 275.50 },
      { id: 'P016', client: '300 — RAMIRO FERNANDEZ', date: '28-10-2024', amount: 98.25 },
      { id: 'P023', client: '300 — RAMIRO FERNANDEZ', date: '01-11-2024', amount: 189.75 }
    ],
    '302': [
      { id: 'P003', client: '302 — SUPERMERCADO EL PINO', date: '19-10-2024', amount: 320.00 },
      { id: 'P010', client: '302 — SUPERMERCADO EL PINO', date: '24-10-2024', amount: 450.75 }
    ],
    '902': [
      { id: 'P004', client: '902 — BAR ANTONIO Y MOD', date: '21-10-2024', amount: 125.30 },
      { id: 'P011', client: '902 — BAR ANTONIO Y MOD', date: '26-10-2024', amount: 87.50 },
      { id: 'P018', client: '902 — BAR ANTONIO Y MOD', date: '30-10-2024', amount: 156.20 }
    ]
  };

  // Obtener las notas pendientes del cliente seleccionado
  const pendingNotes = clienteSeleccionado && clienteSeleccionado.id 
    ? (allPendingNotes[clienteSeleccionado.id] || [])
    : [];

  const toggleNote = (index: string) => {
    if (selectedNotes.includes(index)) {
      setSelectedNotes(selectedNotes.filter(n => n !== index));
    } else {
      setSelectedNotes([...selectedNotes, index]);
    }
  };

  // Calcular subtotal basado en las notas seleccionadas
  const subtotal = selectedNotes.reduce((sum, noteIndex) => {
    const note = pendingNotes[parseInt(noteIndex)];
    return sum + (note?.amount || 0);
  }, 0);

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', display: 'flex' }}>
      <Navigation currentScreen="cobros" onNavigate={onNavigate} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '80px 60px', display: 'flex', gap: '60px' }}>
        {/* Left side - Form */}
        <div style={{ width: '400px', paddingTop: '20px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#1a1a1a', marginBottom: '24px' }}>
            Cliente
          </p>

          {/* Client Selector */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '5px',
            padding: '18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            minHeight: '56px'
          }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: clienteSeleccionado ? '#1a1a1a' : '#697b92', fontWeight: clienteSeleccionado ? 600 : 400 }}>
              {clienteSeleccionado ? clienteSeleccionado.empresa : 'Seleccione un cliente'}
            </span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M0.35092 0.355454C0.575682 0.137177 0.880483 0.0145561 1.1983 0.0145561C1.51611 0.0145561 1.82091 0.137177 2.04567 0.355454L5.99251 4.18957L9.93934 0.355454C10.0499 0.24425 10.1822 0.155549 10.3284 0.0945278C10.4746 0.0335067 10.6319 0.00138738 10.791 4.39614e-05C10.9502 -0.00129945 11.108 0.0281597 11.2553 0.0867029C11.4026 0.145246 11.5364 0.231701 11.649 0.341022C11.7615 0.450344 11.8505 0.580343 11.9107 0.723434C11.971 0.866525 12.0013 1.01984 12 1.17444C11.9986 1.32904 11.9655 1.48182 11.9027 1.62387C11.8399 1.76593 11.7486 1.8944 11.6341 2.00181L6.83988 6.6591C6.61512 6.87738 6.31032 7 5.99251 7C5.67469 7 5.36989 6.87738 5.14513 6.6591L0.35092 2.00181C0.126226 1.78346 0 1.48737 0 1.17863C0 0.869894 0.126226 0.573797 0.35092 0.355454Z" fill="#697B92" />
            </svg>
          </div>

          {/* Payment Method Selector */}
          <div style={{ position: 'relative', marginBottom: '60px' }}>
            <div 
              onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '5px',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '56px'
              }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92' }}>
                {selectedPaymentMethod || 'Forma de Pago'}
              </span>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M0.35092 0.355454C0.575682 0.137177 0.880483 0.0145561 1.1983 0.0145561C1.51611 0.0145561 1.82091 0.137177 2.04567 0.355454L5.99251 4.18957L9.93934 0.355454C10.0499 0.24425 10.1822 0.155549 10.3284 0.0945278C10.4746 0.0335067 10.6319 0.00138738 10.791 4.39614e-05C10.9502 -0.00129945 11.108 0.0281597 11.2553 0.0867029C11.4026 0.145246 11.5364 0.231701 11.649 0.341022C11.7615 0.450344 11.8505 0.580343 11.9107 0.723434C11.971 0.866525 12.0013 1.01984 12 1.17444C11.9986 1.32904 11.9655 1.48182 11.9027 1.62387C11.8399 1.76593 11.7486 1.8944 11.6341 2.00181L6.83988 6.6591C6.61512 6.87738 6.31032 7 5.99251 7C5.67469 7 5.36989 6.87738 5.14513 6.6591L0.35092 2.00181C0.126226 1.78346 0 1.48737 0 1.17863C0 0.869894 0.126226 0.573797 0.35092 0.355454Z" fill="#697B92" />
              </svg>
            </div>
            
            {showPaymentDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#e2e8f0',
                borderRadius: '5px',
                overflow: 'hidden',
                zIndex: 10,
                marginTop: '4px'
              }}>
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedPaymentMethod(method);
                      setShowPaymentDropdown(false);
                    }}
                    style={{
                      padding: '14px 18px',
                      borderBottom: index < paymentMethods.length - 1 ? '1px solid rgba(105,123,146,0.22)' : 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: '#697b92'
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <button 
            onClick={() => {
              if (onConfirmarCobranza) {
                const cobranza = {
                  cliente: clienteSeleccionado,
                  notas: selectedNotes.map(index => pendingNotes[parseInt(index)]),
                  metodoPago: selectedPaymentMethod,
                  subtotal: subtotal
                };
                onConfirmarCobranza(cobranza);
              }
              onNavigate('cobrosConfirmacion');
            }}
            disabled={!clienteSeleccionado || selectedNotes.length === 0 || !selectedPaymentMethod}
            style={{
              width: '100%',
              padding: '15px 24px',
              background: (!clienteSeleccionado || selectedNotes.length === 0 || !selectedPaymentMethod) 
                ? 'linear-gradient(to right, #d4d4d4, #e2e2e2)' 
                : 'linear-gradient(to right, #8bd600, #c4ff57)',
              border: 'none',
              borderRadius: '30px',
              cursor: (!clienteSeleccionado || selectedNotes.length === 0 || !selectedPaymentMethod) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: (!clienteSeleccionado || selectedNotes.length === 0 || !selectedPaymentMethod) ? 0.6 : 1
            }}
          >
            <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
              <path d="M8.46429 0.75V4.30556C8.46429 4.5413 8.55459 4.7674 8.71534 4.93409C8.87608 5.10079 9.0941 5.19444 9.32143 5.19444H12.75M8.46429 0.75H2.46429C2.00963 0.75 1.57359 0.937301 1.2521 1.2707C0.930612 1.6041 0.75 2.05628 0.75 2.52778V14.9722C0.75 15.4437 0.930612 15.8959 1.2521 16.2293C1.57359 16.5627 2.00963 16.75 2.46429 16.75H11.0357C11.4904 16.75 11.9264 16.5627 12.2479 16.2293C12.5694 15.8959 12.75 15.4437 12.75 14.9722V5.19444M8.46429 0.75L12.75 5.19444M4.17857 13.1944H9.32143M4.17857 9.63889H9.32143" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1a1a1a' }}>
              Confirmar Cobro
            </span>
          </button>
        </div>

        {/* Right side - Pending Notes */}
        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          overflow: 'hidden',
          maxHeight: '720px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <svg width="16.1" height="20.7" viewBox="0 0 19 23" fill="none">
              <path d="M11.5 1.15V5.75C11.5 6.055 11.6212 6.34751 11.8368 6.56317C12.0525 6.77884 12.345 6.9 12.65 6.9H17.25M11.5 1.15H3.45C2.84 1.15 2.25499 1.39232 1.82365 1.82365C1.39232 2.25499 1.15 2.84 1.15 3.45V19.55C1.15 20.16 1.39232 20.745 1.82365 21.1763C2.25499 21.6077 2.84 21.85 3.45 21.85H14.95C15.56 21.85 16.145 21.6077 16.5763 21.1763C17.0077 20.745 17.25 20.16 17.25 19.55V6.9M11.5 1.15L17.25 6.9M5.75 17.25H12.65M5.75 12.65H12.65" stroke="url(#paint0_linear_notes)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_notes" x1="1.15" x2="22.1735" y1="1.15" y2="9.59941" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#092090" />
                  <stop offset="1" stopColor="#0C2ABF" />
                </linearGradient>
              </defs>
            </svg>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px', color: '#1a1a1a', margin: 0 }}>
              Marcar Notas Pendientes
            </h2>
          </div>

          {/* Notes List */}
          <div style={{ padding: '32px 26px', overflowY: 'auto', flex: 1 }}>
            {!clienteSeleccionado ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px',
                textAlign: 'center'
              }}>
                <svg width="64" height="64" viewBox="0 0 20 20" fill="none" style={{ marginBottom: '20px', opacity: 0.3 }}>
                  <path d="M4 18.05V18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H12C13.0609 14 14.0783 14.4214 14.8284 15.1716C15.5786 15.9217 16 16.9391 16 18V18.05M10 11C10.7956 11 11.5587 10.6839 12.1213 10.1213C12.6839 9.55871 13 8.79565 13 8C13 7.20435 12.6839 6.44129 12.1213 5.87868C11.5587 5.31607 10.7956 5 10 5C9.20435 5 8.44129 5.31607 7.87868 5.87868C7.31607 6.44129 7 7.20435 7 8C7 8.79565 7.31607 9.55871 7.87868 10.1213C8.44129 10.6839 9.20435 11 10 11ZM10 1C17.2 1 19 2.8 19 10C19 17.2 17.2 19 10 19C2.8 19 1 17.2 1 10C1 2.8 2.8 1 10 1Z" stroke="#697B92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                  No hay cliente seleccionado
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                  Selecciona un cliente para ver sus notas pendientes
                </p>
              </div>
            ) : pendingNotes.length === 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px',
                textAlign: 'center'
              }}>
                <svg width="64" height="64" viewBox="0 0 19 23" fill="none" style={{ marginBottom: '20px', opacity: 0.3 }}>
                  <path d="M11.5 1.15V5.75C11.5 6.055 11.6212 6.34751 11.8368 6.56317C12.0525 6.77884 12.345 6.9 12.65 6.9H17.25M11.5 1.15H3.45C2.84 1.15 2.25499 1.39232 1.82365 1.82365C1.39232 2.25499 1.15 2.84 1.15 3.45V19.55C1.15 20.16 1.39232 20.745 1.82365 21.1763C2.25499 21.6077 2.84 21.85 3.45 21.85H14.95C15.56 21.85 16.145 21.6077 16.5763 21.1763C17.0077 20.745 17.25 20.16 17.25 19.55V6.9M11.5 1.15L17.25 6.9M5.75 17.25H12.65M5.75 12.65H12.65" stroke="#697B92" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                  No hay notas pendientes
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#697b92', margin: 0 }}>
                  Este cliente no tiene notas pendientes de cobro
                </p>
              </div>
            ) : (
              pendingNotes.map((note, index) => (
                <div key={index} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '31px 18px',
                  marginBottom: '12px',
                  minHeight: '112px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ padding: '3px 5px', backgroundColor: '#91e600', borderRadius: '5px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#1a1a1a' }}>
                        {note.id}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#697b92', margin: 0 }}>
                      {note.client}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
                      Fecha:
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {note.date}
                    </span>
                  </div>

                  <p style={{ position: 'absolute', right: '18px', top: '49px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#0c1c8d', margin: 0 }}>
                    {note.amount.toFixed(2)} €
                  </p>

                  <button
                    onClick={() => toggleNote(index.toString())}
                    style={{
                      position: 'absolute',
                      right: '18px',
                      bottom: '18px',
                      width: '19px',
                      height: '19px',
                      backgroundColor: selectedNotes.includes(index.toString()) ? '#0C2ABF' : '#ffffff',
                      border: '0.559px solid #092090',
                      borderRadius: '5.588px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2.794px'
                    }}
                  >
                    {selectedNotes.includes(index.toString()) && (
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                        <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            backgroundColor: '#f3f7fd',
            borderTop: '1px solid #e2e8f0',
            padding: '32px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '50px',
              padding: '18px 24px',
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Subtotal:
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '20px', background: 'linear-gradient(to right, #092090, #0C2ABF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {subtotal.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}