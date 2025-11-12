/**
 * Componente Input Reutilizable
 */

import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { layout, fonts } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  containerStyle,
  rightElement,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            rightElement && styles.inputWithRight,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          {...rest}
        />
        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: fonts.sizes.medium,
    fontWeight: fonts.weights.medium,
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius,
    padding: 12,
    fontSize: fonts.sizes.medium,
    backgroundColor: colors.card,
    color: colors.text,
  },
  inputWithRight: {
    paddingRight: 50,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    fontSize: fonts.sizes.small,
    color: colors.danger,
    marginTop: 4,
  },
  rightElement: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
