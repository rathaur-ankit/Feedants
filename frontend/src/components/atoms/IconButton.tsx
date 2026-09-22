import React from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, borderRadius, spacing } from '../../theme';

export interface IconButtonProps {
  readonly icon: string;
  readonly onPress?: () => void;
  readonly type?: 'ionicons' | 'material';
  readonly size?: number;
  readonly color?: string;
  readonly backgroundColor?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly accessibilityLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  type = 'ionicons',
  size = 24,
  color = colors.onSurface,
  backgroundColor = colors.transparent,
  style,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      style={[styles.container, { backgroundColor }, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {type === 'ionicons' ? (
        <Ionicons name={icon as any} size={size} color={color} />
      ) : (
        <MaterialCommunityIcons name={icon as any} size={size} color={color} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
