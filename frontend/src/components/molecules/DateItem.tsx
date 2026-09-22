import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface DateItemProps {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly label: string;
  readonly date: string;
  readonly time: string;
}

export const DateItem: React.FC<DateItemProps> = ({ icon, label, date, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: colors.brand50,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
  },
  date: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.onSurface,
    marginBottom: 2,
  },
  time: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
  },
});
