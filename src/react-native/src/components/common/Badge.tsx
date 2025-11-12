/**
 * Componente Badge Reutilizable
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  style?: ViewStyle;
}

export default function Badge({ text, variant = 'info', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fonts.sizes.small,
    fontWeight: fonts.weights.medium,
    color: colors.textLight,
  },
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  info: {
    backgroundColor: colors.primary,
  },
});
