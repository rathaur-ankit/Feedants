import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface JudgeRowProps {
  readonly name: string;
  readonly role: string;
  readonly avatarUrl: string;
  readonly onIntroPress?: () => void;
}

export const JudgeRow: React.FC<JudgeRowProps> = ({ name, role, avatarUrl, onIntroPress }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} accessibilityRole="image" accessibilityLabel={name} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      {onIntroPress && (
        <Pressable
          style={styles.introButton}
          onPress={onIntroPress}
          accessibilityRole="button"
          accessibilityLabel={`Watch intro for ${name}`}
        >
          <Ionicons name="play" size={16} color={colors.primary} />
          <Text style={styles.introText}>Intro</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  role: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  introButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  introText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
