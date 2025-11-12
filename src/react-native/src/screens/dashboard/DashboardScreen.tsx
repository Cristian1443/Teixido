/**
 * Pantalla Principal - Dashboard
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../context/AppContext';
import { colors } from '../../constants/colors';
import { layout, fonts } from '../../constants';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: NavigationProp;
}

export default function DashboardScreen({ navigation }: Props) {
  const { notasVenta, cobros, gastos, loading } = useApp();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Calcular métricas
  const ventasHoy = notasVenta.filter(v => v.fecha.includes('Hoy') || v.fecha.includes(':')).length;
  const totalVentas = notasVenta
    .filter(v => v.fecha.includes('Hoy') || v.fecha.includes(':'))
    .reduce((sum, v) => sum + parseFloat(v.precio.replace(',', '.').replace('€', '').trim() || '0'), 0);

  const cobrosPendientes = cobros.filter(c => c.estado === 'pendiente').length;
  const montoCobrosPendientes = cobros
    .filter(c => c.estado === 'pendiente')
    .reduce((sum, c) => sum + parseFloat(c.monto.replace(',', '.').replace('€', '').trim() || '0'), 0);

  const gastosHoy = gastos.length;
  const totalGastos = gastos.reduce(
    (sum, g) => sum + parseFloat(g.precio.replace(',', '.').replace('€', '').trim() || '0'),
    0
  );

  const menuOptions = [
    {
      title: 'Ventas',
      subtitle: `${ventasHoy} ventas hoy`,
      color: colors.primary,
      screen: 'VentasMenu' as keyof RootStackParamList,
    },
    {
      title: 'Cobros',
      subtitle: `${cobrosPendientes} pendientes`,
      color: colors.warning,
      screen: 'CobrosList' as keyof RootStackParamList,
    },
    {
      title: 'Gastos',
      subtitle: `${gastosHoy} registrados`,
      color: colors.danger,
      screen: 'Gastos' as keyof RootStackParamList,
    },
    {
      title: 'Clientes',
      subtitle: 'Ver todos',
      color: colors.secondary,
      screen: 'Clientes' as keyof RootStackParamList,
    },
    {
      title: 'Artículos',
      subtitle: 'Catálogo',
      color: colors.primary,
      screen: 'Articulos' as keyof RootStackParamList,
    },
    {
      title: 'Documentos',
      subtitle: 'Archivos',
      color: colors.secondary,
      screen: 'Documentos' as keyof RootStackParamList,
    },
    {
      title: 'Agenda',
      subtitle: 'Visitas',
      color: colors.warning,
      screen: 'Agenda' as keyof RootStackParamList,
    },
    {
      title: 'Almacén',
      subtitle: 'Stock',
      color: colors.primary,
      screen: 'Almacen' as keyof RootStackParamList,
    },
    {
      title: 'Comunicación',
      subtitle: 'Mensajes',
      color: colors.secondary,
      screen: 'Comunicacion' as keyof RootStackParamList,
    },
    {
      title: 'Configuración',
      subtitle: 'Ajustes',
      color: colors.textSecondary,
      screen: 'Configuracion' as keyof RootStackParamList,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hola, Vendedor</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</Text>
        </View>

        {/* Métricas */}
        <View style={styles.metricsContainer}>
          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: colors.primary }]}>
            <Text style={styles.metricLabel}>Ventas Hoy</Text>
            <Text style={styles.metricValue}>{totalVentas.toFixed(2)} €</Text>
            <Text style={styles.metricSubtitle}>{ventasHoy} ventas</Text>
          </Card>

          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: colors.warning }]}>
            <Text style={styles.metricLabel}>Cobros Pendientes</Text>
            <Text style={styles.metricValue}>{montoCobrosPendientes.toFixed(2)} €</Text>
            <Text style={styles.metricSubtitle}>{cobrosPendientes} cobros</Text>
          </Card>

          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: colors.danger }]}>
            <Text style={styles.metricLabel}>Gastos</Text>
            <Text style={styles.metricValue}>{totalGastos.toFixed(2)} €</Text>
            <Text style={styles.metricSubtitle}>{gastosHoy} registros</Text>
          </Card>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('NuevaVenta', {})}
            >
              <Text style={styles.quickActionText}>+ Nueva Venta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.secondary }]}
              onPress={() => navigation.navigate('CobrosList')}
            >
              <Text style={styles.quickActionText}>Cobrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: colors.warning }]}
              onPress={() => navigation.navigate('Gastos')}
            >
              <Text style={styles.quickActionText}>+ Gasto</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menú Principal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menú Principal</Text>
          
          <View style={styles.menuGrid}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(option.screen)}
              >
                <Card style={styles.menuCard}>
                  <View style={[styles.menuIcon, { backgroundColor: option.color }]} />
                  <Text style={styles.menuTitle}>{option.title}</Text>
                  <Text style={styles.menuSubtitle}>{option.subtitle}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sincronización */}
        <View style={styles.syncStatus}>
          <Badge text="Sincronizado" variant="success" />
          <Text style={styles.syncText}>Última sync: hace 5 min</Text>
        </View>
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
  header: {
    padding: layout.padding,
    backgroundColor: colors.card,
    marginBottom: layout.padding,
  },
  greeting: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.bold,
    color: colors.text,
  },
  date: {
    fontSize: fonts.sizes.medium,
    color: colors.textSecondary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  metricsContainer: {
    padding: layout.padding,
  },
  metricCard: {
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
  },
  section: {
    padding: layout.padding,
  },
  sectionTitle: {
    fontSize: fonts.sizes.large,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: layout.padding,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    padding: layout.padding,
    borderRadius: layout.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  quickActionText: {
    color: colors.textLight,
    fontSize: fonts.sizes.medium,
    fontWeight: fonts.weights.bold,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: '48%',
  },
  menuCard: {
    alignItems: 'center',
    padding: layout.padding,
    minHeight: 120,
    justifyContent: 'center',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: fonts.sizes.medium,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  syncStatus: {
    padding: layout.padding,
    alignItems: 'center',
  },
  syncText: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
