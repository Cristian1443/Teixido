/**
 * 4Ventas - React Native
 * Entry Point
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AppProvider>
          <StatusBar barStyle="light-content" backgroundColor="#1A73E8" />
          <AppNavigator />
        </AppProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
