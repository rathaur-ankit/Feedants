import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { IconButton } from '../atoms/IconButton';

export interface SearchBarProps {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChangeText?: (text: string) => void;
  readonly onFilterPress?: () => void;
  readonly onMicPress?: () => void;
  readonly showMic?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onFilterPress,
  onMicPress,
  showMic = false,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.onSurfaceVariant} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        value={value}
        onChangeText={onChangeText}
      />
      {showMic && (
        <IconButton
          icon="mic"
          size={20}
          color={colors.onSurfaceVariant}
          onPress={onMicPress}
          accessibilityLabel="Voice search"
        />
      )}
      {onFilterPress && (
        <IconButton
          icon="options"
          size={20}
          color={colors.onSurfaceVariant}
          onPress={onFilterPress}
          accessibilityLabel="Filters"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    color: colors.onSurface,
  },
});
