import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface Reward {
  readonly position: string;
  readonly emoji: string;
  readonly amount: string;
}

export interface RewardsTableProps {
  readonly rewards: readonly Reward[];
}

export const RewardsTable: React.FC<RewardsTableProps> = ({ rewards }) => {
  return (
    <View style={styles.container}>
      {rewards.map((reward, index) => (
        <View 
          key={index} 
          style={[
            styles.row, 
            index !== rewards.length - 1 && styles.borderBottom
          ]}
        >
          <View style={styles.leftCol}>
            <Text style={styles.emoji}>{reward.emoji}</Text>
            <Text style={styles.position}>{reward.position}</Text>
          </View>
          <Text style={styles.amount}>{reward.amount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainerLowest,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: typography.sizes.lg,
    marginRight: spacing.sm,
  },
  position: {
    fontSize: typography.sizes.sm,
    color: colors.onSurface,
    fontWeight: typography.weights.medium,
  },
  amount: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});
