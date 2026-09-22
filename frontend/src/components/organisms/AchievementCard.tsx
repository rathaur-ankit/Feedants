import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

export interface AchievementCardProps {
  readonly title: string;
  readonly description: string;
  readonly date: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="medal" size={32} color={colors.amber500} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>1st Place Winner • {date}</Text>
          <Text style={styles.description}>{title}</Text>
          <View style={styles.accreditedRow}>
            <Ionicons name="shield-checkmark" size={14} color={colors.brand600} />
            <Text style={styles.accreditedText}>Accredited by Judge</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionRow}>
        <Pressable style={styles.actionButton}>
          <Ionicons name="download" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.actionText}>Download PDF</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.actionButton}>
          <Ionicons name="logo-linkedin" size={16} color={colors.linkedin} />
          <Text style={styles.actionTextLinked}>Add to LinkedIn</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  contentRow: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: colors.amber50,
    padding: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.xs,
    color: colors.amber600,
    fontWeight: typography.weights.bold,
    marginBottom: 2,
  },
  description: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  accreditedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accreditedText: {
    fontSize: typography.sizes.xs,
    color: colors.brand700,
    fontWeight: typography.weights.medium,
  },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  divider: {
    width: 1,
    backgroundColor: colors.surfaceContainerHigh,
  },
  actionText: {
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  actionTextLinked: {
    fontSize: typography.sizes.sm,
    color: colors.linkedin,
    fontWeight: typography.weights.medium,
  },
});
