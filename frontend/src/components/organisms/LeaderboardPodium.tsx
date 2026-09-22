import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface LeaderboardUser {
  readonly id: string;
  readonly rank: number;
  readonly name: string;
  readonly points: string;
  readonly wins: string;
  readonly imageUrl: string;
}

export interface LeaderboardPodiumProps {
  readonly topThree: readonly LeaderboardUser[];
}

const PodiumItem = ({ user, isFirst }: { user: LeaderboardUser; isFirst?: boolean }) => {
  return (
    <View style={[styles.podiumItem, isFirst && styles.firstPlaceItem]}>
      <View style={styles.avatarContainer}>
        {isFirst && (
          <Ionicons name="ribbon" size={24} color={colors.amber500} style={styles.crown} />
        )}
        <Image source={{ uri: user.imageUrl }} style={[styles.avatar, isFirst && styles.firstPlaceAvatar]} />
        <View style={[styles.rankBadge, isFirst && styles.firstRankBadge]}>
          <Text style={styles.rankText}>{user.rank}</Text>
        </View>
      </View>
      <Text style={[styles.name, isFirst && styles.firstName]} numberOfLines={1}>{user.name}</Text>
      <Text style={styles.points}>{user.points}</Text>
      <Text style={styles.wins}>{user.wins}</Text>
    </View>
  );
};

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ topThree }) => {
  const rank1 = topThree.find(u => u.rank === 1);
  const rank2 = topThree.find(u => u.rank === 2);
  const rank3 = topThree.find(u => u.rank === 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={24} color={colors.amber500} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Monthly Leaderboard</Text>
          <View style={styles.prizeBadge}>
            <Text style={styles.prizeText}>Prize Pool: ₹10,000</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.podium}>
        {rank2 && <PodiumItem user={rank2} />}
        {rank1 && <PodiumItem user={rank1} isFirst />}
        {rank3 && <PodiumItem user={rank3} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginVertical: spacing.lg,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerText: {
    marginLeft: spacing.md,
  },
  title: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  prizeBadge: {
    backgroundColor: colors.amber100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  prizeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.amber800,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  firstPlaceItem: {
    transform: [{ translateY: -20 }],
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  firstPlaceAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.amber500,
    borderWidth: 3,
  },
  crown: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    zIndex: 1,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceContainerLowest,
  },
  firstRankBadge: {
    backgroundColor: colors.amber500,
  },
  rankText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  name: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  firstName: {
    fontSize: typography.sizes.md,
  },
  points: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginTop: 2,
  },
  wins: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
});
