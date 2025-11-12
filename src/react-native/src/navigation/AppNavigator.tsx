/**
 * Navegación Principal de la App
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import { RootStackParamList } from './types';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import LoginWithEmailScreen from '../screens/auth/LoginWithEmailScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import VentasMenuScreen from '../screens/ventas/VentasMenuScreen';
import VentasListScreen from '../screens/ventas/VentasListScreen';
import NuevaVentaScreen from '../screens/ventas/NuevaVentaScreen';
import VerNotaScreen from '../screens/ventas/VerNotaScreen';
import ResumenDiaScreen from '../screens/ventas/ResumenDiaScreen';
import CobrosListScreen from '../screens/cobros/CobrosListScreen';
import CobrosScreen from '../screens/cobros/CobrosScreen';
import CobrosConfirmacionScreen from '../screens/cobros/CobrosConfirmacionScreen';
import GastosScreen from '../screens/gastos/GastosScreen';
import ClientesScreen from '../screens/clientes/ClientesScreen';
import ArticulosScreen from '../screens/articulos/ArticulosScreen';
import DocumentosScreen from '../screens/documentos/DocumentosScreen';
import AlmacenMenuScreen from '../screens/almacen/AlmacenMenuScreen';
import NotasAlmacenScreen from '../screens/almacen/NotasAlmacenScreen';
import ResumenStockScreen from '../screens/almacen/ResumenStockScreen';
import AgendaScreen from '../screens/agenda/AgendaScreen';
import ComunicacionScreen from '../screens/comunicacion/ComunicacionScreen';
import ConfiguracionScreen from '../screens/configuracion/ConfiguracionScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginEmail"
          component={LoginWithEmailScreen}
          options={{ title: 'Iniciar Sesión' }}
        />

        {/* Dashboard */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: '4Ventas', headerLeft: () => null }}
        />

        {/* Ventas */}
        <Stack.Screen
          name="VentasMenu"
          component={VentasMenuScreen}
          options={{ title: 'Ventas' }}
        />
        <Stack.Screen
          name="VentasList"
          component={VentasListScreen}
          options={{ title: 'Todas las Ventas' }}
        />
        <Stack.Screen
          name="NuevaVenta"
          component={NuevaVentaScreen}
          options={{ title: 'Nueva Venta' }}
        />
        <Stack.Screen
          name="VerNota"
          component={VerNotaScreen}
          options={{ title: 'Ver Nota' }}
        />
        <Stack.Screen
          name="ResumenDia"
          component={ResumenDiaScreen}
          options={{ title: 'Resumen del Día' }}
        />

        {/* Cobros */}
        <Stack.Screen
          name="CobrosList"
          component={CobrosListScreen}
          options={{ title: 'Cobros' }}
        />
        <Stack.Screen
          name="Cobros"
          component={CobrosScreen}
          options={{ title: 'Cobrar' }}
        />
        <Stack.Screen
          name="CobrosConfirmacion"
          component={CobrosConfirmacionScreen}
          options={{ title: 'Confirmación de Cobro' }}
        />

        {/* Gastos */}
        <Stack.Screen
          name="Gastos"
          component={GastosScreen}
          options={{ title: 'Gastos' }}
        />

        {/* Clientes */}
        <Stack.Screen
          name="Clientes"
          component={ClientesScreen}
          options={{ title: 'Clientes' }}
        />

        {/* Artículos */}
        <Stack.Screen
          name="Articulos"
          component={ArticulosScreen}
          options={{ title: 'Artículos' }}
        />

        {/* Documentos */}
        <Stack.Screen
          name="Documentos"
          component={DocumentosScreen}
          options={{ title: 'Documentos' }}
        />

        {/* Almacén */}
        <Stack.Screen
          name="Almacen"
          component={AlmacenMenuScreen}
          options={{ title: 'Almacén' }}
        />
        <Stack.Screen
          name="NotasAlmacen"
          component={NotasAlmacenScreen}
          options={{ title: 'Notas de Almacén' }}
        />
        <Stack.Screen
          name="ResumenStock"
          component={ResumenStockScreen}
          options={{ title: 'Resumen de Stock' }}
        />

        {/* Agenda */}
        <Stack.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{ title: 'Agenda de Visitas' }}
        />

        {/* Comunicación */}
        <Stack.Screen
          name="Comunicacion"
          component={ComunicacionScreen}
          options={{ title: 'Comunicación' }}
        />

        {/* Configuración */}
        <Stack.Screen
          name="Configuracion"
          component={ConfiguracionScreen}
          options={{ title: 'Configuración' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
