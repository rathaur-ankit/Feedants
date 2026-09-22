import { Platform } from 'react-native';

export const colors = {
  // Primary
  primary: '#005c55',
  primaryContainer: '#0f766e',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#a3faef',
  primaryFixed: '#9cf2e8',
  primaryFixedDim: '#80d5cb',
  
  // Secondary
  secondary: '#006b5f',
  secondaryContainer: '#6df5e1',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#006f64',
  secondaryFixedDim: '#4fdbc8',
  
  // Tertiary
  tertiary: '#005c54',
  tertiaryContainer: '#00776d',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#91fdef',
  tertiaryFixedDim: '#6bd8cb',
  
  // Surface
  surface: '#f8f9ff',
  surfaceBright: '#f8f9ff',
  surfaceDim: '#cbdbf5',
  surfaceContainer: '#e5eeff',
  surfaceContainerHigh: '#dce9ff',
  surfaceContainerHighest: '#d3e4fe',
  surfaceContainerLow: '#eff4ff',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#d3e4fe',
  surfaceTint: '#006a63',
  
  // On Surface
  onSurface: '#0b1c30',
  onSurfaceVariant: '#3e4947',
  onBackground: '#0b1c30',
  background: '#f8f9ff',
  
  // Outline
  outline: '#6e7977',
  outlineVariant: '#bdc9c6',
  
  // Error
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',
  
  // Inverse
  inverseSurface: '#213145',
  inverseOnSurface: '#eaf1ff',
  inversePrimary: '#80d5cb',
  
  // Brand (from contest-details page)
  brand50: '#f0fdfa',
  brand100: '#ccfbf1',
  brand200: '#99f6e4',
  brand500: '#14b8a6',
  brand600: '#0d9488',
  brand700: '#0f766e',
  brand800: '#115e59',
  brand900: '#134e4a',
  
  // Additional
  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber800: '#92400e',
  amber900: '#78350f',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  linkedin: '#0A66C2',
} as const;

export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const typography = {
  fontFamily: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: colors.primaryContainer,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
    },
    android: {
      elevation: 3,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: colors.primaryContainer,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
    },
    android: {
      elevation: 6,
    },
  }),
  fab: Platform.select({
    ios: {
      shadowColor: colors.primaryContainer,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.38,
      shadowRadius: 20,
    },
    android: {
      elevation: 8,
    },
  }),
} as const;
