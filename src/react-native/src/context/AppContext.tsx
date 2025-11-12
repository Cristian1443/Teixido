/**
 * Context Global de la Aplicación
 * Maneja el estado compartido entre pantallas
 */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Cliente, Articulo, NotaVenta, Cobro, Gasto, Documento, NotaAlmacen } from '../types';
import { storageService } from '../services/storage.service';

interface AppContextType {
  // Estado
  clientes: Cliente[];
  articulos: Articulo[];
  notasVenta: NotaVenta[];
  cobros: Cobro[];
  gastos: Gasto[];
  documentos: Documento[];
  notasAlmacen: NotaAlmacen[];
  
  // Setters
  setClientes: (clientes: Cliente[]) => void;
  setArticulos: (articulos: Articulo[]) => void;
  
  // Acciones - Ventas
  addNotaVenta: (nota: NotaVenta) => void;
  updateNotaVenta: (id: string, estado: 'pendiente' | 'cerrada' | 'anulada') => void;
  
  // Acciones - Cobros
  addCobro: (cobro: Cobro) => void;
  updateCobro: (id: string, estado: 'pendiente' | 'pagado') => void;
  
  // Acciones - Gastos
  addGasto: (gasto: Gasto) => void;
  deleteGasto: (id: string) => void;
  
  // Acciones - Documentos
  addDocumento: (doc: Documento) => void;
  deleteDocumento: (id: string) => void;
  
  // Acciones - Artículos
  updateArticulo: (id: string, cantidad: number) => void;
  
  // Acciones - Almacén
  addNotaAlmacen: (nota: NotaAlmacen) => void;
  
  // Utilidades
  loading: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [notasVenta, setNotasVenta] = useState<NotaVenta[]>([]);
  const [cobros, setCobros] = useState<Cobro[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [notasAlmacen, setNotasAlmacen] = useState<NotaAlmacen[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos guardados localmente
      const savedClientes = await storageService.getItem<Cliente[]>('clientes');
      const savedArticulos = await storageService.getItem<Articulo[]>('articulos');
      const savedNotasVenta = await storageService.getItem<NotaVenta[]>('notasVenta');
      const savedCobros = await storageService.getItem<Cobro[]>('cobros');
      const savedGastos = await storageService.getItem<Gasto[]>('gastos');
      const savedDocumentos = await storageService.getItem<Documento[]>('documentos');
      const savedNotasAlmacen = await storageService.getItem<NotaAlmacen[]>('notasAlmacen');

      if (savedClientes) setClientes(savedClientes);
      if (savedArticulos) setArticulos(savedArticulos);
      if (savedNotasVenta) setNotasVenta(savedNotasVenta);
      if (savedCobros) setCobros(savedCobros);
      if (savedGastos) setGastos(savedGastos);
      if (savedDocumentos) setDocumentos(savedDocumentos);
      if (savedNotasAlmacen) setNotasAlmacen(savedNotasAlmacen);

      // Si no hay datos, inicializar con datos por defecto
      if (!savedClientes || savedClientes.length === 0) {
        const defaultClientes = getDefaultClientes();
        setClientes(defaultClientes);
        await storageService.setItem('clientes', defaultClientes);
      }

      if (!savedArticulos || savedArticulos.length === 0) {
        const defaultArticulos = getDefaultArticulos();
        setArticulos(defaultArticulos);
        await storageService.setItem('articulos', defaultArticulos);
      }
      
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    } finally {
      setLoading(false);
    }
  };

  // VENTAS
  const addNotaVenta = async (nota: NotaVenta) => {
    const updated = [nota, ...notasVenta];
    setNotasVenta(updated);
    await storageService.setItem('notasVenta', updated);
  };

  const updateNotaVenta = async (id: string, estado: 'pendiente' | 'cerrada' | 'anulada') => {
    const updated = notasVenta.map(n => n.id === id ? { ...n, estado } : n);
    setNotasVenta(updated);
    await storageService.setItem('notasVenta', updated);
  };

  // COBROS
  const addCobro = async (cobro: Cobro) => {
    const updated = [cobro, ...cobros];
    setCobros(updated);
    await storageService.setItem('cobros', updated);
  };

  const updateCobro = async (id: string, estado: 'pendiente' | 'pagado') => {
    const updated = cobros.map(c => c.id === id ? { ...c, estado } : c);
    setCobros(updated);
    await storageService.setItem('cobros', updated);
  };

  // GASTOS
  const addGasto = async (gasto: Gasto) => {
    const updated = [gasto, ...gastos];
    setGastos(updated);
    await storageService.setItem('gastos', updated);
  };

  const deleteGasto = async (id: string) => {
    const updated = gastos.filter(g => g.id !== id);
    setGastos(updated);
    await storageService.setItem('gastos', updated);
  };

  // DOCUMENTOS
  const addDocumento = async (doc: Documento) => {
    const updated = [doc, ...documentos];
    setDocumentos(updated);
    await storageService.setItem('documentos', updated);
  };

  const deleteDocumento = async (id: string) => {
    const updated = documentos.filter(d => d.id !== id);
    setDocumentos(updated);
    await storageService.setItem('documentos', updated);
  };

  // ARTÍCULOS
  const updateArticulo = async (id: string, cantidad: number) => {
    const updated = articulos.map(a => a.id === id ? { ...a, cantidad } : a);
    setArticulos(updated);
    await storageService.setItem('articulos', updated);
  };

  // ALMACÉN
  const addNotaAlmacen = async (nota: NotaAlmacen) => {
    const updated = [nota, ...notasAlmacen];
    setNotasAlmacen(updated);
    await storageService.setItem('notasAlmacen', updated);
  };

  return (
    <AppContext.Provider
      value={{
        clientes,
        articulos,
        notasVenta,
        cobros,
        gastos,
        documentos,
        notasAlmacen,
        setClientes,
        setArticulos,
        addNotaVenta,
        updateNotaVenta,
        addCobro,
        updateCobro,
        addGasto,
        deleteGasto,
        addDocumento,
        deleteDocumento,
        updateArticulo,
        addNotaAlmacen,
        loading,
        syncStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Datos por defecto
function getDefaultClientes(): Cliente[] {
  return [
    { id: '100', nombre: 'ALVAREZ CORDERO CONSUELO', empresa: 'ALVAREZ C. CONSUELO E HIJOS', direccion: 'Barrio Catalunya — Trubia', telefono: '985 123 456', ultimaVisita: 'Hace 2 días' },
    { id: '105', nombre: 'Boutique Encanto', empresa: 'Boutique Encanto S.L.', direccion: 'C/ Comercio 45 — Oviedo', telefono: '985 234 567', ultimaVisita: 'Hoy' },
    { id: '300', nombre: 'RAMIRO FERNANDEZ', empresa: 'Restaurante La Gallina Loca', direccion: 'C/ Doctor Fleming 1 — Lugones', telefono: '985 345 678', ultimaVisita: 'Ayer' },
  ];
}

function getDefaultArticulos(): Articulo[] {
  return [
    { id: '001', nombre: 'Croqueta Jamón', cantidad: 100, categoria: 'Fritos', precio: '12,50 €', stockMinimo: 20, proveedor: 'Congelados SA' },
    { id: '002', nombre: 'Croqueta Pollo', cantidad: 85, categoria: 'Fritos', precio: '11,00 €', stockMinimo: 20, proveedor: 'Congelados SA' },
    { id: '003', nombre: 'Empanadilla Atún', cantidad: 120, categoria: 'Fritos', precio: '10,50 €', stockMinimo: 30, proveedor: 'Congelados SA' },
  ];
}
