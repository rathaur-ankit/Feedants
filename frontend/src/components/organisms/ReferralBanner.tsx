import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface ReferralBannerProps {
  readonly link: string;
  readonly onCopyPress?: () => void;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ link, onCopyPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="megaphone" size={24} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Refer & Earn ₹50</Text>
          <Text style={styles.subtitle}>Invite friends to Feedants and get rewarded.</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={link}
          editable={false}
        />
        <Pressable
          style={styles.copyButton}
          onPress={onCopyPress}
          accessibilityRole="button"
          accessibilityLabel="Copy referral link"
        >
          <Text style={styles.copyButtonText}>Copy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brand50,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.brand200,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brand100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  copyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonText: {
    color: colors.onPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
});
