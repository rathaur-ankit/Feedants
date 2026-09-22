import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface CountdownBannerProps {
  readonly countdown: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ countdown }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Ionicons name="hourglass" size={16} color={colors.onPrimaryContainer} />
        <Text style={styles.label}>Registration closes in</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.timer}>{countdown}</Text>
        <Text style={styles.hurry}>Hurry up!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.onPrimaryContainer,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.sm,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  timer: {
    color: colors.onPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  hurry: {
    color: colors.brand200,
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
});
