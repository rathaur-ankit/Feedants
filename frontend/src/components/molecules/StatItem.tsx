import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export interface StatItemProps {
  readonly label: string;
  readonly value: string | number;
}

export const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: 2,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
