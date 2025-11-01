# Guía Técnica de Conexión con ERP Verial - 4Ventas

## Introducción

La aplicación **4Ventas** es una solución de gestión comercial offline-first diseñada para vendedores en ruta. Incluye sincronización diaria con el ERP Verial mediante su API REST.

Esta guía detalla los pasos necesarios para conectar la aplicación con su servidor ERP.

---

## Requisitos Previos

**Información necesaria del ERP:**

1. **URL del servidor ERP** (IP o dominio)
2. **Puerto de conexión** (por defecto: 8000)
3. **ID de sesión válido** para autenticación
4. **Acceso de red** desde la aplicación al servidor ERP

**Ejemplo de URL completa:**
```
http://192.168.1.100:8000/WcfServiceLibraryVerial
```

---

## Configuración de Conexión

### Paso 1: Localizar el archivo de configuración

Abrir el archivo `/services/erp.service.ts` en el proyecto.

### Paso 2: Configurar los parámetros de conexión

Modificar las siguientes líneas (6-13 del archivo):

```typescript
// CONFIGURACIÓN DEL SERVIDOR ERP
const ERP_BASE_URL = 'http://[IP_SERVIDOR]:8000/WcfServiceLibraryVerial';

// ID DE SESIÓN PARA AUTENTICACIÓN
let SESSION_ID = '18'; // ← Reemplazar con sesión válida

// HABILITAR/DESHABILITAR CONEXIÓN CON ERP
// false = Modo desarrollo (datos mock)
// true  = Modo producción (conexión real)
const ERP_ENABLED = false; // ← Cambiar a true para conectar
```

### Paso 3: Reemplazar valores

**3.1. URL del servidor:**
```typescript
// Ejemplo con IP
const ERP_BASE_URL = 'http://192.168.1.100:8000/WcfServiceLibraryVerial';

// Ejemplo con dominio
const ERP_BASE_URL = 'http://erp.miempresa.com:8000/WcfServiceLibraryVerial';
```

**3.2. ID de sesión:**
```typescript
// Reemplazar '18' con el ID de sesión real proporcionado por el ERP
let SESSION_ID = 'TU_ID_SESION';
```

**3.3. Habilitar conexión:**
```typescript
// Cambiar de false a true
const ERP_ENABLED = true;
```

---

## Verificación de Conexión

### Prueba desde navegador

Antes de habilitar la conexión en la aplicación, verificar conectividad manual:

```bash
# Probar obtener versión del servicio
curl "http://[IP_SERVIDOR]:8000/WcfServiceLibraryVerial/GetVersionWS?x=[SESSION_ID]"

# Probar obtener clientes
curl "http://[IP_SERVIDOR]:8000/WcfServiceLibraryVerial/GetClientesWS?x=[SESSION_ID]&id_cliente=0"
```

**Respuesta esperada:**
```json
{
  "InfoError": {
    "Codigo": 0,
    "Descripcion": "OK"
  },
  "Data": [...]
}
```

Si `InfoError.Codigo` es 0, la conexión es correcta.

---

## Endpoints Implementados

La aplicación ya tiene implementados todos los endpoints necesarios:

### Consulta de Datos (GET)

| Endpoint | Descripción | Parámetros |
|----------|-------------|------------|
| `GetClientesWS` | Obtener clientes | x (sesión), id_cliente, fecha, hora |
| `GetArticulosWS` | Obtener artículos | x (sesión), fecha, hora |
| `GetAgentesWS` | Obtener agentes | x (sesión) |
| `GetMetodosPagoWS` | Obtener métodos de pago | x (sesión) |
| `GetStockArticulosWS` | Obtener stock | x (sesión), id_articulo |
| `GetHistorialPedidosWS` | Historial de pedidos | x (sesión), id_cliente, fechadesde, fechahasta |
| `GetVersionWS` | Versión del servicio | x (sesión) |

### Escritura de Datos (POST)

| Endpoint | Descripción | Parámetros JSON |
|----------|-------------|-----------------|
| `NuevoDocClienteWS` | Crear pedido/venta | sesionwcf, Tipo, Fecha, ID_Cliente, Contenido[], Pagos[] |
| `NuevoPagoWS` | Registrar pago | sesionwcf, ID_DocCli, ID_MetodoPago, Fecha, Importe |
| `NuevoClienteWS` | Crear cliente | sesionwcf, Nombre, NIF, Direccion, etc. |

---

## Funcionamiento de la Sincronización

### Modo Offline (ERP_ENABLED = false)

- ✅ La aplicación funciona completamente sin conexión al ERP
- ✅ Utiliza datos mock predefinidos (7 clientes, 10 artículos)
- ✅ Guarda todas las operaciones en `localStorage`
- ✅ Ideal para desarrollo y pruebas

### Modo Online (ERP_ENABLED = true)

- ✅ Sincroniza clientes y artículos al iniciar la aplicación
- ✅ Resincroniza automáticamente cada hora
- ✅ Envía ventas y pagos al ERP en tiempo real
- ✅ Si la conexión falla, guarda en cola local y reintenta después

### Sincronización Incremental

Para optimizar el tráfico de red, la sincronización usa filtros de fecha/hora:

```typescript
// Solo obtiene registros modificados desde última sincronización
GetClientesWS?x=18&id_cliente=0&fecha=2024-11-01&hora=14:30
GetArticulosWS?x=18&fecha=2024-11-01&hora=14:30
```

---

## Estructura de Datos

### Venta/Pedido al ERP

```json
{
  "sesionwcf": "18",
  "Id": 0,
  "Tipo": 5,
  "Referencia": "APP-UUID-12345",
  "Fecha": "2024-11-01",
  "ID_Cliente": 100,
  "PreciosImpIncluidos": true,
  "BaseImponible": 100.00,
  "TotalImporte": 121.00,
  "Contenido": [
    {
      "TipoRegistro": 1,
      "ID_Articulo": 5,
      "Precio": 25.00,
      "Dto": 0,
      "Uds": 4,
      "ImporteLinea": 100.00,
      "PorcentajeIVA": 21
    }
  ],
  "Pagos": [
    {
      "ID_MetodoPago": 1,
      "Fecha": "2024-11-01",
      "Importe": 121.00
    }
  ]
}
```

### Pago al ERP

```json
{
  "sesionwcf": "18",
  "ID_DocCli": 1234,
  "ID_MetodoPago": 1,
  "Fecha": "2024-11-01",
  "Importe": 121.00
}
```

---

## Mapeo de Métodos de Pago

La aplicación utiliza el siguiente mapeo por defecto:

| Método de Pago (App) | ID ERP |
|----------------------|--------|
| Efectivo | 1 |
| Tarjeta de Débito | 2 |
| Tarjeta de Crédito | 3 |
| Transferencia Bancaria | 5 |
| Bizum | 8 |

**IMPORTANTE:** Verificar estos IDs con su ERP llamando a `GetMetodosPagoWS` y ajustar el mapeo en `/hooks/useERPSync.ts` línea 224 si es necesario.

---

## Manejo de Errores

### Códigos de Error del ERP

```typescript
InfoError.Codigo = 0  → Operación exitosa
InfoError.Codigo = 12 → Error creando documento
InfoError.Codigo != 0 → Error general (ver Descripcion)
```

### Comportamiento de la App

La aplicación está diseñada para **nunca bloquearse** si el ERP no responde:

```
Usuario crea venta
    ↓
App intenta enviar al ERP
    ↓
¿Conexión exitosa?
    → SÍ: Sincronizado ✅
    → NO: Guarda en cola local 💾
        ↓
    Reintenta en próxima sincronización
```

---

## Datos Mock para Desarrollo

Mientras `ERP_ENABLED = false`, la aplicación usa estos datos de prueba:

### Clientes Mock (7)
- ALVAREZ C. CONSUELO E HIJOS (ID: 100)
- Boutique Encanto S.L. (ID: 105)
- Restaurante La Gallina Loca (ID: 300)
- Supermercado El Pino (ID: 302)
- La Taberna (ID: 902)
- Distribuciones Rivera S.L. (ID: 150)
- Almacenes López S.A. (ID: 200)

### Artículos Mock (10)
- Croqueta Jamón - 12.50€ (Stock: 100)
- Croqueta Pollo - 11.00€ (Stock: 85)
- Empanadilla Atún - 10.50€ (Stock: 120)
- Pizza Margarita - 15.00€ (Stock: 60)
- Lasaña Boloñesa - 18.00€ (Stock: 45)
- Guisantes Congelados - 3.50€ (Stock: 200)
- Pimientos Asados - 8.00€ (Stock: 75)
- Tortilla Española - 14.00€ (Stock: 50)
- Nuggets Pollo - 9.50€ (Stock: 15)
- Espinacas Congeladas - 4.00€ (Stock: 180)

---

## Checklist de Puesta en Marcha

- [ ] Obtener IP del servidor ERP
- [ ] Obtener ID de sesión válido
- [ ] Verificar acceso de red (ping, curl)
- [ ] Probar endpoint `GetVersionWS` manualmente
- [ ] Editar `/services/erp.service.ts`:
  - [ ] Reemplazar `ERP_BASE_URL`
  - [ ] Reemplazar `SESSION_ID`
  - [ ] Cambiar `ERP_ENABLED` a `true`
- [ ] Reiniciar aplicación
- [ ] Verificar logs en consola del navegador (F12)
- [ ] Comprobar que clientes y artículos se sincronizan
- [ ] Crear venta de prueba
- [ ] Verificar en ERP que se haya creado el pedido

---

## Logs de Diagnóstico

Al habilitar la conexión, la consola mostrará:

**Sincronización exitosa:**
```
🔄 Sincronizando clientes del ERP: http://...
✅ Clientes obtenidos del ERP: 45
🔄 Sincronizando artículos del ERP: http://...
✅ Artículos obtenidos del ERP: 120
```

**Modo offline:**
```
💾 Usando datos MOCK de clientes (ERP deshabilitado)
✅ Clientes sincronizados: 7
💾 Usando datos MOCK de artículos (ERP deshabilitado)
✅ Artículos sincronizados: 10
```

**Error de conexión:**
```
⚠️ Error al conectar con ERP, usando datos locales
```

---

## Soporte Técnico

**Archivos de configuración principales:**
- `/services/erp.service.ts` - Servicio de conexión al ERP
- `/hooks/useERPSync.ts` - Lógica de sincronización

**Almacenamiento local:**
- `localStorage.colaPendiente` - Operaciones pendientes de sincronizar
- `localStorage.clientes` - Cache de clientes
- `localStorage.articulos` - Cache de artículos

**Reiniciar desde cero:**
```javascript
// Ejecutar en consola del navegador (F12)
localStorage.clear();
location.reload();
```

---

## Consideraciones de Seguridad

1. **HTTP vs HTTPS:** El ERP usa HTTP. Si la app está en HTTPS, el navegador puede bloquear contenido mixto.

2. **CORS:** El servidor ERP debe permitir peticiones desde el origen de la aplicación.

3. **Sesión:** El ID de sesión debe mantenerse seguro. No compartir en repositorios públicos.

4. **Red local:** Si el ERP está en red local, la aplicación debe ejecutarse desde la misma red o tener VPN.

---

## Conclusión

Una vez completada la configuración según esta guía, la aplicación 4Ventas estará completamente integrada con el ERP Verial, permitiendo:

- Sincronización automática de clientes y artículos
- Envío de pedidos en tiempo real
- Registro de pagos
- Operación offline con sincronización diferida
- Trazabilidad completa de operaciones

Para cualquier duda técnica, revisar los logs de consola o consultar el código fuente comentado en `/services/erp.service.ts`.

---

**Versión:** 1.0  
**Fecha:** Noviembre 2024  
**Aplicación:** 4Ventas  
**ERP:** Verial WCF Service Library
