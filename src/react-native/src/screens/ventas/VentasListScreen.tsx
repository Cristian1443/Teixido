/**
 * Lista de Ventas
 * TODO: Implementar FlatList con todas las ventas
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { colors, layout, fonts } from '../../constants';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

type NavigationProp = StackNavigationProp<RootStackParamList, 'VentasList'>;

interface Props {
  navigation: NavigationProp;
}

export default function VentasListScreen({ navigation }: Props) {
  const { notasVenta } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notasVenta}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('VerNota', { notaId: item.id })}>
            <View style={styles.ventaHeader}>
              <Text style={styles.ventaId}>{item.id}</Text>
              <Badge
                text={item.estado || 'cerrada'}
                variant={item.estado === 'pendiente' ? 'warning' : 'success'}
              />
            </View>
            <Text style={styles.cliente}>{item.cliente}</Text>
            <View style={styles.ventaFooter}>
              <Text style={styles.fecha}>{item.fecha}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay ventas registradas</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: layout.padding,
  },
  ventaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ventaId: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  cliente: {
    fontSize: fonts.sizes.medium,
    color: colors.text,
    marginBottom: 8,
  },
  ventaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fecha: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
  },
  precio: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.bold,
    color: colors.success,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 50,
  },
});
