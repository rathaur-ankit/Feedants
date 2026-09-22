import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Winner {
  readonly name: string;
  readonly position: string;
  readonly imageUrl: string;
}

export interface WinnerCarouselProps {
  readonly winners: readonly Winner[];
}

export const WinnerCarousel: React.FC<WinnerCarouselProps> = ({ winners }) => {
  const handlePress = (winner: Winner) => {
    Alert.alert(
      `${winner.name}'s Performance`,
      `Playing winning performance video (${winner.position}) from the previous season.`
    );
  };

  const renderItem = ({ item }: { item: Winner }) => (
    <Pressable style={styles.card} onPress={() => handlePress(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.playButton}>
          <Ionicons name="play" size={10} color="#ffffff" style={styles.playIcon} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
    </Pressable>
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
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingRight: 10,
  },
  imageContainer: {
    width: 68,
    height: 76,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#007d79',
    borderWidth: 1.5,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 1.5,
  },
  infoContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    maxWidth: 90,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  position: {
    fontSize: 11,
    color: '#007d79',
    fontWeight: '500',
  },
});
