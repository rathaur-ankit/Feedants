import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Reward {
  readonly position: string;
  readonly emoji: string;
  readonly amount: string;
}

export interface RewardsTableProps {
  readonly rewards: readonly Reward[];
}

export const RewardsTable: React.FC<RewardsTableProps> = ({ rewards }) => {
  const renderIcon = (index: number) => {
    if (index === 0) {
      return <Text style={styles.trophyEmoji}>🏆</Text>;
    } else if (index === 1) {
      return <Text style={styles.medalEmoji}>🥈</Text>;
    } else if (index === 2) {
      return <Text style={styles.medalEmoji}>🥉</Text>;
    } else {
      return <Ionicons name="star-outline" size={17} color="#007d79" style={styles.starIcon} />;
    }
  };

  return (
    <View style={styles.container}>
      {rewards.map((reward, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.leftCol}>
            {renderIcon(index)}
            <Text style={styles.positionText}>{reward.position}</Text>
          </View>
          <Text style={styles.amountText}>{reward.amount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyEmoji: {
    fontSize: 16,
    marginRight: 12,
  },
  medalEmoji: {
    fontSize: 16,
    marginRight: 12,
  },
  starIcon: {
    marginRight: 12,
  },
  positionText: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  amountText: {
    fontSize: 14,
    color: '#007d79',
    fontWeight: '700',
  },
});
