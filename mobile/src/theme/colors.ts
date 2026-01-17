// Automotive Diagnostic Tech Theme - Black/Green/Yellow
export const Colors = {
  // Primary Diagnostic Colors
  diagnosticGreen: '#00FF00',      // Bright green for active/success states
  diagnosticGreenSoft: '#00E676',  // Softer green variant
  warningYellow: '#FFD700',        // Warning/alert yellow
  warningAmber: '#FFC107',         // Amber for caution

  // Backgrounds
  darkBg: '#000000',               // Pure black primary background
  cardBg: '#121212',               // Dark gray for cards
  inputBg: '#1E1E1E',              // Input fields background

  // Text
  textPrimary: '#FFFFFF',          // White primary text
  textSecondary: '#B0B0B0',        // Light gray secondary text
  textMuted: '#808080',            // Medium gray muted text

  // Status
  success: '#00FF00',              // Green success
  warning: '#FFD700',              // Yellow warning
  error: '#EF4444',                // Red error
  info: '#00E676',                 // Green info

  // Accent (removed purple/orange, using gear gray)
  gearGray: '#505050',             // Mechanical gray
  darkGray: '#2A2A2A',             // Dark accent gray

  // Borders
  borderDark: '#1E1E1E',
  borderLight: '#2A2A2A',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.8)',
  glassEffect: 'rgba(18, 18, 18, 0.6)',
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
  greenGlow: {
    shadowColor: Colors.diagnosticGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
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
