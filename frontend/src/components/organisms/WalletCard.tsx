import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface WalletCardProps {
  readonly balance: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({ balance }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.balanceInfo}>
          <View style={styles.labelRow}>
            <Ionicons name="wallet" size={16} color={colors.onSurfaceVariant} />
            <Text style={styles.label}>WALLET BALANCE</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>{balance}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Available</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.withdrawButton}>
          <Text style={styles.withdrawText}>Withdraw</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
        </Pressable>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.bottomRow}>
        <View style={styles.payoutInfo}>
          <Ionicons name="flash" size={14} color={colors.amber600} />
          <Text style={styles.payoutText}>Instant payouts via UPI/Bank</Text>
        </View>
        <Pressable>
          <Text style={styles.historyLink}>History</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerHighest,
    marginHorizontal: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  balanceInfo: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.sm,
    letterSpacing: 0.5,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  amount: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  statusBadge: {
    backgroundColor: colors.brand100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    color: colors.brand700,
    fontWeight: typography.weights.medium,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  withdrawText: {
    color: colors.onPrimary,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    opacity: 0.5,
    marginBottom: spacing.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  payoutText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
  },
  historyLink: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
});
