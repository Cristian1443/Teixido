# 4Ventas - React Native

Sistema de Gestión Comercial para dispositivos móviles (iOS y Android).

## 🚀 Estado del Proyecto

**✅ COMPLETADO:**
- ✅ Estructura base del proyecto
- ✅ Navegación completa (React Navigation)
- ✅ Context API para estado global
- ✅ Servicios adaptados (storage, ERP, printer)
- ✅ Componentes comunes reutilizables
- ✅ Pantallas de autenticación (Login, LoginEmail)
- ✅ Dashboard principal
- ✅ Constantes de estilos (colors, fonts, layout)
- ✅ TypeScript configurado
- ✅ Integración con Bluetooth para impresión

**⚠️ PENDIENTE:**
- 🔨 Implementar pantallas restantes (ver lista abajo)
- 🔨 Completar modales
- 🔨 Testing en dispositivos reales
- 🔨 Optimizaciones de rendimiento

---

## 📦 Instalación

### Requisitos Previos
- Node.js >= 16
- npm o yarn
- Expo CLI (si usas Expo)
- XCode (para iOS)
- Android Studio (para Android)

### Pasos

```bash
# 1. Instalar dependencias
cd react-native
npm install

# 2. Iniciar en modo desarrollo (Expo)
npm start

# 3. Ejecutar en dispositivo específico
npm run ios       # iOS
npm run android   # Android
```

---

## 📁 Estructura

```
react-native/
├── App.tsx                          # Entry point
├── src/
│   ├── navigation/                  # Navegación
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── screens/                     # Pantallas
│   │   ├── auth/                    # ✅ Completadas
│   │   │   ├── LoginScreen.tsx
│   │   │   └── LoginWithEmailScreen.tsx
│   │   ├── dashboard/               # ✅ Completada
│   │   │   └── DashboardScreen.tsx
│   │   ├── ventas/                  # 🔨 Pendientes
│   │   ├── cobros/                  # 🔨 Pendientes
│   │   ├── gastos/                  # 🔨 Pendientes
│   │   ├── clientes/                # 🔨 Pendientes
│   │   ├── articulos/               # 🔨 Pendientes
│   │   ├── documentos/              # 🔨 Pendientes
│   │   ├── almacen/                 # 🔨 Pendientes
│   │   ├── agenda/                  # 🔨 Pendientes
│   │   └── configuracion/           # 🔨 Pendientes
│   ├── components/                  # Componentes
│   │   └── common/                  # ✅ Completados
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Badge.tsx
│   ├── services/                    # ✅ Servicios completados
│   │   ├── storage.service.ts       # AsyncStorage
│   │   ├── erp.service.ts           # API ERP Verial
│   │   └── printer.service.ts       # Bluetooth printing
│   ├── context/                     # ✅ Context API
│   │   └── AppContext.tsx
│   ├── constants/                   # ✅ Constantes
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   └── layout.ts
│   └── types/                       # ✅ Tipos TypeScript
│       └── index.ts
└── package.json
```

---

## 🎨 Componentes Completados

### Button
```tsx
<Button
  title="Guardar"
  onPress={handleSave}
  variant="primary"    // primary | secondary | danger | outline
  size="large"         // small | medium | large
  loading={loading}
  fullWidth
/>
```

### Card
```tsx
<Card onPress={() => {}} elevated>
  <Text>Contenido</Text>
</Card>
```

### Input
```tsx
<Input
  label="Email"
  placeholder="tu@email.com"
  value={email}
  onChangeText={setEmail}
  error={error}
  keyboardType="email-address"
/>
```

### Badge
```tsx
<Badge text="Pendiente" variant="warning" />
```

---

## 🛠️ Servicios

### Storage Service
```tsx
import { storageService } from './services/storage.service';

// Guardar
await storageService.setItem('key', value);

// Obtener
const value = await storageService.getItem('key');

// Eliminar
await storageService.removeItem('key');
```

### ERP Service
```tsx
import * as erpService from './services/erp.service';

// Obtener datos
const clientes = await erpService.getClientes();
const articulos = await erpService.getArticulos();

// Crear venta
const resultado = await erpService.crearDocumentoVenta(documento);
```

### Printer Service
```tsx
import { printerService } from './services/printer.service';

// Escanear impresoras
const devices = await printerService.scanDevices();

// Conectar
await printerService.connect(deviceAddress);

// Imprimir
await printerService.print({
  type: 'venta',
  data: ventaData,
});
```

---

## 🎯 Próximos Pasos

### Pantallas por Implementar

#### Alta Prioridad
1. **NuevaVentaScreen** - Crear ventas
2. **VentasListScreen** - Lista de ventas
3. **CobrosScreen** - Gestión de cobros
4. **ClientesScreen** - Lista de clientes
5. **ArticulosScreen** - Catálogo

#### Media Prioridad
6. **GastosScreen** - Registro de gastos
7. **DocumentosScreen** - Archivos
8. **AgendaScreen** - Visitas
9. **ConfiguracionScreen** - Ajustes

#### Baja Prioridad
10. **AlmacenScreen** - Stock
11. **ComunicacionScreen** - Mensajes

### Patrón para Crear Pantallas

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { colors, layout, fonts } from '../../constants';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TuPantalla'>;
type RoutePropType = RouteProp<RootStackParamList, 'TuPantalla'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

export default function TuPantallaScreen({ navigation, route }: Props) {
  const { clientes, addNotaVenta } = useApp();
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    // Lógica
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Contenido */}
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
  },
});
```

---

## 🐛 Debugging

### Logs
```bash
# Ver logs en tiempo real
npx react-native log-ios      # iOS
npx react-native log-android  # Android
```

### React Native Debugger
```bash
npm install -g react-devtools
react-devtools
```

### Resetear caché
```bash
npm start -- --reset-cache
```

---

## 📱 Testing en Dispositivos

### iOS (Requiere Mac)
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android
```bash
npm run android
```

### Expo Go (Más fácil para desarrollo)
1. Instalar Expo Go en tu teléfono
2. Ejecutar `npm start`
3. Escanear QR con la app

---

## 🚢 Deployment

### Build iOS
```bash
# Expo
eas build --platform ios

# React Native CLI
cd ios
xcodebuild -workspace 4VentasNative.xcworkspace -scheme 4VentasNative -configuration Release
```

### Build Android
```bash
# Expo
eas build --platform android

# React Native CLI
cd android
./gradlew assembleRelease
```

---

## 📚 Recursos

### Documentación
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Docs](https://docs.expo.dev/)

### Guías del Proyecto
- `GUIA_MIGRACION_REACT_NATIVE.md` - Guía completa de migración
- `../DOCUMENTACION_COMPLETA.md` - Documentación del proyecto web

---

## 🆘 Problemas Comunes

### Error de dependencias
```bash
rm -rf node_modules
npm install
```

### Error de caché
```bash
npm start -- --reset-cache
```

### Error de Xcode
```bash
cd ios
pod deintegrate
pod install
```

---

## ✅ Checklist para Continuar

- [ ] Implementar NuevaVentaScreen
- [ ] Implementar VentasListScreen
- [ ] Implementar CobrosScreen
- [ ] Implementar ClientesScreen con FlatList
- [ ] Implementar ArticulosScreen con búsqueda
- [ ] Crear modales (SeleccionarCliente, SeleccionarArticulo)
- [ ] Implementar GastosScreen con cámara
- [ ] Implementar AgendaScreen
- [ ] Implementar ConfiguracionScreen
- [ ] Testing en iOS
- [ ] Testing en Android
- [ ] Optimización de rendimiento
- [ ] Build para producción

---

**Versión:** 1.0  
**Estado:** En Desarrollo  
**Plataformas:** iOS 13+, Android 6.0+  
**Framework:** React Native + Expo
