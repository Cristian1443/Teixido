# 4Ventas - Sistema de Gestión Comercial

Aplicación web de gestión de ventas offline-first para vendedores en ruta, con sincronización diaria al ERP Verial.

## Características Principales

- ✅ **Gestión de Clientes** - Alta, consulta y seguimiento de clientes
- ✅ **Catálogo de Artículos** - Control de inventario con alertas de stock
- ✅ **Ventas/Pedidos** - Creación de notas de venta con múltiples artículos
- ✅ **Cobros** - Gestión de cobros inmediatos y pendientes
- ✅ **Gastos** - Registro de gastos operativos
- ✅ **Documentos** - Visualización y gestión de documentos
- ✅ **Agenda** - Planificación de visitas comerciales
- ✅ **Resumen de Día** - Dashboard con indicadores de gestión
- ✅ **Modo Offline** - Funciona sin conexión a internet
- ✅ **Sincronización ERP** - Integración completa con Verial

## Tecnologías

- React 18
- TypeScript
- Vite
- LocalStorage para persistencia offline
- Integración REST con ERP Verial

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Configuración del ERP

**Para conectar con el ERP Verial, consultar:**

📖 **[GUIA_TECNICA_CONEXION_ERP.md](GUIA_TECNICA_CONEXION_ERP.md)**

La guía incluye:
- Configuración paso a paso
- Endpoints disponibles
- Estructura de datos
- Verificación de conexión
- Solución de problemas

### Configuración Rápida

1. Abrir `/services/erp.service.ts`
2. Configurar los siguientes valores:

```typescript
const ERP_BASE_URL = 'http://[IP_SERVIDOR]:8000/WcfServiceLibraryVerial';
let SESSION_ID = '[TU_SESSION_ID]';
const ERP_ENABLED = true;
```

3. Reiniciar la aplicación

## Estructura del Proyecto

```
4ventas/
├── services/
│   └── erp.service.ts       # Servicio de integración con ERP
├── hooks/
│   └── useERPSync.ts        # Hook de sincronización
├── components/
│   ├── Dashboard.tsx        # Panel principal
│   ├── VentasScreen.tsx     # Gestión de ventas
│   ├── ClientesScreen.tsx   # Gestión de clientes
│   ├── ArticulosScreen.tsx  # Catálogo de artículos
│   ├── CobrosScreen.tsx     # Gestión de cobros
│   ├── GastosScreen.tsx     # Registro de gastos
│   └── ...                  # Otros componentes
└── App.tsx                  # Componente principal
```

## Modo Offline

La aplicación funciona completamente sin conexión al ERP:

- Usa datos almacenados en `localStorage`
- Guarda operaciones en cola para sincronizar después
- Incluye datos mock para desarrollo y pruebas
- No requiere conexión a internet para operar

**Activar modo offline:**
```typescript
// En /services/erp.service.ts
const ERP_ENABLED = false;
```

## Sincronización

### Automática
- Al iniciar la aplicación
- Cada hora (configurable)

### Manual
```typescript
// Desde la consola del navegador
await sincronizarClientes();
await sincronizarArticulos();
```

### Cola de Pendientes
Las operaciones realizadas sin conexión se guardan en `localStorage.colaPendiente` y se sincronizan automáticamente cuando la conexión se restablece.

## Datos Mock (Desarrollo)

Con `ERP_ENABLED = false`, la app usa datos de prueba:

- 7 clientes predefinidos
- 10 artículos con stock
- Operaciones locales en `localStorage`

## Flujo de Trabajo

### Crear Venta

1. **Nueva Venta** → Seleccionar cliente
2. Agregar artículos
3. Elegir forma de pago
4. Seleccionar estado: **Pagado** o **Pendiente**
5. Guardar

La venta se sincroniza automáticamente con el ERP (si está habilitado).

### Gestionar Cobros

- **Cobros Pagados:** Registrados en historial
- **Cobros Pendientes:** Listados para cobrar después
- Los clientes con cobros pendientes muestran un badge "COBRAR AHORA"

### Registrar Gastos

1. **Gastos** → Nueva entrada
2. Tipo de gasto, monto, descripción
3. Guardar

Los gastos se sincronizan con el ERP.

## Soporte

**Documentación técnica:** Ver `GUIA_TECNICA_CONEXION_ERP.md`

**Logs de diagnóstico:** Consola del navegador (F12)

**Reiniciar datos:**
```javascript
localStorage.clear();
location.reload();
```

## Licencia

Uso interno - Todos los derechos reservados
