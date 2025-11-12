/**
 * Menú de Ventas
 * TODO: Implementar opciones del menú
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, layout, fonts } from '../../constants';
import Card from '../../components/common/Card';

type NavigationProp = StackNavigationProp<RootStackParamList, 'VentasMenu'>;

interface Props {
  navigation: NavigationProp;
}

export default function VentasMenuScreen({ navigation }: Props) {
  const options = [
    { title: 'Nueva Venta', screen: 'NuevaVenta' as keyof RootStackParamList },
    { title: 'Ver Ventas', screen: 'VentasList' as keyof RootStackParamList },
    { title: 'Resumen del Día', screen: 'ResumenDia' as keyof RootStackParamList },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(option.screen)}
          >
            <Card>
              <Text style={styles.optionText}>{option.title}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: layout.padding,
  },
  optionText: {
    fontSize: fonts.sizes.large,
    color: colors.text,
    fontWeight: fonts.weights.medium,
  },
});
