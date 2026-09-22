import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

export interface ProfileHeaderProps {
  readonly title: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Go back">
        <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
      </Pressable>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.actions}>
        <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Share">
          <Ionicons name="share-social" size={24} color={colors.onSurface} />
        </Pressable>
        <View style={{ width: spacing.sm }} />
        <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Settings">
          <Ionicons name="settings" size={24} color={colors.onSurface} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.xs,
  },
});
