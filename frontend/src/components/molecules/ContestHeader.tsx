import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';

export interface ContestHeaderProps {
  readonly title: string;
  readonly tags: readonly string[];
  readonly certificateNote: string;
  readonly prizePool: string;
  readonly entryFee: string;
  readonly spotsLeft: number;
  readonly totalSpots: number;
}

export const ContestHeader: React.FC<ContestHeaderProps> = ({
  title,
  tags,
  certificateNote,
  prizePool,
  entryFee,
  spotsLeft,
  totalSpots,
}) => {
  const progress = ((totalSpots - spotsLeft) / totalSpots) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={12} color={colors.primary} />
          <Text style={styles.badgeText}>Registered</Text>
        </View>
      </View>

      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        <View style={styles.certificateNote}>
          <Ionicons name="ribbon" size={12} color={colors.amber600} />
          <Text style={styles.certificateText}>{certificateNote}</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Prize Pool</Text>
          <Text style={styles.metricValue}>{prizePool}</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Entry Fee</Text>
          <Text style={styles.metricValue}>{entryFee}</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Spots Left</Text>
          <Text style={styles.metricValue}>{spotsLeft}/{totalSpots}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    ...shadows.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginRight: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.brand100,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  tag: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  tagText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  certificateNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.amber50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  certificateText: {
    fontSize: typography.sizes.xs,
    color: colors.amber800,
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  metricsGrid: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.outlineVariant,
  },
  metricLabel: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.full,
    width: '80%',
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
});
