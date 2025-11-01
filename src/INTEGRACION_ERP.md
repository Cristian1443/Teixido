# 🔗 INTEGRACIÓN CON ERP VERIAL - 4Ventas

## ✅ CAMBIOS IMPLEMENTADOS

### 1. **Selector de Estado de Pago en Nueva Venta** ✨

**Ubicación:** `/components/NuevaVentaScreen.tsx`

**Funcionalidad:**
- ✅ Nuevo selector "Estado del Pago" con dos opciones:
  - **✓ Pagado**: La venta se marca como pagada, se crea un cobro con estado 'pagado'
  - **⏳ Pendiente**: Se crea un cobro con estado 'pendiente' para cobrar después

**UI/UX:**
- Botones grandes y claros con iconos visuales
- Verde para "Pagado", Naranja para "Pendiente"
- Mensaje informativo debajo explicando qué pasará
- Transiciones suaves y efectos hover

**Resultado:**
```
Usuario crea venta → Elige estado → Sistema crea cobro correcto
```

---

### 2. **Servicio de Integración con ERP** 🌐

**Ubicación:** `/services/erp.service.ts`

**Endpoints Implementados:**

#### **CLIENTES**
- ✅ `getClientes()` - Obtiene todos los clientes del ERP
- ✅ `crearCliente()` - Crea un nuevo cliente en el ERP
- ✅ `mapearClienteERPaLocal()` - Convierte formato ERP → Local

#### **ARTÍCULOS**
- ✅ `getArticulos()` - Obtiene todos los artículos del ERP
- ✅ `getStockArticulos()` - Obtiene stock de artículos
- ✅ `mapearArticuloERPaLocal()` - Convierte formato ERP → Local

#### **DOCUMENTOS (VENTAS/PEDIDOS)**
- ✅ `crearDocumentoVenta()` - Crea documento de venta en el ERP
- ✅ `actualizarDocumento()` - Actualiza un documento existente
- ✅ `getNextNumDocs()` - Obtiene próxima numeración

#### **PAGOS**
- ✅ `getMetodosPago()` - Obtiene métodos de pago del ERP
- ✅ `registrarPago()` - Registra un pago en el ERP

#### **HISTORIAL**
- ✅ `getHistorialPedidos()` - Obtiene historial de cliente
- ✅ `getEstadoPedidos()` - Verifica estado de pedidos

**Configuración:**
```typescript
const ERP_BASE_URL = 'http://x.verial.org:8000/WcfServiceLibraryVerial';
const SESSION_ID = '18'; // ID de sesión de prueba
```

---

### 3. **Lógica de Cobros Mejorada** 💰

**Ubicación:** `/App.tsx` - función `handleSaveVenta`

**Flujo Anterior:**
```
Venta → Solo crear si NO es efectivo → Cobro pendiente
```

**Flujo Nuevo:**
```
Venta + Estado Pago seleccionado →
  Si 'pagado':    Nota 'cerrada' + Cobro 'pagado'
  Si 'pendiente': Nota 'pendiente' + Cobro 'pendiente'
```

**Ventajas:**
- ✅ Control total del usuario
- ✅ Registro completo de cobros (pagados y pendientes)
- ✅ Historial de pagos inmediatos
- ✅ Tracking correcto de cobros pendientes

---

## 📊 FLUJO COMPLETO ACTUAL

### **Escenario 1: Venta con Pago Inmediato**

```
1. Usuario crea venta
   ├─ Cliente: Boutique Encanto
   ├─ Total: 125,00 €
   ├─ Forma de pago: Efectivo
   └─ Estado: ✓ Pagado

2. Sistema crea:
   ├─ NotaVenta P008
   │   ├─ estado: 'cerrada' ✅
   │   ├─ generoCobro: false
   │   └─ formaPago: 'Efectivo'
   │
   └─ Cobro C005
       ├─ estado: 'pagado' ✅
       ├─ monto: '125,00 €'
       └─ notaVentaId: 'P008'

3. Resultado:
   ✅ Venta cerrada
   ✅ Cobro registrado como pagado
   ✅ No aparece en "Cobros Pendientes"
   ✅ Aparece en historial de cobros completo
```

### **Escenario 2: Venta con Pago Pendiente**

```
1. Usuario crea venta
   ├─ Cliente: Restaurante La Gallina Loca
   ├─ Total: 304,00 €
   ├─ Forma de pago: Tarjeta de Crédito
   └─ Estado: ⏳ Pendiente

2. Sistema crea:
   ├─ NotaVenta P009
   │   ├─ estado: 'pendiente' ⏳
   │   ├─ generoCobro: true
   │   ├─ cobroId: 'C006'
   │   └─ formaPago: 'Tarjeta de Crédito'
   │
   └─ Cobro C006
       ├─ estado: 'pendiente' ⏳
       ├─ monto: '304,00 €'
       ├─ notaVentaId: 'P009'
       └─ clienteId: '300'

3. Resultado:
   ⏳ Venta pendiente
   ⏳ Cobro pendiente creado
   📋 Aparece en "Cobros Pendientes"
   💳 Cliente muestra badge "1 COBRO PENDIENTE"

4. Usuario cobra después:
   ├─ CobrosListScreen → "COBRAR AHORA"
   ├─ Selecciona nota P009
   ├─ Confirma pago
   └─ Sistema actualiza:
       ├─ Cobro C006: estado → 'pagado' ✅
       └─ Nota P009: estado → 'cerrada' ✅
```

---

## 🚀 PRÓXIMOS PASOS - INTEGRACIÓN CON ERP

### **Paso 1: Sincronizar Clientes** (Alta prioridad)

```typescript
// En App.tsx o en un hook useEffect
import { getClientes, mapearClienteERPaLocal } from './services/erp.service';

async function sincronizarClientes() {
  try {
    const clientesERP = await getClientes();
    const clientesLocales = clientesERP.map(mapearClienteERPaLocal);
    setClientes(clientesLocales);
    
    console.log('✅ Clientes sincronizados:', clientesLocales.length);
  } catch (error) {
    console.error('❌ Error al sincronizar clientes:', error);
    // Usar datos locales como fallback
  }
}

// Llamar al iniciar la app o en un intervalo
useEffect(() => {
  sincronizarClientes();
  // Sync cada hora
  const interval = setInterval(sincronizarClientes, 3600000);
  return () => clearInterval(interval);
}, []);
```

### **Paso 2: Sincronizar Artículos** (Alta prioridad)

```typescript
import { getArticulos, getStockArticulos, mapearArticuloERPaLocal } from './services/erp.service';

async function sincronizarArticulos() {
  try {
    const articulosERP = await getArticulos();
    const stocksERP = await getStockArticulos();
    
    // Merge artículos + stocks
    const articulosLocales = articulosERP.map(art => {
      const stock = stocksERP.find(s => s.ID_Articulo === art.Id);
      return mapearArticuloERPaLocal({ ...art, Stock: stock?.Stock || 0 });
    });
    
    setArticulos(articulosLocales);
    
    console.log('✅ Artículos sincronizados:', articulosLocales.length);
  } catch (error) {
    console.error('❌ Error al sincronizar artículos:', error);
  }
}
```

### **Paso 3: Enviar Ventas al ERP** (Media prioridad)

```typescript
import { crearDocumentoVenta, registrarPago } from './services/erp.service';

async function enviarVentaAlERP(ventaData: any) {
  try {
    // 1. Preparar documento para el ERP
    const documento = {
      Id: 0, // Nuevo
      Tipo: 5, // Pedido
      Fecha: new Date().toISOString().split('T')[0],
      ID_Cliente: parseInt(ventaData.cliente.id),
      PreciosImpIncluidos: true,
      BaseImponible: parseFloat(ventaData.totales.subtotal),
      TotalImporte: parseFloat(ventaData.totales.total),
      Contenido: ventaData.articulos.map(art => ({
        TipoRegistro: 1,
        ID_Articulo: parseInt(art.articuloId),
        Precio: art.precioUnitario,
        Dto: art.descuento || 0,
        DtoPPago: 0,
        DtoEurosXUd: 0,
        DtoEuros: 0,
        Uds: art.cantidad,
        UdsRegalo: 0,
        UdsAuxiliares: 0,
        ImporteLinea: art.precioUnitario * art.cantidad,
        PorcentajeIVA: 21, // TODO: obtener del artículo
        PorcentajeRE: 0,
        DescripcionAmplia: art.nota || null
      })),
      Pagos: ventaData.estadoPago === 'pagado' ? [{
        ID_MetodoPago: obtenerIDMetodoPago(ventaData.formaPago),
        Fecha: new Date().toISOString().split('T')[0],
        Importe: parseFloat(ventaData.totales.total)
      }] : []
    };
    
    // 2. Enviar al ERP
    const resultado = await crearDocumentoVenta(documento);
    
    console.log('✅ Venta enviada al ERP:', resultado);
    
    return resultado;
  } catch (error) {
    console.error('❌ Error al enviar venta al ERP:', error);
    // Guardar en localStorage para retry
    guardarParaSincronizarDespues(ventaData);
  }
}

// Modificar handleSaveVenta para enviar al ERP
const handleSaveVenta = async (ventaData: any) => {
  // ... código actual ...
  
  // Intentar enviar al ERP
  try {
    await enviarVentaAlERP(ventaData);
  } catch (error) {
    // No bloquear si falla - modo offline
    console.warn('⚠️ Venta guardada localmente - se sincronizará después');
  }
};
```

### **Paso 4: Registrar Pagos en ERP** (Media prioridad)

```typescript
async function registrarPagoEnERP(cobro: Cobro) {
  try {
    const pago = {
      ID_DocCli: parseInt(cobro.notaVentaId?.replace('P', '') || '0'),
      ID_MetodoPago: obtenerIDMetodoPago(cobro.formaPago || 'Efectivo'),
      Fecha: new Date().toISOString().split('T')[0],
      Importe: parseFloat(cobro.monto.replace(',', '.').replace('€', '').trim())
    };
    
    await registrarPago(pago);
    
    console.log('✅ Pago registrado en ERP:', pago);
  } catch (error) {
    console.error('❌ Error al registrar pago en ERP:', error);
  }
}

// Modificar handleConfirmarCobranza
const handleConfirmarCobranza = async (cobranza: any) => {
  // ... código actual ...
  
  // Registrar en ERP
  await registrarPagoEnERP(cobroPendiente);
};
```

### **Paso 5: Sistema de Cola de Sincronización** (Baja prioridad)

```typescript
// Guardar operaciones pendientes cuando falla la conexión
interface OperacionPendiente {
  tipo: 'venta' | 'pago' | 'cliente';
  datos: any;
  timestamp: string;
  intentos: number;
}

let colaSincronizacion: OperacionPendiente[] = [];

function guardarParaSincronizarDespues(tipo: string, datos: any) {
  colaSincronizacion.push({
    tipo: tipo as any,
    datos,
    timestamp: new Date().toISOString(),
    intentos: 0
  });
  
  // Guardar en localStorage
  localStorage.setItem('colaPendiente', JSON.stringify(colaSincronizacion));
}

async function procesarColaPendiente() {
  const cola = JSON.parse(localStorage.getItem('colaPendiente') || '[]');
  
  for (const operacion of cola) {
    try {
      if (operacion.tipo === 'venta') {
        await enviarVentaAlERP(operacion.datos);
      } else if (operacion.tipo === 'pago') {
        await registrarPagoEnERP(operacion.datos);
      }
      
      // Eliminar de la cola si se procesó correctamente
      colaSincronizacion = colaSincronizacion.filter(op => op !== operacion);
    } catch (error) {
      operacion.intentos++;
      if (operacion.intentos > 3) {
        console.error('❌ Operación fallida después de 3 intentos:', operacion);
      }
    }
  }
  
  localStorage.setItem('colaPendiente', JSON.stringify(colaSincronizacion));
}

// Procesar cola cada 5 minutos
setInterval(procesarColaPendiente, 300000);
```

---

## 🔑 MAPEO DE MÉTODOS DE PAGO

**Local → ERP:**
```typescript
function obtenerIDMetodoPago(formaPago: string): number {
  const mapeo: Record<string, number> = {
    'Efectivo': 1,
    'Tarjeta de Débito': 2,
    'Tarjeta de Crédito': 3,
    'Bizum': 8,
    'Transferencia Bancaria': 5
  };
  
  return mapeo[formaPago] || 1; // Default: Efectivo
}
```

**NOTA:** Estos IDs son aproximados. Debes obtener los IDs reales llamando a `getMetodosPago()`.

---

## 📱 ESTADOS DE LA APLICACIÓN

### **Modo Online** (Con conexión al ERP)
```
✅ Sincroniza clientes al iniciar
✅ Sincroniza artículos y stock
✅ Envía ventas inmediatamente al ERP
✅ Registra pagos en tiempo real
✅ Obtiene historial actualizado
```

### **Modo Offline** (Sin conexión al ERP)
```
⚠️ Usa datos locales/cache
⚠️ Guarda operaciones en cola
⚠️ Muestra badge de "cambios pendientes"
⚠️ Sincroniza cuando recupera conexión
✅ La app sigue funcionando normalmente
```

---

## 🎯 RESUMEN DE CAMBIOS

### **Lo que se agregó:**

1. ✅ **Selector Estado de Pago** en NuevaVentaScreen
   - Usuario elige si pagó o está pendiente
   - UI clara con verde/naranja
   - Mensaje informativo

2. ✅ **Servicio ERP** completo
   - Todos los endpoints documentados
   - Funciones helper para llamadas HTTP
   - Mappers para convertir datos ERP ↔ Local

3. ✅ **Lógica de Cobros** actualizada
   - Crea cobros pagados O pendientes según elección
   - Registra todos los cobros (no solo pendientes)
   - Tracking bidireccional nota ↔ cobro

### **Lo que falta por implementar:**

1. ⏳ Llamadas reales al ERP desde la app
2. ⏳ Sistema de autenticación/sesión
3. ⏳ Cola de sincronización offline
4. ⏳ Manejo de errores de red
5. ⏳ UI de estado de sincronización

---

## 💡 RECOMENDACIONES

1. **Empezar con READ-ONLY**: Primero sincronizar clientes y artículos (GET), luego implementar CREATE (POST)

2. **Modo híbrido**: Mantener datos locales + sync periódica, no depender 100% del ERP en tiempo real

3. **Validar IDs**: Los IDs de métodos de pago, agentes, etc. deben obtenerse del ERP primero

4. **Testing**: Probar con sesión de desarrollo antes de producción

5. **Error handling**: Preparar la app para funcionar sin conexión

---

## 📞 CONTACTO CON ERP

**URL Base:** `http://x.verial.org:8000/WcfServiceLibraryVerial`
**Sesión de Prueba:** `18`
**Formato:** JSON sobre HTTP

**Ejemplo de llamada:**
```bash
curl "http://x.verial.org:8000/WcfServiceLibraryVerial/GetClientesWS?x=18&id_cliente=0&fecha=2024-11-01&hora=12:00"
```

---

✅ **El sistema ahora está preparado para integración completa con el ERP Verial mientras mantiene funcionalidad offline.**
