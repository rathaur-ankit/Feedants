import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface CategoryCardProps {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly liveCount: number;
  readonly onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  subtitle,
  liveCount,
  onPress,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Category ${title}`}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={24} color={colors.primary} />
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>{liveCount} LIVE</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onErrorContainer,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
});
