# 📱 Guía Completa de Migración a React Native - 4Ventas

## 🎯 Visión General

Esta guía documenta la migración completa de 4Ventas de React Web a React Native.

---

## 📦 1. Setup Inicial

### 1.1 Crear Proyecto

```bash
# Opción 1: Expo (Recomendado - más fácil)
npx create-expo-app@latest 4VentasNative --template blank-typescript

# Opción 2: React Native CLI (Más control)
npx react-native@latest init 4VentasNative --template react-native-template-typescript

cd 4VentasNative
```

### 1.2 Instalar Dependencias Esenciales

```bash
# Navegación
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated

# Almacenamiento
npm install @react-native-async-storage/async-storage

# Networking
npm install axios

# UI Components
npm install react-native-paper
npm install react-native-vector-icons

# SVG
npm install react-native-svg

# Bluetooth (para impresora)
npm install react-native-bluetooth-escpos-printer

# DatePicker
npm install @react-native-community/datetimepicker

# Modal
npm install react-native-modal

# Dropdown/Select
npm install react-native-picker-select
```

### 1.3 Configuración Expo (si usas Expo)

```bash
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-gesture-handler react-native-reanimated
```

---

## 🔄 2. Principales Cambios Necesarios

### 2.1 Componentes Web → React Native

| Web | React Native |
|-----|--------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<TouchableOpacity>` o `<Pressable>` |
| `<img>` | `<Image>` |
| `<a>` | `<TouchableOpacity>` con navegación |
| CSS inline styles | `StyleSheet.create()` |

### 2.2 Estilos

**Web:**
```typescript
<div style={{ padding: '20px', backgroundColor: '#fff' }}>
```

**React Native:**
```typescript
import { StyleSheet } from 'react-native';

<View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  }
});
```

**Diferencias importantes:**
- No hay `px`, solo números: `padding: 20` (no `'20px'`)
- `flexDirection: 'column'` por defecto (en web es `row`)
- No hay `width: '100%'` como en web, usa `flex: 1`
- No hay `position: 'fixed'`, usa `position: 'absolute'`

### 2.3 Almacenamiento

**Web:**
```typescript
localStorage.setItem('key', value);
const value = localStorage.getItem('key');
```

**React Native:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('key', value);
const value = await AsyncStorage.getItem('key');
```

### 2.4 Navegación

**Web:**
```typescript
const [screen, setScreen] = useState('login');
```

**React Native:**
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

navigation.navigate('Dashboard');
```

---

## 🏗️ 3. Estructura del Proyecto React Native

```
4VentasNative/
├── App.tsx                          # Entry point
├── app.json                         # Configuración Expo
├── package.json
│
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx        # Navegación principal
│   │   └── types.ts                # Tipos de navegación
│   │
│   ├── screens/                    # Pantallas (convertidas de components/)
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── LoginWithEmailScreen.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.tsx
│   │   ├── ventas/
│   │   │   ├── VentasMenuScreen.tsx
│   │   │   ├── VentasListScreen.tsx
│   │   │   ├── NuevaVentaScreen.tsx
│   │   │   └── VerNotaScreen.tsx
│   │   ├── cobros/
│   │   │   ├── CobrosListScreen.tsx
│   │   │   ├── CobrosScreen.tsx
│   │   │   └── CobrosConfirmacionScreen.tsx
│   │   ├── clientes/
│   │   │   └── ClientesScreen.tsx
│   │   ├── articulos/
│   │   │   └── ArticulosScreen.tsx
│   │   ├── gastos/
│   │   │   └── GastosScreen.tsx
│   │   ├── documentos/
│   │   │   └── DocumentosScreen.tsx
│   │   ├── almacen/
│   │   │   ├── AlmacenMenuScreen.tsx
│   │   │   ├── NotasAlmacenScreen.tsx
│   │   │   └── ResumenStockScreen.tsx
│   │   ├── agenda/
│   │   │   └── AgendaScreen.tsx
│   │   ├── configuracion/
│   │   │   └── ConfiguracionScreen.tsx
│   │   └── comunicacion/
│   │       └── ComunicacionScreen.tsx
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   ├── modals/
│   │   │   ├── SeleccionarClienteModal.tsx
│   │   │   ├── SeleccionarArticuloModal.tsx
│   │   │   ├── DetalleClienteModal.tsx
│   │   │   └── AnularNotaModal.tsx
│   │   └── SyncStatus.tsx
│   │
│   ├── services/                   # Servicios (casi sin cambios)
│   │   ├── erp.service.ts
│   │   ├── sync.service.ts
│   │   ├── printer.service.ts
│   │   ├── agenda.service.ts
│   │   └── storage.service.ts      # NUEVO: Abstracción de AsyncStorage
│   │
│   ├── hooks/
│   │   ├── useERPSync.ts
│   │   └── useStorage.ts           # NUEVO: Hook para AsyncStorage
│   │
│   ├── types/                      # Tipos TypeScript
│   │   ├── index.ts
│   │   ├── navigation.ts
│   │   └── entities.ts
│   │
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   └── layout.ts
│   │
│   └── context/                    # Context API para estado global
│       ├── AppContext.tsx
│       └── AuthContext.tsx
│
└── assets/
    ├── images/
    ├── fonts/
    └── icons/
```

---

## 🔧 4. Conversión de Componentes Principales

### 4.1 Ejemplo: LoginScreen

**Web (antes):**
```typescript
<div style={{ padding: '20px' }}>
  <input type="text" placeholder="Código" />
  <button onClick={handleLogin}>Continuar</button>
</div>
```

**React Native (después):**
```typescript
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

<View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Código"
    keyboardType="numeric"
    maxLength={4}
  />
  <TouchableOpacity style={styles.button} onPress={handleLogin}>
    <Text style={styles.buttonText}>Continuar</Text>
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1A73E8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### 4.2 Ejemplo: Lista (FlatList)

**Web:**
```typescript
{clientes.map(cliente => (
  <div key={cliente.id} onClick={() => select(cliente)}>
    {cliente.nombre}
  </div>
))}
```

**React Native:**
```typescript
import { FlatList } from 'react-native';

<FlatList
  data={clientes}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => select(item)}>
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  )}
/>
```

### 4.3 Ejemplo: Modal

**React Native:**
```typescript
import Modal from 'react-native-modal';

<Modal
  isVisible={isVisible}
  onBackdropPress={() => setIsVisible(false)}
  onSwipeComplete={() => setIsVisible(false)}
  swipeDirection="down"
>
  <View style={styles.modalContent}>
    <Text>Contenido del modal</Text>
  </View>
</Modal>
```

---

## 🛠️ 5. Servicios Adaptados

Los servicios son CASI 100% reutilizables, solo cambiar:

### 5.1 Storage Service (NUEVO)

```typescript
// src/services/storage.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data', error);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
}

export const storageService = new StorageService();
```

### 5.2 ERP Service (solo cambiar fetch)

```typescript
// Cambiar fetch por axios (mejor para React Native)
import axios from 'axios';

export async function getClientes(): Promise<ClienteERP[]> {
  if (!ERP_ENABLED) {
    return getMockClientes();
  }

  try {
    const url = `${ERP_BASE_URL}/GetClientesWS?x=${SESSION_ID}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.warn('Error conectando con ERP', error);
    return getMockClientes();
  }
}
```

### 5.3 Printer Service (Bluetooth)

```typescript
// src/services/printer.service.ts
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

class PrinterService {
  async connect(address: string): Promise<boolean> {
    try {
      await BluetoothEscposPrinter.connect(address);
      return true;
    } catch (error) {
      console.error('Error conectando impresora', error);
      return false;
    }
  }

  async print(job: PrintJob): Promise<boolean> {
    try {
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText('4VENTAS\n', {});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      
      if (job.type === 'venta') {
        await this.printVenta(job.data);
      }
      
      await BluetoothEscposPrinter.printText('\n\n\n', {});
      return true;
    } catch (error) {
      console.error('Error imprimiendo', error);
      return false;
    }
  }

  private async printVenta(venta: any): Promise<void> {
    await BluetoothEscposPrinter.printText(`NOTA: ${venta.numero}\n`, {});
    await BluetoothEscposPrinter.printText(`FECHA: ${venta.fecha}\n`, {});
    await BluetoothEscposPrinter.printText(`CLIENTE: ${venta.cliente}\n`, {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});
    
    for (const art of venta.articulos) {
      await BluetoothEscposPrinter.printText(`${art.nombre}\n`, {});
      await BluetoothEscposPrinter.printText(`  ${art.cantidad} x ${art.precio}\n`, {});
    }
    
    await BluetoothEscposPrinter.printText('------------------------\n', {});
    await BluetoothEscposPrinter.printText(`TOTAL: ${venta.total}\n`, { fonttype: 1 });
  }
}

export const printerService = new PrinterService();
```

---

## 🎨 6. Temas y Estilos

### 6.1 Archivo de Constantes

```typescript
// src/constants/colors.ts
export const colors = {
  primary: '#1A73E8',
  secondary: '#34A853',
  danger: '#EA4335',
  warning: '#FBBC04',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#202124',
  textSecondary: '#5F6368',
  border: '#DADCE0',
  success: '#34A853',
};

// src/constants/layout.ts
export const layout = {
  padding: 16,
  borderRadius: 8,
  headerHeight: 60,
};

// src/constants/fonts.ts
export const fonts = {
  regular: 'System',
  bold: 'System',
  sizes: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 20,
    xxlarge: 24,
  },
};
```

### 6.2 Estilos Comunes

```typescript
// src/styles/common.ts
import { StyleSheet } from 'react-native';
import { colors, layout, fonts } from '../constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
    padding: layout.padding,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: colors.primary,
    padding: layout.padding,
    borderRadius: layout.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: fonts.sizes.large,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius,
    padding: 12,
    fontSize: fonts.sizes.medium,
    backgroundColor: colors.card,
  },
});
```

---

## 🧭 7. Navegación

### 7.1 Setup Básico

```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import NuevaVentaScreen from '../screens/ventas/NuevaVentaScreen';
// ... más screens

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#1A73E8' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: '4Ventas' }}
        />
        <Stack.Screen 
          name="NuevaVenta" 
          component={NuevaVentaScreen}
          options={{ title: 'Nueva Venta' }}
        />
        {/* Más pantallas... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 7.2 Tipos de Navegación

```typescript
// src/navigation/types.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  NuevaVenta: { clienteId?: string };
  VerNota: { notaId: string };
  Cobros: { clienteId: string };
  // ... más rutas
};

// Tipos helpers
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
export type NuevaVentaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NuevaVenta'>;
export type NuevaVentaScreenRouteProp = RouteProp<RootStackParamList, 'NuevaVenta'>;
```

---

## 📱 8. Context API para Estado Global

```typescript
// src/context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Cliente, Articulo, NotaVenta, Cobro, Gasto } from '../types';

interface AppContextType {
  // Estado
  clientes: Cliente[];
  articulos: Articulo[];
  notasVenta: NotaVenta[];
  cobros: Cobro[];
  gastos: Gasto[];
  
  // Acciones
  addNotaVenta: (nota: NotaVenta) => void;
  addCobro: (cobro: Cobro) => void;
  addGasto: (gasto: Gasto) => void;
  updateCobro: (id: string, estado: 'pendiente' | 'pagado') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [notasVenta, setNotasVenta] = useState<NotaVenta[]>([]);
  const [cobros, setCobros] = useState<Cobro[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const addNotaVenta = (nota: NotaVenta) => {
    setNotasVenta([nota, ...notasVenta]);
  };

  const addCobro = (cobro: Cobro) => {
    setCobros([cobro, ...cobros]);
  };

  const addGasto = (gasto: Gasto) => {
    setGastos([gasto, ...gastos]);
  };

  const updateCobro = (id: string, estado: 'pendiente' | 'pagado') => {
    setCobros(cobros.map(c => c.id === id ? { ...c, estado } : c));
  };

  return (
    <AppContext.Provider
      value={{
        clientes,
        articulos,
        notasVenta,
        cobros,
        gastos,
        addNotaVenta,
        addCobro,
        addGasto,
        updateCobro,
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
```

---

## 🚀 9. App.tsx Principal

```typescript
// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1A73E8" />
      <AppNavigator />
    </AppProvider>
  );
}
```

---

## ✅ 10. Checklist de Migración

### Fase 1: Setup (1 día)
- [ ] Crear proyecto React Native
- [ ] Instalar dependencias
- [ ] Configurar navegación básica
- [ ] Configurar TypeScript
- [ ] Crear estructura de carpetas

### Fase 2: Servicios (2-3 días)
- [ ] Adaptar storage.service (AsyncStorage)
- [ ] Adaptar erp.service (axios)
- [ ] Adaptar sync.service
- [ ] Adaptar printer.service (Bluetooth)
- [ ] Adaptar agenda.service
- [ ] Crear hooks (useStorage, useERPSync)

### Fase 3: Componentes Básicos (3-4 días)
- [ ] Button
- [ ] Card
- [ ] Input
- [ ] Modal
- [ ] Badge
- [ ] SyncStatus

### Fase 4: Pantallas Auth (2 días)
- [ ] LoginScreen
- [ ] LoginWithEmailScreen

### Fase 5: Dashboard (3 días)
- [ ] DashboardScreen
- [ ] Métricas
- [ ] Navegación

### Fase 6: Ventas (1 semana)
- [ ] VentasListScreen
- [ ] NuevaVentaScreen
- [ ] SeleccionarClienteModal
- [ ] SeleccionarArticuloModal
- [ ] VerNotaScreen
- [ ] ResumenDiaScreen

### Fase 7: Cobros (4-5 días)
- [ ] CobrosListScreen
- [ ] CobrosScreen
- [ ] CobrosConfirmacionScreen

### Fase 8: Otras Pantallas (1-2 semanas)
- [ ] ClientesScreen
- [ ] ArticulosScreen
- [ ] GastosScreen
- [ ] DocumentosScreen
- [ ] AgendaScreen
- [ ] AlmacenScreen
- [ ] ConfiguracionScreen

### Fase 9: Testing (1 semana)
- [ ] Testing en iOS
- [ ] Testing en Android
- [ ] Testing de sincronización
- [ ] Testing de impresión

### Fase 10: Deployment (2-3 días)
- [ ] Build iOS
- [ ] Build Android
- [ ] Publicar en App Store
- [ ] Publicar en Play Store

**TIEMPO TOTAL ESTIMADO: 6-8 semanas**

---

## 🎯 11. Diferencias Clave a Recordar

### Layout
- **Web**: `display: flex; flex-direction: row;` por defecto
- **RN**: `flexDirection: 'column'` por defecto

### Eventos
- **Web**: `onClick`, `onChange`
- **RN**: `onPress`, `onChangeText`

### Tamaños
- **Web**: `'100px'`, `'50%'`
- **RN**: `100`, no hay `%` para width/height, usa `flex`

### Posicionamiento
- **Web**: `position: fixed`
- **RN**: `position: absolute` (no hay fixed)

### Scrolling
- **Web**: Automático con `overflow: scroll`
- **RN**: Requiere `<ScrollView>` o `<FlatList>`

### Texto
- **Web**: Cualquier elemento puede contener texto
- **RN**: Solo `<Text>` puede contener texto

---

## 📚 12. Recursos

### Documentación Oficial
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)

### Librerías Útiles
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Elements](https://reactnativeelements.com/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

### Tutoriales
- [React Native Tutorial](https://www.youtube.com/watch?v=0-S5a0eXPoc)
- [React Navigation Tutorial](https://www.youtube.com/watch?v=nQVCkqvU1uE)

---

## 🆘 13. Ayuda y Soporte

Si tienes dudas durante la migración:

1. Revisa la documentación oficial de React Native
2. Busca en Stack Overflow
3. Consulta los ejemplos convertidos en este proyecto
4. Usa la comunidad de React Native en Discord/Reddit

---

**Última actualización:** Noviembre 2024  
**Autor:** Equipo 4Ventas
