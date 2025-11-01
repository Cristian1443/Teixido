# 📘 Documentación Completa - 4Ventas

**Sistema de Gestión Comercial Offline-First**

**Versión:** 1.0  
**Fecha:** Noviembre 2024  
**Autor:** Equipo 4Ventas

---

## 📑 Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Componentes Principales](#4-componentes-principales)
5. [Servicios](#5-servicios)
6. [Flujo de Datos](#6-flujo-de-datos)
7. [Instalación y Configuración](#7-instalación-y-configuración)
8. [Guía de Usuario](#8-guía-de-usuario)
9. [Guía de Desarrollo](#9-guía-de-desarrollo)
10. [Integración con ERP Verial](#10-integración-con-erp-verial)
11. [Troubleshooting](#11-troubleshooting)
12. [Roadmap](#12-roadmap)

---

## 1. Descripción General

### 1.1 ¿Qué es 4Ventas?

**4Ventas** es una aplicación web progresiva (PWA) diseñada específicamente para vendedores en ruta. Permite gestionar todo el ciclo de venta desde la tablet, funcionando completamente offline y sincronizándose automáticamente con el ERP Verial cuando hay conexión disponible.

### 1.2 Características Principales

#### ✅ Gestión Comercial Completa
- **Clientes**: Alta, consulta, historial de visitas y ventas
- **Artículos**: Catálogo con control de stock y alertas
- **Ventas**: Creación de pedidos con múltiples artículos
- **Cobros**: Gestión de cobros inmediatos y pendientes
- **Gastos**: Registro de gastos operativos con categorización
- **Documentos**: Visualización y gestión de catálogos, contratos, facturas

#### ✅ Agenda Comercial
- Planificación de visitas con detección de conflictos
- Seguimiento de resultados (ventas generadas, observaciones)
- Estadísticas de conversión visitas → ventas
- Rutas diarias optimizadas

#### ✅ Funcionalidad Offline
- Funciona sin conexión a internet
- Cola de sincronización automática
- Persistencia local con localStorage
- Reintentos automáticos de operaciones fallidas

#### ✅ Integración ERP Verial
- Sincronización bidireccional de clientes y artículos
- Envío de pedidos en tiempo real
- Registro de pagos
- Manejo robusto de errores del ERP

#### ✅ Impresión Matricial
- Soporte para impresoras térmicas
- Comandos ESC/POS implementados
- Conexión vía Bluetooth, Red TCP/IP o USB
- Impresión de notas de venta, comprobantes de pago y resúmenes

### 1.3 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18 | Framework principal |
| TypeScript | 5.x | Tipado estático |
| Vite | Latest | Build tool |
| Tailwind CSS | 4.0 | Estilos (solo en componentes UI) |
| LocalStorage | - | Persistencia offline |
| REST API | - | Integración con ERP Verial |

### 1.4 Diseño y UX

- **Basado en Figma**: Todos los componentes mantienen fidelidad al diseño original
- **Estilos Inline**: Uso exclusivo de inline styles (React) para máxima portabilidad
- **Responsive**: Optimizado para tablets (diseño principal) y adaptativo a otros tamaños
- **Navegación Intuitiva**: Flujo de navegación lineal y predecible

---

## 2. Arquitectura del Sistema

### 2.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      APLICACIÓN 4VENTAS                      │
│                      (React + TypeScript)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Componentes │  │    Hooks     │  │   Servicios  │      │
│  │              │  │              │  │              │      │
│  │ - Dashboard  │  │ useERPSync   │  │ erp.service  │      │
│  │ - Ventas     │  │              │  │ sync.service │      │
│  │ - Cobros     │  │              │  │ print.service│      │
│  │ - Clientes   │  │              │  │ agenda.service│     │
│  │ - ...        │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │              │
│         └─────────────────┴─────────────────┘              │
│                           │                                 │
├───────────────────────────┼─────────────────────────────────┤
│                    CAPA DE DATOS                            │
├─────────────────────────────────────────────────────────────┤
│                           │                                 │
│         ┌─────────────────┴─────────────────┐              │
│         │                                   │              │
│   ┌─────▼─────┐                      ┌──────▼──────┐       │
│   │localStorage│                      │  ERP Verial │       │
│   │           │                      │             │       │
│   │ - Clientes│◄────Sincronización───►│ - Clientes │       │
│   │ - Artículo│      Bidireccional    │ - Artículos│       │
│   │ - Ventas  │                      │ - Pedidos  │       │
│   │ - Cola    │                      │ - Pagos    │       │
│   │ - Config  │                      │            │       │
│   └───────────┘                      └────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Patrón de Diseño: Offline-First

La aplicación sigue el patrón **Offline-First**, lo que significa:

1. **Todas las operaciones se guardan primero localmente** (localStorage)
2. **Luego se intenta sincronizar** con el ERP si hay conexión
3. **Si falla**, la operación se guarda en una cola de sincronización
4. **Reintentos automáticos** hasta que la operación se complete

```
Usuario realiza acción
        ↓
Guardar en localStorage (SIEMPRE exitoso)
        ↓
Actualizar UI inmediatamente
        ↓
Intentar sincronizar con ERP
        ↓
    ¿Exitoso?
    ↙     ↘
  SÍ       NO
   │        │
   │    Guardar en cola
   │        │
   └────────┘
        ↓
   Continuar
```

### 2.3 Flujo de Sincronización

```typescript
// 1. SINCRONIZACIÓN INICIAL (al abrir app)
useEffect(() => {
  sincronizarClientes();      // Del ERP → localStorage
  sincronizarArticulos();     // Del ERP → localStorage
}, []);

// 2. OPERACIÓN DE USUARIO (venta, cobro, gasto)
const handleSaveVenta = async (ventaData) => {
  // Guardar local
  setNotasVenta([...notasVenta, ventaData]);
  
  // Intentar enviar al ERP
  await enviarVentaAlERP(ventaData);  // Si falla, guarda en cola
};

// 3. SINCRONIZACIÓN PERIÓDICA (cada hora)
setInterval(() => {
  sincronizarClientes();
  sincronizarArticulos();
  syncService.processQueue();  // Procesar cola de pendientes
}, 3600000);
```

---

## 3. Estructura del Proyecto

### 3.1 Árbol de Directorios

```
4ventas/
│
├── App.tsx                          # Componente raíz y state management
├── README.md                        # Documentación básica
├── DOCUMENTACION_COMPLETA.md        # Este archivo
├── GUIA_TECNICA_CONEXION_ERP.md    # Guía de integración ERP
├── NOTAS_TECNICAS.md               # Notas de desarrollo
├── Attributions.md                 # Atribuciones y licencias
│
├── components/                      # Componentes de pantallas
│   ├── LoginScreen.tsx             # Login con código PIN
│   ├── LoginWithEmail.tsx          # Login alternativo con email
│   ├── Dashboard.tsx               # Panel principal con métricas
│   ├── Navigation.tsx              # Barra de navegación
│   │
│   ├── # VENTAS
│   ├── VentasMenuScreen.tsx        # Menú de opciones de ventas
│   ├── VentasScreen.tsx            # Lista de ventas
│   ├── NuevaVentaScreen.tsx        # Crear nueva venta
│   ├── VerNotaScreen.tsx           # Ver detalle de venta
│   ├── ResumenDiaScreen.tsx        # Resumen diario
│   │
│   ├── # COBROS
│   ├── CobrosListScreen.tsx        # Lista de cobros pendientes
│   ├── CobrosScreen.tsx            # Pantalla de cobro
│   ├── CobrosConfirmacionScreen.tsx# Confirmación de cobro
│   │
│   ├── # GASTOS
│   ├── GastosScreen.tsx            # Gestión de gastos
│   │
│   ├── # CLIENTES Y ARTÍCULOS
│   ├── ClientesScreen.tsx          # Lista de clientes
│   ├── ArticulosScreen.tsx         # Catálogo de artículos
│   │
│   ├── # DOCUMENTOS
│   ├── DocumentosScreen.tsx        # Gestión de documentos
│   │
│   ├── # ALMACÉN
│   ├── AlmacenScreen.tsx           # Menú de almacén
│   ├── NotasAlmacenScreen.tsx      # Notas de almacén
│   ├── ResumenStockScreen.tsx      # Resumen de stock
│   │
│   ├── # OTROS
│   ├── AgendaScreen.tsx            # Agenda de visitas
│   ├── AgendaScreenUpdated.tsx     # Agenda mejorada (nueva versión)
│   ├── ComunicacionScreen.tsx      # Centro de comunicación
│   ├── ConfiguracionScreen.tsx     # Configuración de app
│   │
│   ├── # MODALES
│   ├── SeleccionarClienteModal.tsx # Modal para elegir cliente
│   ├── SeleccionarArticuloModal.tsx# Modal para elegir artículo
│   ├── DetalleClienteModal.tsx     # Modal con detalle de cliente
│   ├── HistorialVentasModal.tsx    # Modal con historial
│   ├── AnularNotaModal.tsx         # Modal para anular nota
│   ├── CerrarOperacionModal.tsx    # Modal para cerrar operación
│   │
│   ├── # UTILIDADES
│   ├── SyncStatus.tsx              # Indicador de estado de sync
│   ├── PrintUtils.tsx              # Utilidades de impresión
│   │
│   ├── figma/                      # Componentes de sistema
│   │   └── ImageWithFallback.tsx   # Componente de imagen
│   │
│   └── ui/                         # Componentes ShadCN
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── card.tsx
│       └── ... (40+ componentes)
│
├── services/                        # Servicios de negocio
│   ├── erp.service.ts              # Integración con ERP Verial
│   ├── sync.service.ts             # Cola de sincronización
│   ├── printer.service.ts          # Servicio de impresión
│   └── agenda.service.ts           # Gestión de agenda
│
├── hooks/                           # Custom hooks
│   └── useERPSync.ts               # Hook de sincronización
│
├── imports/                         # Archivos importados de Figma
│   ├── *.tsx                       # Componentes Figma
│   └── svg-*.ts                    # SVG paths
│
├── styles/
│   └── globals.css                 # Estilos globales
│
└── guidelines/
    └── Guidelines.md               # Guías de desarrollo
```

### 3.2 Descripción de Carpetas Clave

#### `/components`
Contiene todos los componentes de UI organizados por funcionalidad. Cada pantalla es un componente independiente que recibe props para navegación y gestión de estado.

#### `/services`
Lógica de negocio y servicios externos. Implementan el patrón Singleton para mantener estado compartido entre componentes.

#### `/hooks`
Custom hooks de React para lógica reutilizable. `useERPSync` es el principal hook que gestiona la sincronización con el ERP.

#### `/imports`
Componentes y assets importados directamente de Figma. No se deben modificar manualmente ya que se regeneran en cada importación.

---

## 4. Componentes Principales

### 4.1 App.tsx - Componente Raíz

**Responsabilidades:**
- State management global de la aplicación
- Routing entre pantallas
- Gestión de datos compartidos (clientes, artículos, ventas, cobros, etc.)
- Coordinación de operaciones entre pantallas

**Estado Global:**
```typescript
// Datos
const [gastos, setGastos] = useState<Gasto[]>([...]);
const [notasVenta, setNotasVenta] = useState<NotaVenta[]>([...]);
const [cobros, setCobros] = useState<Cobro[]>([...]);
const [documentos, setDocumentos] = useState<Documento[]>([...]);
const [articulos, setArticulos] = useState<Articulo[]>([...]);
const [clientes, setClientes] = useState<Cliente[]>([...]);
const [notasAlmacen, setNotasAlmacen] = useState<NotaAlmacen[]>([...]);

// Navegación
const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');

// Datos temporales
const [ventaActual, setVentaActual] = useState<any>(null);
const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
const [cobranzaActual, setCobranzaActual] = useState<any>(null);
```

**Funciones Principales:**
- `handleAddGasto()`: Agregar nuevo gasto
- `handleAddNotaVenta()`: Agregar nueva venta
- `handleAddCobro()`: Agregar nuevo cobro
- `handleUpdateCobro()`: Actualizar estado de cobro
- `handleUpdateNotaVenta()`: Actualizar estado de nota
- `handleSaveVenta()`: Guardar venta completa (incluye sincronización ERP)

### 4.2 Dashboard.tsx

**Pantalla principal** con resumen ejecutivo del día.

**Métricas mostradas:**
- Ventas del día (monto y cantidad)
- Cobros pendientes (monto y cantidad)
- Gastos del día (monto)
- Indicador de sincronización con ERP

**Accesos rápidos:**
- Nueva Venta
- Cobros
- Gastos
- Clientes
- Artículos
- Documentos
- Agenda
- Almacén
- Comunicación
- Configuración

### 4.3 NuevaVentaScreen.tsx

**Pantalla de creación de ventas** con funcionalidad completa.

**Características:**
- Selección de cliente (buscador + modal)
- Selección de artículos con cantidades y descuentos
- Cálculo automático de subtotal, IVA y total
- Selección de forma de pago (Efectivo, Tarjeta, Bizum, Transferencia)
- **Estado de pago**: Pagado o Pendiente
  - Si es **Pendiente**: Crea automáticamente un cobro pendiente
  - Si es **Pagado**: Cierra la venta inmediatamente
- Notas adicionales
- Validaciones de stock

**Flujo:**
```
1. Seleccionar Cliente
2. Agregar Artículos (uno por uno)
   - Cantidad
   - Descuento opcional
   - Nota opcional
3. Seleccionar Forma de Pago
4. Seleccionar Estado: Pagado / Pendiente
5. Guardar
   ↓
Genera:
- NotaVenta (con estado 'cerrada' o 'pendiente')
- Cobro (con estado 'pagado' o 'pendiente')
- Sincronización con ERP (async)
```

### 4.4 CobrosScreen.tsx

**Pantalla de gestión de cobros** para clientes seleccionados.

**Funcionalidad:**
- Ver notas de venta pendientes del cliente
- Seleccionar qué notas cobrar
- Múltiples formas de pago
- Cobro parcial o total
- Impresión de comprobante

**Integración:**
- Al confirmar cobro, actualiza:
  - Estado del cobro → 'pagado'
  - Estado de la nota de venta → 'cerrada'
  - Sincroniza con ERP (registra pago)

### 4.5 ClientesScreen.tsx

**Gestión completa de clientes**.

**Características:**
- Lista de clientes con información básica
- Buscador por nombre/empresa
- Badge "COBRAR AHORA" para clientes con cobros pendientes
- Modal de detalle con:
  - Historial de ventas
  - Cobros pendientes
  - Información de contacto
  - Opción de llamar/WhatsApp

### 4.6 ArticulosScreen.tsx

**Catálogo de artículos** con control de stock.

**Características:**
- Lista de artículos con stock actual
- Alertas visuales de stock bajo (menos del stock mínimo)
- Buscador por nombre
- Filtro por categoría
- Indicador de cantidad disponible

### 4.7 AgendaScreen.tsx / AgendaScreenUpdated.tsx

**Gestión de agenda comercial**.

**Funcionalidades:**
- Crear visitas con:
  - Cliente
  - Fecha y hora
  - Tipo (planificada, visita fría, seguimiento, urgente)
  - Prioridad (baja, media, alta)
  - Notas
- Vista día / semana
- Completar visitas con resultado:
  - ¿Se realizó?
  - ¿Se generó venta? (enlace a nota)
  - Observaciones
  - Próximo contacto
- Estadísticas de conversión
- Detección de conflictos de horario

**Nota:** `AgendaScreenUpdated.tsx` es la versión mejorada que debe reemplazar a `AgendaScreen.tsx`.

### 4.8 ConfiguracionScreen.tsx

**Configuración de la aplicación**.

**Opciones:**
- **Impresora**:
  - Tipo (Bluetooth, Red, USB)
  - Dirección/puerto
  - Prueba de impresión
- **Sincronización**:
  - Estado actual
  - Operaciones pendientes
  - Errores de sincronización
  - Botón de sincronización manual
- **Datos**:
  - Exportar datos
  - Importar datos
  - Limpiar caché

---

## 5. Servicios

### 5.1 erp.service.ts

**Servicio de integración con ERP Verial**.

#### Configuración

```typescript
const ERP_BASE_URL = 'http://x.verial.org:8000/WcfServiceLibraryVerial';
let SESSION_ID = '18';
const ERP_ENABLED = false;  // true para producción
```

#### Funciones Principales

| Función | Descripción | Retorno |
|---------|-------------|---------|
| `getClientes()` | Obtener lista de clientes | `ClienteERP[]` |
| `getArticulos()` | Obtener catálogo de artículos | `ArticuloERP[]` |
| `crearDocumentoVenta()` | Crear pedido/venta | `{ InfoError, Id, Numero }` |
| `registrarPago()` | Registrar pago de documento | `{ InfoError, Id }` |
| `crearCliente()` | Crear nuevo cliente | `{ InfoError, Id }` |
| `getMetodosPago()` | Obtener métodos de pago | `MetodoPagoERP[]` |
| `getStockArticulos()` | Obtener stock de artículos | `Stock[]` |
| `getHistorialPedidos()` | Historial de pedidos de cliente | `Pedido[]` |

#### Modo Offline vs Online

**Con `ERP_ENABLED = false`:**
- Usa datos mock predefinidos
- 7 clientes de prueba
- 10 artículos de prueba
- Retorna respuestas simuladas

**Con `ERP_ENABLED = true`:**
- Conecta al servidor ERP real
- Usa endpoints REST del servicio Verial
- Maneja errores y caídas de conexión

#### Mappers

Convierte estructuras del ERP a formato local:

```typescript
mapearClienteERPaLocal(clienteERP: ClienteERP) → Cliente
mapearArticuloERPaLocal(articuloERP: ArticuloERP) → Articulo
```

### 5.2 sync.service.ts

**Servicio de cola de sincronización** con reintentos automáticos.

#### Características

- Cola persistente en localStorage
- Reintentos automáticos (máx. 3)
- Manejo de códigos de error específicos de Verial
- Procesamiento asíncrono no bloqueante

#### Interfaz de Operación

```typescript
interface SyncOperation {
  id: string;
  type: 'venta' | 'pago' | 'cliente' | 'gasto';
  data: any;
  timestamp: number;
  retries: number;
  lastError?: string;
  status: 'pending' | 'syncing' | 'success' | 'error';
}
```

#### API Principal

```typescript
// Agregar operación a cola
syncService.addToQueue(type: 'venta', data: ventaData): string

// Procesar todas las operaciones pendientes
await syncService.processQueue(): Promise<void>

// Obtener estado
syncService.getQueue(): SyncOperation[]
syncService.getErrors(): SyncError[]
syncService.getPendingCount(): number

// Limpiar errores
syncService.clearErrors(): void
```

#### Códigos de Error Manejados

| Código | Descripción | Acción |
|--------|-------------|--------|
| 0 | Operación exitosa | Eliminar de cola |
| 12 | Error creando documento | Mantener en cola |
| 13 | Cliente no encontrado | Mantener en cola |
| 14 | Artículo no encontrado | Mantener en cola |
| -1 | Error de conexión | Reintentar |

#### Uso Recomendado

```typescript
// Al guardar una venta
const ventaId = syncService.addToQueue('venta', ventaData);

// Procesar en background cada 5 minutos
setInterval(async () => {
  await syncService.processQueue();
  const pendientes = syncService.getPendingCount();
  if (pendientes > 0) {
    console.log(`${pendientes} operaciones pendientes`);
  }
}, 300000);
```

### 5.3 printer.service.ts

**Servicio de impresión matricial** con comandos ESC/POS.

#### Configuración

```typescript
interface PrinterConfig {
  type: 'bluetooth' | 'network' | 'usb';
  address?: string;         // Para network
  port?: number;            // Para network
  deviceName?: string;      // Para bluetooth
  paperWidth?: number;      // Ancho en caracteres
}
```

#### API Principal

```typescript
// Configurar impresora
printerService.configure(config: PrinterConfig): void

// Conectar
await printerService.connect(): Promise<boolean>

// Imprimir
await printerService.print(job: PrintJob): Promise<boolean>

// Prueba
await printerService.printTest(): Promise<boolean>

// Estado
printerService.isConnected(): boolean
```

#### Tipos de Impresión

```typescript
interface PrintJob {
  type: 'venta' | 'cobro' | 'resumen';
  data: any;
  copies?: number;  // Número de copias
}
```

#### Comandos ESC/POS Implementados

- `ESC @`: Inicializar impresora
- `ESC a n`: Alineación (0=izq, 1=centro, 2=der)
- `ESC E n`: Negrita (0=off, 1=on)
- `0x0A`: Salto de línea
- `GS V A 0`: Corte de papel

#### Integración Pendiente

Para **producción**, implementar los métodos de envío:
- `sendViaBluetooth()`: Usar Web Bluetooth API
- `sendViaNetwork()`: Usar servidor proxy o WebSocket
- `sendViaUSB()`: Usar Web Serial API

**Referencias:**
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

### 5.4 agenda.service.ts

**Servicio de gestión de agenda comercial**.

#### Modelo de Datos

```typescript
interface Visita {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fecha: string;              // YYYY-MM-DD
  hora: string;               // HH:MM
  duracionEstimada?: number;  // minutos
  tipo: 'planificada' | 'visita_fria' | 'seguimiento' | 'urgente';
  estado: 'pendiente' | 'completada' | 'cancelada' | 'reprogramada';
  prioridad: 'baja' | 'media' | 'alta';
  notas?: string;
  direccion?: string;
  objetivos?: string[];
  resultadoVisita?: {
    realizada: boolean;
    ventaGenerada: boolean;
    notaVentaId?: string;
    observaciones?: string;
    proximoContacto?: string;
  };
}
```

#### API Principal

```typescript
// CRUD
agendaService.crearVisita(data): Visita
agendaService.actualizarVisita(id, cambios): Visita
agendaService.eliminarVisita(id): boolean
agendaService.getVisita(id): Visita

// Consultas
agendaService.getVisitasPorFecha(fecha): Visita[]
agendaService.getVisitasPorCliente(clienteId): Visita[]
agendaService.getVisitasPendientes(): Visita[]
agendaService.getVisitasHoy(): Visita[]
agendaService.getVisitasSemana(): Visita[]

// Operaciones
agendaService.completarVisita(id, resultado): Visita
agendaService.reprogramarVisita(id, fecha, hora): Visita
agendaService.verificarConflicto(fecha, hora, duracion): boolean
agendaService.sugerirHorario(fecha, duracion): string

// Análisis
agendaService.getEstadisticas(desde?, hasta?): Stats
agendaService.getRutaDia(fecha): RutaDiaria

// Exportar/Importar
agendaService.exportarAgenda(): string
agendaService.importarAgenda(data): boolean
```

#### Estadísticas

```typescript
interface Stats {
  total: number;
  completadas: number;
  pendientes: number;
  canceladas: number;
  reprogramadas: number;
  conVenta: number;
  sinVenta: number;
  tasaExito: string;  // % de conversión
}
```

---

## 6. Flujo de Datos

### 6.1 Flujo de Creación de Venta

```
┌────────────────────────────────────────────────────────────┐
│ USUARIO: Nueva Venta                                       │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 1. NuevaVentaScreen                                        │
│    - Seleccionar Cliente                                   │
│    - Agregar Artículos                                     │
│    - Seleccionar Forma de Pago                             │
│    - Seleccionar Estado: Pagado / Pendiente                │
└────────────────────────────────────────────────────────────┘
                            ↓
                     [Guardar Venta]
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 2. App.tsx → handleSaveVenta()                             │
│    a) Crear NotaVenta (local)                              │
│    b) Crear Cobro (local)                                  │
│       - Estado según estadoPago                            │
│    c) Actualizar state                                     │
│    d) Actualizar stock de artículos                        │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 3. Sincronización con ERP (async)                          │
│    useERPSync → enviarVentaAlERP()                         │
│    ├─ Construir DocumentoCliente                           │
│    ├─ await crearDocumentoVenta(documento)                 │
│    └─ Si falla: guardarParaSincronizarDespues()            │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 4. Impresión (opcional)                                    │
│    printerService.print({ type: 'venta', data })           │
└────────────────────────────────────────────────────────────┘
                            ↓
                   [Navegación: verNota]
```

### 6.2 Flujo de Cobro

```
┌────────────────────────────────────────────────────────────┐
│ USUARIO: Ver Cobros Pendientes                             │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 1. CobrosListScreen                                        │
│    - Mostrar clientes con badge "COBRAR AHORA"            │
│    - Filtrar por clientes con cobros pendientes            │
└────────────────────────────────────────────────────────────┘
                            ↓
                [Seleccionar Cliente]
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 2. CobrosScreen                                            │
│    - Mostrar notas pendientes del cliente                  │
│    - Seleccionar qué notas cobrar                          │
│    - Introducir forma de pago                              │
│    - Calcular total                                        │
└────────────────────────────────────────────────────────────┘
                            ↓
                    [Confirmar Cobro]
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 3. App.tsx → handleConfirmarCobranza()                     │
│    a) Actualizar estado cobro → 'pagado'                   │
│    b) Actualizar notas asociadas → 'cerrada'               │
│    c) Actualizar state                                     │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 4. Sincronización con ERP                                  │
│    useERPSync → registrarPagoEnERP()                       │
│    ├─ Construir NuevoPago                                  │
│    ├─ await registrarPago(pago)                            │
│    └─ Si falla: guardarParaSincronizarDespues()            │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│ 5. Impresión de Comprobante                                │
│    printerService.print({ type: 'cobro', data })           │
└────────────────────────────────────────────────────────────┘
                            ↓
            [Navegación: cobrosConfirmacion]
```

### 6.3 Flujo de Sincronización

```
┌─────────────────────────────────────────────────────────┐
│ EVENTO: Iniciar App / Sincronización Periódica         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ useERPSync → sincronizarClientes()                      │
│ ├─ await getClientes()                                  │
│ ├─ mapearClienteERPaLocal()                             │
│ ├─ setClientes(clientesLocales)                         │
│ └─ Si falla: usar datos mock                            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ useERPSync → sincronizarArticulos()                     │
│ ├─ await getArticulos()                                 │
│ ├─ mapearArticuloERPaLocal()                            │
│ ├─ setArticulos(articulosLocales)                       │
│ └─ Si falla: usar datos mock                            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│ syncService → processQueue()                            │
│ ├─ Obtener operaciones pendientes                       │
│ ├─ Para cada operación:                                 │
│ │   ├─ Incrementar retries                              │
│ │   ├─ Intentar sincronizar                             │
│ │   ├─ Si exitoso: eliminar de cola                     │
│ │   └─ Si falla: guardar error                          │
│ └─ Guardar estado en localStorage                       │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Instalación y Configuración

### 7.1 Requisitos Previos

- Node.js >= 16.x
- npm >= 8.x
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Tablet o dispositivo con pantalla >= 768px (recomendado)

### 7.2 Instalación

```bash
# 1. Clonar repositorio (si aplica)
git clone [URL_REPOSITORIO]
cd 4ventas

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en navegador
# La aplicación se abrirá automáticamente en http://localhost:5173
```

### 7.3 Compilación para Producción

```bash
# Compilar
npm run build

# La carpeta /dist contendrá los archivos optimizados
# Servir con cualquier servidor estático:

# Opción 1: Servidor local
npm install -g serve
serve -s dist

# Opción 2: Desplegar en servidor web
# Copiar contenido de /dist a tu servidor
```

### 7.4 Configuración del ERP

**Ver guía completa en:** [GUIA_TECNICA_CONEXION_ERP.md](GUIA_TECNICA_CONEXION_ERP.md)

**Pasos rápidos:**

1. Abrir `/services/erp.service.ts`

2. Configurar:
```typescript
const ERP_BASE_URL = 'http://[IP_SERVIDOR]:8000/WcfServiceLibraryVerial';
let SESSION_ID = '[TU_SESSION_ID]';
const ERP_ENABLED = true;  // Cambiar de false a true
```

3. Reiniciar aplicación

4. Verificar logs en consola (F12)

### 7.5 Configuración de Impresora

1. Ir a **Configuración** en la app

2. Sección "Impresora"

3. Seleccionar tipo:
   - **Bluetooth**: Introducir nombre del dispositivo
   - **Red**: Introducir IP y puerto
   - **USB**: Conectar impresora

4. Clic en "Conectar"

5. Probar impresión

**Nota:** Para producción, requiere implementar los métodos de conexión específicos del SDK del fabricante.

---

## 8. Guía de Usuario

### 8.1 Login

Al iniciar la aplicación:

**Opción 1: Login con Código**
- Introducir código de 4 dígitos
- Presionar "Continuar"

**Opción 2: Login con Email**
- Clic en "Continuar con Email"
- Introducir email y contraseña
- Presionar "Iniciar sesión"

### 8.2 Dashboard

Pantalla principal con resumen del día:

- **Ventas**: Monto total y cantidad de ventas
- **Cobros Pendientes**: Monto y cantidad pendiente
- **Gastos**: Total gastado en el día
- **Estado de Sincronización**: Indicador verde/rojo

**Acciones rápidas:**
- Nueva Venta → Crear pedido
- Cobros → Gestionar cobros pendientes
- Clientes → Ver y buscar clientes
- Artículos → Consultar catálogo
- ...

### 8.3 Crear Nueva Venta

1. **Dashboard → Ventas → Nueva Venta**

2. **Seleccionar Cliente:**
   - Clic en "Seleccionar Cliente"
   - Buscar por nombre o empresa
   - Seleccionar de la lista

3. **Agregar Artículos:**
   - Clic en "Agregar Artículo"
   - Seleccionar artículo del catálogo
   - Introducir cantidad
   - (Opcional) Aplicar descuento
   - (Opcional) Agregar nota
   - Confirmar

4. **Repetir** para agregar más artículos

5. **Configurar Pago:**
   - Seleccionar Forma de Pago (Efectivo, Tarjeta, etc.)
   - Seleccionar Estado:
     - **Pagado**: El cliente pagó en este momento
     - **Pendiente**: El cliente pagará después

6. **Guardar Venta**

**Resultado:**
- Se crea la nota de venta
- Se genera un cobro (pagado o pendiente según lo seleccionado)
- Se sincroniza con el ERP automáticamente
- Se actualiza el stock

### 8.4 Gestionar Cobros

1. **Dashboard → Cobros**

2. **Ver lista de clientes**
   - Los clientes con cobros pendientes muestran badge "COBRAR AHORA"

3. **Seleccionar cliente**

4. **Pantalla de Cobro:**
   - Ver notas pendientes del cliente
   - Seleccionar qué notas cobrar (checkbox)
   - Ver monto total
   - Seleccionar forma de pago

5. **Confirmar Cobro**

6. **Pantalla de Confirmación:**
   - Ver resumen del cobro
   - Imprimir comprobante (si impresora configurada)

**Resultado:**
- El cobro cambia a estado "pagado"
- Las notas asociadas se cierran
- Se registra el pago en el ERP

### 8.5 Registrar Gasto

1. **Dashboard → Gastos**

2. **Clic en "+" (Nuevo Gasto)**

3. **Completar formulario:**
   - Nombre del gasto
   - Categoría (Combustible, Comida, Otros)
   - Monto
   - (Opcional) Adjuntar foto del ticket

4. **Guardar**

**Resultado:**
- El gasto se agrega a la lista
- Se actualiza el total de gastos del día
- Se sincroniza con el ERP

### 8.6 Consultar Clientes

1. **Dashboard → Clientes**

2. **Buscar cliente:**
   - Usar barra de búsqueda
   - O scroll en la lista

3. **Ver detalle:**
   - Clic en un cliente
   - Ver información de contacto
   - Ver historial de ventas
   - Ver cobros pendientes

4. **Acciones:**
   - Llamar (abre marcador)
   - WhatsApp (abre chat)
   - Ver Historial de Ventas

### 8.7 Consultar Artículos

1. **Dashboard → Artículos**

2. **Buscar artículo:**
   - Usar barra de búsqueda
   - O filtrar por categoría

3. **Ver información:**
   - Stock actual
   - Precio
   - Categoría
   - Stock mínimo

4. **Alertas:**
   - Artículos con stock bajo aparecen destacados en rojo

### 8.8 Planificar Visitas (Agenda)

1. **Dashboard → Agenda**

2. **Crear Visita:**
   - Clic en "Nueva Visita"
   - Seleccionar cliente
   - Fecha y hora
   - Tipo (Planificada, Visita fría, Seguimiento, Urgente)
   - Prioridad
   - Notas

3. **Ver Visitas:**
   - Vista Día: Visitas del día actual
   - Vista Semana: Visitas de los próximos 7 días

4. **Completar Visita:**
   - Clic en visita pendiente
   - Marcar como completada
   - ¿Se realizó?
   - ¿Se generó venta? (vincular con nota)
   - Observaciones
   - Próximo contacto

5. **Estadísticas:**
   - Ver tasa de conversión
   - Total de visitas
   - Visitas completadas vs pendientes

### 8.9 Ver Resumen del Día

1. **Dashboard → Resumen del Día**

2. **Métricas mostradas:**
   - Total de ventas (monto y cantidad)
   - Total de gastos
   - Total de cobros realizados
   - Cobros pendientes
   - Balance neto del día

3. **Detalles:**
   - Lista de todas las ventas
   - Lista de todos los gastos
   - Lista de cobros

4. **Imprimir:**
   - Opción de imprimir resumen completo

### 8.10 Gestionar Documentos

1. **Dashboard → Documentos**

2. **Ver lista de documentos:**
   - Catálogos
   - Contratos
   - Facturas
   - Informes
   - Otros

3. **Buscar:**
   - Por nombre
   - Por categoría

4. **Acciones:**
   - Ver documento (abre PDF)
   - Descargar
   - Compartir
   - Eliminar

5. **Subir nuevo documento:**
   - Clic en "+"
   - Seleccionar archivo
   - Elegir categoría
   - Guardar

---

## 9. Guía de Desarrollo

### 9.1 Estructura de un Componente

Todos los componentes siguen una estructura similar:

```typescript
import React, { useState } from 'react';
// Importar tipos si es necesario
import { Cliente, Cobro } from '../App';

interface MiComponenteProps {
  onNavigate: (screen: string) => void;
  // Otros props
}

export default function MiComponente({ onNavigate }: MiComponenteProps) {
  // Estado local
  const [estado, setEstado] = useState(valorInicial);

  // Handlers
  const handleAccion = () => {
    // Lógica
  };

  // Render
  return (
    <div style={{ /* inline styles */ }}>
      {/* JSX */}
    </div>
  );
}
```

### 9.2 Convenciones de Código

**Estilos:**
- Usar **inline styles** exclusivamente (no Tailwind en componentes custom)
- Mantener consistencia con el diseño de Figma
- Usar variables para colores comunes:
  ```typescript
  const colors = {
    primary: '#1A73E8',
    secondary: '#34A853',
    danger: '#EA4335',
    background: '#F8F9FA',
    text: '#202124'
  };
  ```

**Nomenclatura:**
- Componentes: `PascalCase` (ej: `NuevaVentaScreen`)
- Funciones: `camelCase` (ej: `handleSaveVenta`)
- Constantes: `UPPER_CASE` (ej: `ERP_BASE_URL`)
- Interfaces: `PascalCase` con sufijo si necesario (ej: `ClienteERP`)

**Tipos:**
- Preferir `interface` sobre `type` para objetos
- Exportar tipos desde `App.tsx` si son globales
- Tipos locales dentro del archivo del componente

**Comentarios:**
```typescript
/**
 * Descripción de función/componente
 * @param param1 - Descripción
 * @returns Descripción
 */
```

### 9.3 Gestión de Estado

**Estado Global (App.tsx):**
- Para datos compartidos entre múltiples pantallas
- Usar `useState` con tipos explícitos

**Estado Local (Componente):**
- Para datos que solo usa ese componente
- Para estados de UI (modales, loading, etc.)

**Pasar datos entre componentes:**
```typescript
// Opción 1: Props
<MiComponente 
  data={datos} 
  onUpdate={(newData) => setDatos(newData)} 
/>

// Opción 2: Callback con datos
const handleSave = (ventaData) => {
  // Procesar en App.tsx
  handleAddNotaVenta(ventaData);
  // Navegar
  setCurrentScreen('dashboard');
};

<NuevaVentaScreen onSaveVenta={handleSave} />
```

### 9.4 Navegación

La navegación se maneja con un simple state en `App.tsx`:

```typescript
const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
```

Para navegar desde cualquier componente:
```typescript
onNavigate('nombreDePantalla');
```

Pantallas disponibles:
- `'login'`, `'loginEmail'`, `'dashboard'`
- `'ventasMenu'`, `'ventas'`, `'nuevaVenta'`, `'verNota'`, `'resumenDia'`
- `'cobros'`, `'cobrosList'`, `'cobrosConfirmacion'`
- `'gastos'`, `'documentos'`, `'clientes'`, `'articulos'`
- `'comunicacion'`, `'almacen'`, `'notasAlmacen'`, `'resumenStock'`
- `'configuracion'`, `'agenda'`

### 9.5 Integrar con Servicios

**ERP Service:**
```typescript
import * as erpService from './services/erp.service';

// Obtener datos
const clientes = await erpService.getClientes();
const articulos = await erpService.getArticulos();

// Crear documento
const resultado = await erpService.crearDocumentoVenta(documento);
if (resultado.InfoError.Codigo === 0) {
  console.log('✅ Éxito');
} else {
  console.error('❌ Error:', resultado.InfoError.Descripcion);
}
```

**Sync Service:**
```typescript
import { syncService } from './services/sync.service';

// Agregar a cola
const opId = syncService.addToQueue('venta', ventaData);

// Procesar
await syncService.processQueue();

// Ver estado
const pendientes = syncService.getPendingCount();
const errores = syncService.getErrors();
```

**Printer Service:**
```typescript
import { printerService } from './services/printer.service';

// Configurar
printerService.configure({
  type: 'bluetooth',
  deviceName: 'Printer-BT-001'
});

// Conectar
const connected = await printerService.connect();
if (connected) {
  // Imprimir
  await printerService.print({
    type: 'venta',
    data: ventaData
  });
}
```

**Agenda Service:**
```typescript
import { agendaService } from './services/agenda.service';

// Crear visita
const visita = agendaService.crearVisita({
  clienteId: '100',
  clienteNombre: 'Cliente Test',
  fecha: '2025-11-05',
  hora: '10:00',
  tipo: 'planificada',
  estado: 'pendiente',
  prioridad: 'media'
});

// Obtener visitas del día
const visitasHoy = agendaService.getVisitasHoy();

// Completar visita
agendaService.completarVisita(visita.id, {
  realizada: true,
  ventaGenerada: true,
  notaVentaId: 'P001',
  observaciones: 'Venta exitosa'
});
```

### 9.6 Manejo de Errores

**Siempre usar try-catch para operaciones async:**
```typescript
const handleSyncData = async () => {
  try {
    setLoading(true);
    const data = await erpService.getClientes();
    setClientes(data);
  } catch (error) {
    console.error('Error sincronizando:', error);
    // Mostrar mensaje al usuario
    alert('No se pudo sincronizar. Usando datos locales.');
  } finally {
    setLoading(false);
  }
};
```

**Para operaciones críticas, usar fallbacks:**
```typescript
const getClientes = async () => {
  if (ERP_ENABLED) {
    try {
      return await fetchClientesDelERP();
    } catch (error) {
      console.warn('ERP no disponible, usando cache');
      return getClientesDeCache();
    }
  } else {
    return getClientesMock();
  }
};
```

### 9.7 Testing Manual

**Consola del navegador (F12):**
```javascript
// Ver estado de sincronización
syncService.getQueue()
syncService.getErrors()

// Ver datos almacenados
localStorage.getItem('syncQueue')
localStorage.getItem('agendaVisitas')

// Limpiar todo
localStorage.clear()
location.reload()

// Probar conexión ERP
await erpService.getVersion()
```

### 9.8 Debugging

**Logs implementados:**
- ✅ `✅ Operación exitosa`
- ⚠️ `⚠️ Advertencia`
- ❌ `❌ Error crítico`
- 🔄 `🔄 Sincronizando...`
- 💾 `💾 Guardado localmente`
- 🌐 `🌐 Enviado al ERP`
- 📤 `📤 Enviando...`
- 📜 `📜 Cargando datos...`

**Activar modo verbose:**
```typescript
// En erp.service.ts
const DEBUG_MODE = true;

if (DEBUG_MODE) {
  console.log('📤 Request:', url, body);
  console.log('📥 Response:', data);
}
```

---

## 10. Integración con ERP Verial

**Ver guía completa:** [GUIA_TECNICA_CONEXION_ERP.md](GUIA_TECNICA_CONEXION_ERP.md)

### 10.1 Resumen

La aplicación se integra con el ERP Verial mediante su API REST. La comunicación es bidireccional:

**Del ERP → App:**
- Clientes
- Artículos
- Métodos de pago
- Stock
- Historial de pedidos

**De App → ERP:**
- Nuevos pedidos
- Pagos
- Nuevos clientes

### 10.2 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `GetClientesWS` | Obtener clientes |
| GET | `GetArticulosWS` | Obtener artículos |
| GET | `GetMetodosPagoWS` | Obtener métodos de pago |
| GET | `GetStockArticulosWS` | Obtener stock |
| GET | `GetHistorialPedidosWS` | Historial de pedidos |
| GET | `GetVersionWS` | Versión del servicio |
| POST | `NuevoDocClienteWS` | Crear pedido/venta |
| POST | `NuevoPagoWS` | Registrar pago |
| POST | `NuevoClienteWS` | Crear cliente |

### 10.3 Autenticación

Todos los endpoints requieren un parámetro de sesión:

```
?x=[SESSION_ID]
```

El SESSION_ID se configura en `/services/erp.service.ts`.

### 10.4 Estructura de Respuesta

```json
{
  "InfoError": {
    "Codigo": 0,
    "Descripcion": "OK"
  },
  "Data": [...]
}
```

- **Codigo = 0**: Operación exitosa
- **Codigo != 0**: Error (ver Descripcion)

### 10.5 Sincronización Incremental

Para optimizar, usar filtros de fecha/hora:

```
GetClientesWS?x=18&fecha=2024-11-01&hora=14:30
```

Retorna solo registros modificados desde esa fecha/hora.

---

## 11. Troubleshooting

### 11.1 Problemas Comunes

#### La aplicación no sincroniza con el ERP

**Verificar:**
1. `ERP_ENABLED` está en `true`
2. `ERP_BASE_URL` es correcta
3. `SESSION_ID` es válida
4. Hay conectividad de red al servidor ERP

**Probar manualmente:**
```bash
curl "http://[IP_SERVER]:8000/WcfServiceLibraryVerial/GetVersionWS?x=[SESSION_ID]"
```

**Logs a revisar:**
```
💾 Usando datos MOCK → ERP deshabilitado
⚠️ Error al conectar con ERP → Problema de red
❌ Error HTTP 404 → URL incorrecta
❌ Error HTTP 401 → SESSION_ID inválida
```

#### Los clientes/artículos no se actualizan

**Solución:**
1. Abrir consola (F12)
2. Ejecutar:
```javascript
localStorage.clear()
location.reload()
```
3. La app volverá a sincronizar todo desde cero

#### La impresora no conecta

**Verificar:**
1. Impresora encendida
2. Bluetooth/WiFi activo
3. Permisos del navegador para Bluetooth/Serial
4. SDK del fabricante implementado (para producción)

**Nota:** En desarrollo, la impresora usa simulación.

#### Error "TypeError: Failed to fetch"

**Causa:** El ERP no está accesible o `ERP_ENABLED = true` sin configurar correctamente.

**Solución:**
- Cambiar `ERP_ENABLED = false` para modo offline
- O configurar correctamente la conexión al ERP

#### Las operaciones no se sincronizan automáticamente

**Verificar:**
1. Ver operaciones pendientes:
```javascript
syncService.getPendingCount()
```

2. Ver errores:
```javascript
syncService.getErrors()
```

3. Forzar sincronización:
```javascript
await syncService.processQueue()
```

#### Problema con tipos TypeScript en sync.service.ts

**Síntoma:** Error "Argument of type '{ ... }' is not assignable to parameter of type 'DocumentoCliente'"

**Causa:** Los campos del objeto `documento` no coinciden exactamente con la interfaz `DocumentoCliente`.

**Solución temporal:**
```typescript
// Agregar type assertion
const documento = {
  // ... campos
} as DocumentoCliente;
```

**Solución definitiva:**
Asegurarse de que todos los campos coincidan con la interfaz en `erp.service.ts`.

### 11.2 Logs de Diagnóstico

**Ver logs en consola:**
```javascript
// Estado de servicios
console.log('ERP Status:', erpService.getERPStatus());
console.log('Sync Queue:', syncService.getQueue());
console.log('Sync Errors:', syncService.getErrors());
console.log('Printer Connected:', printerService.isConnected());

// Datos almacenados
Object.keys(localStorage).forEach(key => {
  console.log(key, localStorage.getItem(key));
});
```

### 11.3 Reiniciar Completamente

Si nada funciona:

```javascript
// 1. Limpiar todo
localStorage.clear();
sessionStorage.clear();

// 2. Limpiar caché del navegador
// Chrome: Ctrl+Shift+Del → Limpiar caché

// 3. Recargar
location.reload();

// 4. Si persiste, hacer hard reload
// Chrome: Ctrl+Shift+R
```

### 11.4 Soporte Técnico

**Archivos clave para revisar:**
- `/services/erp.service.ts` - Configuración y conexión ERP
- `/hooks/useERPSync.ts` - Lógica de sincronización
- `/services/sync.service.ts` - Cola de operaciones

**Comandos útiles:**
```bash
# Ver logs del servidor de desarrollo
npm run dev

# Compilar y ver errores
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit
```

---

## 12. Roadmap

### Versión 1.1 (Próximo Release)

**Alta Prioridad:**
- [ ] Implementar SDK de impresora para producción
- [ ] Validar IDs reales de métodos de pago con ERP
- [ ] Reemplazar AgendaScreen con AgendaScreenUpdated
- [ ] Agregar widget de "Visitas Hoy" en Dashboard
- [ ] Implementar modal de errores de sincronización

**Media Prioridad:**
- [ ] Optimizar cola de sincronización (retry exponencial)
- [ ] Implementar notificaciones de visitas próximas
- [ ] Agregar export/import completo de datos
- [ ] Mejorar UI de estado de sincronización
- [ ] Implementar búsqueda avanzada de clientes

### Versión 1.2

**Funcionalidades Nuevas:**
- [ ] Dashboard de métricas de vendedor
- [ ] Gráficos de conversión visitas → ventas
- [ ] Análisis de rutas óptimas
- [ ] Modo oscuro
- [ ] Multi-idioma (Español, Inglés)

**Mejoras Técnicas:**
- [ ] PWA completa (instalable)
- [ ] Service Worker para sincronización en background
- [ ] IndexedDB en lugar de localStorage
- [ ] WebSocket para sincronización en tiempo real
- [ ] Compresión de datos para optimizar tráfico

### Versión 2.0

**Características Avanzadas:**
- [ ] Gestión de múltiples vendedores
- [ ] Panel de administración web
- [ ] Reportes personalizables
- [ ] Integración con CRM externo
- [ ] Firma digital de documentos
- [ ] Geolocalización de visitas
- [ ] Cámara para fotos de productos
- [ ] Reconocimiento de voz para notas

---

## Apéndices

### A. Glosario

| Término | Definición |
|---------|------------|
| **ERP** | Enterprise Resource Planning - Sistema de gestión empresarial |
| **Verial** | Nombre del ERP con el que se integra la aplicación |
| **Offline-First** | Patrón de diseño donde la app funciona primero sin conexión |
| **ESC/POS** | Protocolo de comandos para impresoras térmicas |
| **localStorage** | API del navegador para almacenamiento local persistente |
| **Sincronización** | Proceso de enviar/recibir datos del ERP |
| **Cola** | Lista de operaciones pendientes de sincronizar |
| **Mock** | Datos de prueba simulados |
| **Nota de Venta** | Documento de venta/pedido |
| **Cobro** | Registro de pago de un cliente |

### B. Atajos de Teclado

*No implementados actualmente. Posible feature futuro.*

### C. Referencias

**Documentación Oficial:**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

**Guías del Proyecto:**
- [README.md](README.md) - Introducción básica
- [GUIA_TECNICA_CONEXION_ERP.md](GUIA_TECNICA_CONEXION_ERP.md) - Integración ERP detallada
- [NOTAS_TECNICAS.md](NOTAS_TECNICAS.md) - Notas de desarrollo

### D. Changelog

**v1.0.0 - Noviembre 2024**
- ✅ Implementación completa de todas las pantallas
- ✅ Integración con ERP Verial
- ✅ Servicio de sincronización con cola
- ✅ Servicio de impresión matricial
- ✅ Servicio de agenda de visitas
- ✅ Modo offline completo
- ✅ Gestión de clientes, artículos, ventas, cobros, gastos
- ✅ Documentación completa

---

## Licencia

**Uso Interno - Todos los Derechos Reservados**

Este software es propiedad exclusiva de [NOMBRE_EMPRESA] y está destinado únicamente para uso interno. Queda prohibida su distribución, modificación o uso comercial sin autorización expresa.

---

## Contacto

**Equipo de Desarrollo 4Ventas**

- Email: dev@4ventas.com
- Soporte Técnico: soporte@4ventas.com

---

**Última actualización:** 1 de Noviembre de 2025  
**Versión del documento:** 1.0  
**Autor:** Equipo 4Ventas

---

