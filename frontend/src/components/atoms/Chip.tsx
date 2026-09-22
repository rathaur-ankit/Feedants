import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface ChipProps {
  readonly label: string;
  readonly emoji?: string;
  readonly isActive?: boolean;
  readonly onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, emoji, isActive, onPress }) => {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  activeContainer: {
    backgroundColor: colors.primary,
  },
  emoji: {
    marginRight: spacing.xs,
    fontSize: typography.sizes.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
    color: colors.onSurfaceVariant,
  },
  activeLabel: {
    color: colors.onPrimary,
  },
});
