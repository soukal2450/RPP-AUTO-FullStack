// Industrial AI Dark Theme
export const Colors = {
  // Primary Brand
  neonBlue: '#00D9FF',
  neonCyan: '#00FFF0',

  // Backgrounds
  darkBg: '#0A0E1A',
  cardBg: '#1A1F2E',
  inputBg: '#252B3D',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B8C8',
  textMuted: '#6B7280',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Accent
  purple: '#8B5CF6',
  orange: '#F97316',

  // Borders
  borderDark: '#2A2F3F',
  borderLight: '#3A4052',

  // Overlays
  overlay: 'rgba(10, 14, 26, 0.8)',
  glassEffect: 'rgba(26, 31, 46, 0.6)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  fontWeight: {
    regular: '400' as '400',
    medium: '500' as '500',
    semibold: '600' as '600',
    bold: '700' as '700',
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  neonGlow: {
    shadowColor: Colors.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};
