import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface ChampionCardProps {
  readonly name: string;
  readonly prize: string;
  readonly place: string;
  readonly imageUrl: string;
  readonly onPlayPress?: () => void;
}

export const ChampionCard: React.FC<ChampionCardProps> = ({
  name,
  prize,
  place,
  imageUrl,
  onPlayPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} accessibilityRole="image" accessibilityLabel={name} />
        <View style={styles.placeBadge}>
          <Text style={styles.placeText}>{place}</Text>
        </View>
        <Pressable
          style={styles.playButton}
          onPress={onPlayPress}
          accessibilityRole="button"
          accessibilityLabel={`Play video of ${name}`}
        >
          <Ionicons name="play" size={24} color={colors.onPrimary} />
        </Pressable>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.prize}>{prize}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: spacing.lg,
  },
  imageContainer: {
    width: 140,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    position: 'relative',
    backgroundColor: colors.surfaceContainer,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  placeText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
  playButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  name: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  prize: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginTop: 2,
  },
});
