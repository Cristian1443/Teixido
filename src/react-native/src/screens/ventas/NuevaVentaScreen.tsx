/**
 * Nueva Venta
 * TODO: Implementar formulario completo de venta
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { colors, layout, fonts } from '../../constants';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

type NavigationProp = StackNavigationProp<RootStackParamList, 'NuevaVenta'>;
type RoutePropType = RouteProp<RootStackParamList, 'NuevaVenta'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

export default function NuevaVentaScreen({ navigation, route }: Props) {
  const { addNotaVenta, addCobro } = useApp();
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const [articulos, setArticulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!clienteSeleccionado) {
      Alert.alert('Error', 'Selecciona un cliente');
      return;
    }

    if (articulos.length === 0) {
      Alert.alert('Error', 'Agrega al menos un artículo');
      return;
    }

    setLoading(true);

    // Calcular total
    const total = articulos.reduce((sum, art) => sum + (art.cantidad * art.precio), 0);

    // Crear nota de venta
    const notaId = `P${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    const nuevaNota = {
      id: notaId,
      cliente: clienteSeleccionado.nombre,
      clienteId: clienteSeleccionado.id,
      precio: `${total.toFixed(2)} €`,
      fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      items: articulos,
      estado: 'cerrada' as const,
      formaPago: 'Efectivo',
    };

    await addNotaVenta(nuevaNota);

    setLoading(false);

    Alert.alert('Éxito', 'Venta creada correctamente', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Dashboard'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cliente */}
        <Card>
          <Text style={styles.sectionTitle}>Cliente</Text>
          {clienteSeleccionado ? (
            <View>
              <Text style={styles.clienteNombre}>{clienteSeleccionado.nombre}</Text>
              <Button
                title="Cambiar Cliente"
                onPress={() => {/* TODO: Abrir modal */}}
                variant="outline"
                size="small"
              />
            </View>
          ) : (
            <Button
              title="Seleccionar Cliente"
              onPress={() => {/* TODO: Abrir modal */}}
              fullWidth
            />
          )}
        </Card>

        {/* Artículos */}
        <Card>
          <Text style={styles.sectionTitle}>Artículos</Text>
          {articulos.length === 0 ? (
            <Text style={styles.emptyText}>No hay artículos agregados</Text>
          ) : (
            articulos.map((art, index) => (
              <View key={index} style={styles.articuloItem}>
                <Text>{art.nombre}</Text>
                <Text>{art.cantidad} x {art.precio}€</Text>
              </View>
            ))
          )}
          <Button
            title="+ Agregar Artículo"
            onPress={() => {/* TODO: Abrir modal */}}
            variant="outline"
            fullWidth
          />
        </Card>

        {/* Botones */}
        <Button
          title="Guardar Venta"
          onPress={handleSave}
          loading={loading}
          fullWidth
          size="large"
        />
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
  sectionTitle: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: 12,
  },
  clienteNombre: {
    fontSize: fonts.sizes.medium,
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 16,
  },
  articuloItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
});
