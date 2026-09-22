import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface Winner {
  readonly name: string;
  readonly position: string;
  readonly imageUrl: string;
}

export interface WinnerCarouselProps {
  readonly winners: readonly Winner[];
}

export const WinnerCarousel: React.FC<WinnerCarouselProps> = ({ winners }) => {
  const renderItem = ({ item }: { item: Winner }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={20} color={colors.white} />
        </View>
      </View>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.position}>{item.position}</Text>
    </View>
  );

  return (
    <FlatList
      data={winners}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  card: {
    width: 120,
  },
  imageContainer: {
    width: 120,
    height: 160,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceVariant,
  },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.onSurface,
  },
  position: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    marginTop: 2,
  },
});
