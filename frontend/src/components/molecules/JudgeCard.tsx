import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface JudgeCardProps {
  readonly name: string;
  readonly specialty: string;
  readonly rating: number;
  readonly reviews: string;
  readonly nextClass: string;
  readonly price: string;
  readonly imageUrl: string;
  readonly onWatchIntro?: () => void;
  readonly onBookSeat?: () => void;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({
  name,
  specialty,
  rating,
  reviews,
  nextClass,
  price,
  imageUrl,
  onWatchIntro,
  onBookSeat,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} accessibilityRole="image" accessibilityLabel={name} />
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={styles.verified} />
        </View>
        <Text style={styles.specialty} numberOfLines={1}>{specialty}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={colors.amber500} />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
        <View style={styles.classInfo}>
          <Ionicons name="time" size={14} color={colors.onSurfaceVariant} />
          <Text style={styles.nextClass} numberOfLines={1}>{nextClass}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Price: </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.introButton} onPress={onWatchIntro} accessibilityRole="button" accessibilityLabel="Watch intro">
            <Ionicons name="play" size={16} color={colors.primary} />
          </Pressable>
          <Pressable style={styles.bookButton} onPress={onBookSeat} accessibilityRole="button" accessibilityLabel="Book seat">
            <Text style={styles.bookText}>Book Seat</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    marginRight: spacing.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceContainer,
  },
  content: {
    padding: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    flex: 1,
  },
  verified: {
    marginLeft: spacing.xs,
  },
  specialty: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginLeft: 4,
    marginRight: 2,
  },
  reviews: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  nextClass: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginLeft: spacing.xs,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  price: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  introButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    marginLeft: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookText: {
    color: colors.onPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
});
