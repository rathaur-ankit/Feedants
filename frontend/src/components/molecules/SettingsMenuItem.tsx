import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

export interface SettingsMenuItemProps {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly label: string;
  readonly subtitle?: string;
  readonly value?: string;
  readonly badge?: string;
}

export const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  label,
  subtitle,
  value,
  badge,
}) => {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.rightContent}>
        {value && <Text style={styles.value}>{value}</Text>}
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color={colors.outlineVariant} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surfaceContainerLowest,
  },
  iconContainer: {
    backgroundColor: colors.surfaceContainer,
    padding: spacing.sm,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.onSurface,
    fontWeight: typography.weights.medium,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  badge: {
    backgroundColor: colors.amber100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: colors.amber800,
    fontWeight: typography.weights.bold,
  },
});
