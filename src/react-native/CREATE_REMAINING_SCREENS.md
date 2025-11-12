# Crear Pantallas Restantes

Este archivo te guía para crear todas las pantallas que faltan.  
Todas siguen el mismo patrón - solo copia, pega y adapta.

---

## 📝 Template Base

```tsx
/**
 * [Nombre de la Pantalla]
 * TODO: [Descripción de funcionalidad]
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { colors, layout, fonts } from '../../constants';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

type NavigationProp = StackNavigationProp<RootStackParamList, 'NombrePantalla'>;
type RoutePropType = RouteProp<RootStackParamList, 'NombrePantalla'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

export default function NombrePantallaScreen({ navigation, route }: Props) {
  const { /* datos del context */ } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* CONTENIDO AQUÍ */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: layout.padding,
  },
});
```

---

## 🎯 Pantallas Pendientes

### 1. VerNotaScreen.tsx
**Ruta:** `src/screens/ventas/VerNotaScreen.tsx`

```tsx
// Mostrar detalle de una venta
// Recibir: route.params.notaId
// Mostrar: Cliente, artículos, total, estado
// Botones: Modificar, Anular, Cerrar, Imprimir
```

### 2. ResumenDiaScreen.tsx
**Ruta:** `src/screens/ventas/ResumenDiaScreen.tsx`

```tsx
// Resumen del día
// Mostrar:
// - Total ventas
// - Total cobros
// - Total gastos
// - Balance neto
// Botón: Imprimir resumen
```

### 3. CobrosListScreen.tsx
**Ruta:** `src/screens/cobros/CobrosListScreen.tsx`

```tsx
// Lista de clientes con cobros pendientes
// FlatList con:
// - Nombre cliente
// - Badge "COBRAR AHORA" si tiene cobros pendientes
// - Monto pendiente
// Al tocar: navegar a CobrosScreen con clienteId
```

### 4. CobrosScreen.tsx
**Ruta:** `src/screens/cobros/CobrosScreen.tsx`

```tsx
// Pantalla de cobro
// Recibir: route.params.clienteId
// Mostrar notas pendientes del cliente
// Checkbox para seleccionar cuáles cobrar
// Input: Forma de pago (Picker)
// Calcular total
// Botón: Confirmar Cobro
```

### 5. CobrosConfirmacionScreen.tsx
**Ruta:** `src/screens/cobros/CobrosConfirmacionScreen.tsx`

```tsx
// Confirmación de cobro realizado
// Mostrar: Cliente, monto, forma de pago
// Botones: Imprimir Comprobante, Volver
```

### 6. GastosScreen.tsx
**Ruta:** `src/screens/gastos/GastosScreen.tsx`

```tsx
// Lista de gastos (FlatList)
// Botón + para nuevo gasto
// Modal/Sheet para agregar:
// - Input nombre
// - Picker categoría (Combustible, Comida, Otros)
// - Input monto
// - Botón tomar foto (opcional)
// Swipe para eliminar
```

### 7. ClientesScreen.tsx
**Ruta:** `src/screens/clientes/ClientesScreen.tsx`

```tsx
// FlatList de clientes
// SearchBar para buscar
// Card con:
// - Nombre
// - Empresa
// - Badge si tiene cobros pendientes
// Al tocar: Modal con detalle
// Modal incluye:
// - Teléfono, email, dirección
// - Botones: Llamar, WhatsApp
// - Historial de ventas
```

### 8. ArticulosScreen.tsx
**Ruta:** `src/screens/articulos/ArticulosScreen.tsx`

```tsx
// FlatList de artículos
// SearchBar
// Picker para filtrar por categoría
// Card con:
// - Nombre
// - Stock actual
// - Precio
// - Badge rojo si stock < stockMinimo
```

### 9. DocumentosScreen.tsx
**Ruta:** `src/screens/documentos/DocumentosScreen.tsx`

```tsx
// FlatList de documentos
// Filtro por categoría
// Card con:
// - Nombre
// - Categoría
// - Fecha
// - Tamaño
// Al tocar: Abrir PDF
// Usar: react-native-pdf o expo-document-picker
```

### 10. AlmacenMenuScreen.tsx
**Ruta:** `src/screens/almacen/AlmacenMenuScreen.tsx`

```tsx
// Menú con opciones:
// - Notas de Almacén
// - Resumen de Stock
```

### 11. NotasAlmacenScreen.tsx
**Ruta:** `src/screens/almacen/NotasAlmacenScreen.tsx`

```tsx
// FlatList de notas de almacén
// Botón + para nueva nota
// Tipos: Carga, Descarga, Inventario, Intercambio
```

### 12. ResumenStockScreen.tsx
**Ruta:** `src/screens/almacen/ResumenStockScreen.tsx`

```tsx
// Resumen de stock
// Artículos con stock bajo
// Total de artículos
```

### 13. AgendaScreen.tsx
**Ruta:** `src/screens/agenda/AgendaScreen.tsx`

```tsx
// Calendario o lista de visitas
// Botón + nueva visita
// Card visita:
// - Cliente
// - Fecha y hora
// - Tipo
// - Estado
// Al tocar: Modal para completar visita
```

### 14. ComunicacionScreen.tsx
**Ruta:** `src/screens/comunicacion/ComunicacionScreen.tsx`

```tsx
// Centro de comunicación
// Placeholder por ahora
```

### 15. ConfiguracionScreen.tsx
**Ruta:** `src/screens/configuracion/ConfiguracionScreen.tsx`

```tsx
// Secciones:
// 1. Impresora
//    - Botón: Buscar impresoras
//    - Seleccionar de lista
//    - Botón: Conectar
//    - Botón: Prueba de impresión
// 2. Sincronización
//    - Estado actual
//    - Botón: Sincronizar ahora
//    - Operaciones pendientes: X
// 3. Datos
//    - Botón: Exportar datos
//    - Botón: Importar datos
//    - Botón: Limpiar caché
```

---

## 🎨 Componentes de UI Útiles

### SearchBar
```tsx
<Input
  placeholder="Buscar..."
  value={search}
  onChangeText={setSearch}
  rightElement={
    <Icon name="search" size={20} color={colors.textSecondary} />
  }
/>
```

### Picker (Selector)
```tsx
import RNPickerSelect from 'react-native-picker-select';

<RNPickerSelect
  onValueChange={(value) => setSelected(value)}
  items={[
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
  ]}
/>
```

### Checkbox
```tsx
import { Checkbox } from 'react-native-paper';

<Checkbox
  status={checked ? 'checked' : 'unchecked'}
  onPress={() => setChecked(!checked)}
/>
```

### Modal
```tsx
import Modal from 'react-native-modal';

<Modal
  isVisible={isVisible}
  onBackdropPress={() => setIsVisible(false)}
  onSwipeComplete={() => setIsVisible(false)}
  swipeDirection="down"
>
  <View style={styles.modalContent}>
    {/* Contenido */}
  </View>
</Modal>
```

### Loading Overlay
```tsx
{loading && (
  <View style={styles.loadingOverlay}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
)}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
```

---

## ⚡ Atajos de Código

### FlatList con EmptyComponent
```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  ListEmptyComponent={
    <Text style={styles.emptyText}>No hay datos</Text>
  }
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

### Alert para confirmar
```tsx
import { Alert } from 'react-native';

Alert.alert(
  'Confirmar',
  '¿Estás seguro?',
  [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Sí', onPress: () => handleDelete() },
  ]
);
```

### Swipe para eliminar
```tsx
import { Swipeable } from 'react-native-gesture-handler';

const renderRightActions = () => (
  <TouchableOpacity
    style={styles.deleteButton}
    onPress={() => handleDelete(item.id)}
  >
    <Text style={styles.deleteText}>Eliminar</Text>
  </TouchableOpacity>
);

<Swipeable renderRightActions={renderRightActions}>
  <Card>{/* Contenido */}</Card>
</Swipeable>
```

---

## 🚀 Flujo de Trabajo Recomendado

1. **Copiar template base**
2. **Importar datos del Context** (`useApp()`)
3. **Crear UI básica** con Card y Text
4. **Agregar FlatList** si es lista
5. **Agregar botones** de acción
6. **Implementar lógica** (guardar, eliminar, etc.)
7. **Probar en emulador**
8. **Refinar estilos**

---

## ✅ Testing Rápido

Para probar cada pantalla:

```bash
# 1. Iniciar app
npm start

# 2. En Dashboard, navegar a la pantalla
# 3. Verificar que:
#    - Se muestra correctamente
#    - No hay errores en consola
#    - Botones funcionan
#    - Datos se guardan en Context
```

---

**¡Suerte con la implementación!** 🎉

Recuerda: El 40% ya está hecho. Solo es copiar y adaptar el patrón.
