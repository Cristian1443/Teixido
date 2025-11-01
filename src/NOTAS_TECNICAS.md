# Notas Técnicas - 4Ventas

## Implementaciones Completadas

### 1. Servicio de Impresión Matricial (`/services/printer.service.ts`)

Implementación lista para integración con SDKs nativos.

**Estado actual:** Capa de abstracción completa con comandos ESC/POS.

**Para producción:**

- **Bluetooth**: Implementar con Web Bluetooth API o SDK específico del fabricante
- **Red TCP/IP**: Configurar servidor proxy o usar extensión nativa
- **USB**: Implementar con Web Serial API

**Comandos ESC/POS implementados:**
- Inicialización de impresora
- Control de fuente (negrita, tamaño)
- Alineación (izquierda, centro, derecha)
- Saltos de línea y separadores
- Corte de papel

**Métodos principales:**
```typescript
printerService.configure(config: PrinterConfig)
printerService.connect(): Promise<boolean>
printerService.print(job: PrintJob): Promise<boolean>
printerService.printTest(): Promise<boolean>
```

**Integraciones pendientes:**
- SDK específico del fabricante de impresora
- Certificados SSL si se usa HTTPS
- Permisos de navegador para Bluetooth/Serial

---

### 2. Servicio de Sincronización Robusto (`/services/sync.service.ts`)

Sistema completo de cola con manejo de errores del ERP Verial.

**Características:**
- Cola persistente en localStorage
- Reintentos automáticos (máx. 3)
- Manejo específico de códigos de error Verial
- Procesamiento asíncrono no bloqueante

**Códigos de error manejados:**
- `0`: Operación exitosa
- `12`: Error creando documento (requiere revisión manual)
- `13`: Cliente no encontrado
- `14`: Artículo no encontrado
- `-1`: Error de conexión

**Métodos principales:**
```typescript
syncService.addToQueue(type, data): string
syncService.processQueue(): Promise<void>
syncService.getErrors(): SyncError[]
syncService.getPendingCount(): number
```

**Uso en App:**
```typescript
// Agregar operación a cola
const opId = syncService.addToQueue('venta', ventaData);

// Procesar cola (llamar periódicamente)
await syncService.processQueue();

// Ver errores
const errores = syncService.getErrors();
```

**Validaciones implementadas:**
- Parsing seguro de IDs (cliente, artículo, documento)
- Conversión de montos (maneja €, espacios, comas)
- Validación de estructura de datos antes de envío

---

### 3. Servicio de Agenda de Visitas (`/services/agenda.service.ts`)

Sistema completo de gestión de agenda comercial.

**Modelo de datos:**
```typescript
interface Visita {
  id: string;
  clienteId: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  tipo: 'planificada' | 'visita_fria' | 'seguimiento' | 'urgente';
  estado: 'pendiente' | 'completada' | 'cancelada' | 'reprogramada';
  prioridad: 'baja' | 'media' | 'alta';
  resultadoVisita?: {
    realizada: boolean;
    ventaGenerada: boolean;
    notaVentaId?: string;
    observaciones?: string;
  };
}
```

**Funcionalidades:**
- Crear/editar/eliminar visitas
- Detección de conflictos de horario
- Sugerencia de horarios disponibles
- Completar visitas con resultado
- Reprogramación
- Estadísticas de conversión
- Rutas diarias optimizadas
- Exportar/importar agenda

**Métodos principales:**
```typescript
agendaService.crearVisita(data): Visita
agendaService.completarVisita(id, resultado): Visita
agendaService.reprogramarVisita(id, fecha, hora): Visita
agendaService.getVisitasHoy(): Visita[]
agendaService.verificarConflicto(fecha, hora, duracion): boolean
agendaService.getEstadisticas(desde?, hasta?): Stats
```

**Integración con Dashboard:**
- Contador de visitas pendientes
- Alertas de visitas del día
- Métricas de conversión (visitas → ventas)

---

## Integración en App.tsx

### Importar servicios

```typescript
import { printerService } from './services/printer.service';
import { syncService } from './services/sync.service';
import { agendaService } from './services/agenda.service';
```

### Inicialización

```typescript
useEffect(() => {
  // Cargar configuración de impresora
  const printerConfig = printerService.getConfig();
  
  // Procesar cola de sincronización cada 5 minutos
  const syncInterval = setInterval(() => {
    syncService.processQueue();
  }, 300000);
  
  return () => clearInterval(syncInterval);
}, []);
```

### Uso en handleSaveVenta

```typescript
const handleSaveVenta = async (ventaData: any) => {
  // 1. Guardar localmente
  const nuevaNota = crearNotaVenta(ventaData);
  setNotasVenta([...notasVenta, nuevaNota]);
  
  // 2. Agregar a cola de sincronización
  syncService.addToQueue('venta', {
    ...ventaData,
    id: nuevaNota.numero,
    fecha: nuevaNota.fecha
  });
  
  // 3. Intentar sincronizar
  await syncService.processQueue();
  
  // 4. Imprimir si está configurado
  if (printerService.isConnected()) {
    await printerService.print({
      type: 'venta',
      data: {
        numero: nuevaNota.numero,
        fecha: nuevaNota.fecha,
        cliente: nuevaNota.cliente,
        articulos: ventaData.articulos,
        subtotal: ventaData.totales.subtotal,
        total: ventaData.totales.total
      }
    });
  }
};
```

---

## Pantallas Actualizadas

### AgendaScreenUpdated.tsx

Reemplazar `AgendaScreen.tsx` actual por `AgendaScreenUpdated.tsx`.

**Funcionalidades implementadas:**
- Creación de visitas con cliente, fecha, hora, tipo, prioridad
- Vista día/semana
- Completar visitas con registro de resultado
- Reprogramación de visitas
- Estadísticas diarias (total, pendientes, completadas)
- Detección de conflictos de horario

**Uso:**
```tsx
<AgendaScreenUpdated 
  onNavigate={handleNavigate}
  clientes={clientes}
/>
```

### ConfiguracionScreen.tsx

Ya actualizado con integración de servicios.

**Nuevas funcionalidades:**
- Configuración de impresora (Bluetooth/Red/USB)
- Prueba de impresión
- Estado de sincronización con contador de pendientes/errores
- Ver errores de sincronización

---

## Tareas Pendientes

### Alta Prioridad

1. **SDK de Impresora**
   - Obtener SDK del fabricante
   - Implementar métodos `sendViaBluetooth`, `sendViaNetwork`, `sendViaUSB`
   - Probar con impresora física

2. **Validar IDs de Métodos de Pago**
   - Llamar a `getMetodosPago()` del ERP
   - Actualizar mapeo en `sync.service.ts` línea 224
   - Documentar IDs reales

3. **Integración Completa de Agenda**
   - Reemplazar `AgendaScreen.tsx` con `AgendaScreenUpdated.tsx`
   - Agregar widget de "Visitas Hoy" en Dashboard
   - Notificaciones de visitas próximas

### Media Prioridad

4. **Manejo Visual de Errores**
   - Crear componente `SyncErrorsModal`
   - Mostrar errores de sincronización al usuario
   - Permitir reintentar operaciones fallidas

5. **Optimización de Cola**
   - Implementar retry exponencial
   - Agrupar operaciones por cliente
   - Priorizar según tipo de operación

6. **Exportación de Datos**
   - Implementar export completo en ConfiguracionScreen
   - Formato JSON con todas las entidades
   - Import con validación de estructura

### Baja Prioridad

7. **Métricas Avanzadas**
   - Dashboard de rendimiento de vendedor
   - Gráficos de conversión visitas → ventas
   - Análisis de rutas óptimas

8. **Notificaciones Push**
   - Recordatorios de visitas
   - Alertas de cobros vencidos
   - Confirmación de sincronización

---

## Notas de Desarrollo

### Convenciones de Código

- Servicios en `singleton pattern` exportados como `export const service = new Service()`
- Persistencia en `localStorage` con try-catch para manejar errores
- IDs generados con timestamp + random: `TIPO-${Date.now()}-${random}`
- Fechas en formato ISO: `YYYY-MM-DD`
- Horas en formato 24h: `HH:MM`

### Performance

- Los servicios cargan datos en constructor (sincrónico desde localStorage)
- Operaciones de red son asíncronas y no bloqueantes
- Cola de sincronización procesa en segundo plano
- Cache de clientes/artículos para reducir llamadas al ERP

### Testing

Para probar los servicios:

```typescript
// Console del navegador

// Impresión
await printerService.configure({ type: 'bluetooth', deviceName: 'Printer-01' });
await printerService.connect();
await printerService.printTest();

// Sincronización
syncService.addToQueue('venta', testVentaData);
await syncService.processQueue();
console.log(syncService.getErrors());

// Agenda
const visita = agendaService.crearVisita({
  clienteId: '100',
  clienteNombre: 'Test Cliente',
  fecha: '2025-11-05',
  hora: '10:00',
  tipo: 'planificada',
  estado: 'pendiente',
  prioridad: 'media'
});
console.log(agendaService.getVisitasHoy());
```

---

## Cronograma de Implementación

| Semana | Tarea | Responsable |
|--------|-------|-------------|
| 1-2 | Integración SDK impresora | Desarrollo |
| 2-3 | Validación IDs métodos pago ERP | ERP/Desarrollo |
| 3-4 | Reemplazar AgendaScreen | Desarrollo |
| 4-5 | UI de errores de sincronización | Desarrollo |
| 5-6 | Testing integrado | QA |

---

**Última actualización:** Noviembre 2024  
**Versión:** 1.0  
**Autor:** Equipo 4Ventas
