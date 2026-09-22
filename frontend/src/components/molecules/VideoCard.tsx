import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface VideoCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly judgeScore: string;
  readonly duration: string;
  readonly views: string;
  readonly votes: string;
  readonly performer: { name: string; contest: string; avatarUrl: string };
  readonly thumbnailUrl: string;
  readonly onPlayPress?: () => void;
  readonly onSharePress?: () => void;
  readonly onVotePress?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  subtitle,
  judgeScore,
  duration,
  views,
  votes,
  performer,
  thumbnailUrl,
  onPlayPress,
  onSharePress,
  onVotePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} accessibilityRole="image" accessibilityLabel={title} />
        <View style={styles.overlay}>
          <View style={styles.topBadges}>
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color={colors.amber500} />
              <Text style={styles.badgeText}>{judgeScore}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{duration}</Text>
            </View>
          </View>
          <Pressable style={styles.playButton} onPress={onPlayPress} accessibilityRole="button" accessibilityLabel="Play video">
            <Ionicons name="play" size={24} color={colors.onPrimary} />
          </Pressable>
          <View style={styles.performerInfo}>
            <Image source={{ uri: performer.avatarUrl }} style={styles.avatar} />
            <View>
              <Text style={styles.performerName}>{performer.name}</Text>
              <Text style={styles.contestName}>{performer.contest}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          </View>
          <Pressable style={styles.iconButton} onPress={onSharePress} accessibilityRole="button" accessibilityLabel="Share">
            <Ionicons name="share-social" size={20} color={colors.onSurfaceVariant} />
          </Pressable>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.viewsContainer}>
            <Ionicons name="eye" size={16} color={colors.onSurfaceVariant} />
            <Text style={styles.viewsText}>{views} views</Text>
          </View>
          <Pressable style={styles.voteButton} onPress={onVotePress} accessibilityRole="button" accessibilityLabel="Vote">
            <Ionicons name="thumbs-up" size={16} color={colors.primary} />
            <Text style={styles.voteText}>{votes}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  topBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    marginLeft: 4,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  performerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.white,
  },
  performerName: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
  contestName: {
    color: colors.surfaceContainer,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.sizes.md,
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
  iconButton: {
    padding: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginLeft: spacing.xs,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  voteText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
