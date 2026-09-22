import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface CompetitionListCardProps {
  readonly title: string;
  readonly category: string;
  readonly status: 'Registered' | 'Upcoming';
  readonly deadline: string;
  readonly imageUrl: string;
  readonly slot?: string;
  readonly onPress?: () => void;
  readonly onUploadPress?: () => void;
}

export const CompetitionListCard: React.FC<CompetitionListCardProps> = ({
  title,
  category,
  status,
  deadline,
  imageUrl,
  slot,
  onPress,
  onUploadPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.cardMain}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`View ${title}`}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.tagsRow}>
            <Text style={styles.categoryText}>{category}</Text>
            <View style={[styles.badge, status === 'Upcoming' && styles.badgeUpcoming]}>
              <Text style={[styles.badgeText, status === 'Upcoming' && styles.badgeTextUpcoming]}>{status}</Text>
            </View>
          </View>
          
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.deadline}>{deadline}</Text>
          
          {slot && (
            <View style={styles.slotRow}>
              <Ionicons name="information-circle-outline" size={14} color={colors.onSurfaceVariant} />
              <Text style={styles.slotText}>{slot}</Text>
            </View>
          )}
        </View>
      </Pressable>

      {status === 'Registered' && (
        <Pressable
          style={styles.uploadButton}
          onPress={onUploadPress || onPress}
          accessibilityRole="button"
          accessibilityLabel={`Upload video for ${title}`}
        >
          <Ionicons name="cloud-upload-outline" size={16} color={colors.primary} />
          <Text style={styles.uploadText}>Upload Video</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardMain: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceVariant,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  badge: {
    backgroundColor: colors.brand50,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  badgeUpcoming: {
    backgroundColor: colors.amber50,
  },
  badgeText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  badgeTextUpcoming: {
    color: colors.amber600,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: 2,
  },
  deadline: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slotText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    gap: 4,
    marginLeft: spacing.sm,
  },
  uploadText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});
