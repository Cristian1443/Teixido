/**
 * Pantalla de Login con Código PIN
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../constants/colors';
import { layout, fonts } from '../../constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');

    if (codigo.length !== 4) {
      setError('El código debe tener 4 dígitos');
      return;
    }

    setLoading(true);

    // Simular autenticación
    setTimeout(() => {
      setLoading(false);
      // Por ahora, cualquier código de 4 dígitos es válido
      navigation.replace('Dashboard');
    }, 1000);
  };

  const handleLoginWithEmail = () => {
    navigation.navigate('LoginEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>4Ventas</Text>
          <Text style={styles.subtitle}>Sistema de Gestión Comercial</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>
          
          <Input
            label="Código de Acceso"
            placeholder="Introduce tu código"
            value={codigo}
            onChangeText={(text) => {
              setCodigo(text);
              setError('');
            }}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            error={error}
            autoFocus
          />

          <Button
            title="Continuar"
            onPress={handleLogin}
            loading={loading}
            disabled={codigo.length !== 4}
            fullWidth
            size="large"
          />

          <Button
            title="Continuar con Email"
            onPress={handleLoginWithEmail}
            variant="outline"
            fullWidth
            size="large"
            style={styles.emailButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Versión 1.0 - Modo {Platform.OS === 'ios' ? 'iOS' : 'Android'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: layout.paddingLarge,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: fonts.sizes.large,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  formTitle: {
    fontSize: fonts.sizes.xxlarge,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: layout.paddingLarge,
  },
  emailButton: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: fonts.sizes.small,
    color: colors.textSecondary,
  },
});
