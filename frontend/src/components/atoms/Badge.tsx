import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface BadgeProps {
  readonly label: string;
  readonly type?: 'default' | 'hot' | 'fast' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({ label, type = 'default' }) => {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={[styles.text, type === 'default' ? styles.defaultText : styles.coloredText]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  text: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
  },
  default: {
    backgroundColor: colors.surfaceContainer,
  },
  hot: {
    backgroundColor: colors.errorContainer,
  },
  fast: {
    backgroundColor: colors.amber100,
  },
  success: {
    backgroundColor: colors.brand100,
  },
  defaultText: {
    color: colors.onSurfaceVariant,
  },
  coloredText: {
    color: colors.onSurface,
  },
});
