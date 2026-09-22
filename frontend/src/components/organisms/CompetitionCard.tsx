import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';
import { Badge } from '../atoms/Badge';
import { JudgeRow } from '../molecules/JudgeRow';
import { ProgressBar } from '../molecules/ProgressBar';

export interface CompetitionCardProps {
  readonly title: string;
  readonly tags: readonly { label: string; type: 'default' | 'hot' | 'fast' }[];
  readonly prizePool: string;
  readonly judge: { name: string; role: string; avatarUrl: string };
  readonly spotsLeft: number;
  readonly totalSpots: number;
  readonly entryFee: string;
  readonly onJoinPress?: () => void;
  readonly onJudgeIntroPress?: () => void;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({
  title,
  tags,
  prizePool,
  judge,
  spotsLeft,
  totalSpots,
  entryFee,
  onJoinPress,
  onJudgeIntroPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagWrapper}>
            <Badge label={tag.label} type={tag.type} />
          </View>
        ))}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.prizeContainer}>
        <Ionicons name="trophy" size={16} color={colors.amber500} />
        <Text style={styles.prizeText}>Prize Pool: {prizePool}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <JudgeRow
        name={judge.name}
        role={judge.role}
        avatarUrl={judge.avatarUrl}
        onIntroPress={onJudgeIntroPress}
      />
      
      <View style={styles.progressWrapper}>
        <ProgressBar
          current={totalSpots - spotsLeft}
          total={totalSpots}
          label={`${spotsLeft} spots left`}
          color={spotsLeft < 15 ? colors.error : colors.primary}
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.feeText}>Entry: {entryFee}</Text>
        <Pressable
          style={styles.joinButton}
          onPress={onJoinPress}
          accessibilityRole="button"
          accessibilityLabel={`Join ${title}`}
        >
          <Text style={styles.joinButtonText}>Join Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  tagWrapper: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  prizeText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    color: colors.amber600,
    marginLeft: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
    marginVertical: spacing.sm,
  },
  progressWrapper: {
    marginVertical: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  feeText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    color: colors.onSurface,
  },
  joinButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  joinButtonText: {
    color: colors.onPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
});
