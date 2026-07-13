// colors.ts - SwiftPOS Design System Colors & Typography

/**
 * SWIFTPOS COLOR PALETTE
 * Complete color system for consistent UI across all screens
 */

// ============================================
// BRAND COLORS (Primary Color Palette)
// ============================================

export const BRAND = {
  PRIMARY_BLUE: '#93c5fd', // Primary actions, headers, active states
  DARK_NAVY: '#1e3a5f', // Main text, primary buttons, dark backgrounds
  LIGHT_BACKGROUND: '#EBF4FF', // Page backgrounds, light containers
} as const;

// ============================================
// SEMANTIC COLORS (Functional Colors)
// ============================================

export const SEMANTIC = {
  SUCCESS_TEAL: '#1D9E75', // Success states, positive indicators (e.g., completed sales, active status)
  DANGER_RED: '#E24B4A', // Errors, warnings, delete actions (e.g., error messages, logout)
  AMBER_WARNING: '#FBBF24', // Low stock warnings, caution states (e.g., "Low Stock" < 5 items)
  WHITE: '#FFFFFF', // Card backgrounds, button text on dark backgrounds
  OVERLAY_BLACK: '#00000099', // Modal overlays, semi-transparent overlays (60% opacity)
} as const;

// ============================================
// TEXT COLORS (Neutral Colors)
// ============================================

export const TEXT = {
  PRIMARY: '#1a1a1a', // Main body text, headers, labels
  SECONDARY: '#666666', // Secondary text, descriptions, timestamps, hint text
  LIGHT: '#999999', // Disabled text, very light descriptions (50% opacity of secondary)
  DISABLED: '#CCCCCC', // Disabled states
} as const;

// ============================================
// BACKGROUND & BORDERS
// ============================================

export const SURFACES = {
  BACKGROUND: '#EBF4FF', // Page/screen background
  CARD: '#FFFFFF', // Card backgrounds, elevated surfaces
  INPUT: '#FFFFFF', // Input field backgrounds
  DISABLED: '#F5F5F5', // Disabled input/button backgrounds
  BORDER: '#E5E5E5', // Dividers, borders, subtle lines
  BORDER_DARK: '#D4D4D4', // Darker borders, focus states
} as const;

// ============================================
// COMPONENT-SPECIFIC COLOR SCHEMES
// ============================================

// Button Colors
export const BUTTON_COLORS = {
  PRIMARY: {
    background: BRAND.DARK_NAVY, // Navy
    text: SEMANTIC.WHITE, // White text
    disabled: '#CCCCCC',
  },
  SECONDARY: {
    background: SEMANTIC.SUCCESS_TEAL, // Teal
    text: SEMANTIC.WHITE, // White text
    disabled: '#CCCCCC',
  },
  OUTLINE: {
    background: 'transparent',
    border: BRAND.PRIMARY_BLUE,
    text: BRAND.DARK_NAVY, // Navy text
    disabled: '#CCCCCC',
  },
  DANGER: {
    background: SEMANTIC.DANGER_RED,
    text: SEMANTIC.WHITE,
    disabled: '#CCCCCC',
  },
} as const;

// Input Field Colors
export const INPUT_COLORS = {
  background: SURFACES.CARD, // White
  text: TEXT.PRIMARY, // Dark navy
  placeholder: TEXT.SECONDARY, // Light gray
  border: SURFACES.BORDER, // Light gray
  borderFocus: BRAND.PRIMARY_BLUE, // Blue on focus
  borderError: SEMANTIC.DANGER_RED, // Red on error
  disabled: {
    background: SURFACES.DISABLED,
    text: TEXT.DISABLED,
    border: SURFACES.BORDER,
  },
} as const;

// Header Colors
export const HEADER_COLORS = {
  background: BRAND.PRIMARY_BLUE, // Light blue
  text: BRAND.DARK_NAVY, // Navy
  icon: BRAND.DARK_NAVY, // Navy
  safeAreaBackground: BRAND.PRIMARY_BLUE,
} as const;

// Tab Bar Colors
export const TABBAR_COLORS = {
  background: SEMANTIC.WHITE,
  iconActive: BRAND.PRIMARY_BLUE, // Blue when active
  iconInactive: TEXT.SECONDARY, // Gray when inactive
  labelActive: BRAND.PRIMARY_BLUE,
  labelInactive: TEXT.SECONDARY,
  borderTopActive: BRAND.PRIMARY_BLUE, // 3px top border when active
} as const;

// Status Badge Colors
export const STATUS_BADGE_COLORS = {
  ACTIVE: {
    background: SEMANTIC.SUCCESS_TEAL,
    text: SEMANTIC.WHITE,
  },
  INACTIVE: {
    background: SURFACES.BORDER,
    text: TEXT.PRIMARY,
  },
  PENDING: {
    background: SEMANTIC.AMBER_WARNING,
    text: TEXT.PRIMARY,
  },
  COMPLETED: {
    background: SEMANTIC.SUCCESS_TEAL,
    text: SEMANTIC.WHITE,
  },
  ERROR: {
    background: SEMANTIC.DANGER_RED,
    text: SEMANTIC.WHITE,
  },
} as const;

// Low Stock Badge Colors
export const LOW_STOCK_COLORS = {
  background: SEMANTIC.AMBER_WARNING, // Amber
  text: TEXT.PRIMARY, // Dark text
} as const;

// Payment Method Colors
export const PAYMENT_COLORS = {
  CASH: {
    background: SEMANTIC.SUCCESS_TEAL,
    text: SEMANTIC.WHITE,
  },
  MPESA: {
    background: '#FF9900', // M-Pesa orange
    text: SEMANTIC.WHITE,
  },
} as const;

// ============================================
// TYPOGRAPHY SYSTEM
// Using Lexend font family
// ============================================

export const FONT_FAMILY = {
  LIGHT: 'Lexend_300Light',
  REGULAR: 'Lexend_400Regular',
  MEDIUM: 'Lexend_500Medium',
  SEMI_BOLD: 'Lexend_600SemiBold',
  BOLD: 'Lexend_700Bold',
} as const;

export const TYPOGRAPHY = {
  // Display - Largest, for main headings (SwiftPOS logo)
  DISPLAY: {
    fontSize: 32,
    fontWeight: '700' as const,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: 38,
  },

  // Heading 1 - Large section headers
  HEADING_1: {
    fontSize: 28,
    fontWeight: '700' as const,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: 34,
  },

  // Heading 2 - Sub-section titles
  HEADING_2: {
    fontSize: 24,
    fontWeight: '700' as const,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: 31,
  },

  // Heading 3 - Card titles, major sections
  HEADING_3: {
    fontSize: 20,
    fontWeight: '700' as const,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: 26,
  },

  // Title - Button labels, tab labels, important labels
  TITLE: {
    fontSize: 18,
    fontWeight: '500' as const,
    fontFamily: FONT_FAMILY.MEDIUM,
    lineHeight: 25,
  },

  // Body Large - Main body text
  BODY_LARGE: {
    fontSize: 16,
    fontWeight: '400' as const,
    fontFamily: FONT_FAMILY.REGULAR,
    lineHeight: 24,
  },

  // Body - Standard body text, form labels, prices
  BODY: {
    fontSize: 14,
    fontWeight: '400' as const,
    fontFamily: FONT_FAMILY.REGULAR,
    lineHeight: 21,
  },

  // Body Small - Secondary text, descriptions, timestamps
  BODY_SMALL: {
    fontSize: 12,
    fontWeight: '400' as const,
    fontFamily: FONT_FAMILY.REGULAR,
    lineHeight: 18,
  },

  // Caption - Smallest text, micro text, hints
  CAPTION: {
    fontSize: 11,
    fontWeight: '400' as const,
    fontFamily: FONT_FAMILY.REGULAR,
    lineHeight: 15,
  },

  // Button Text - Buttons (usually TITLE size)
  BUTTON: {
    fontSize: 16,
    fontWeight: '500' as const,
    fontFamily: FONT_FAMILY.MEDIUM,
    lineHeight: 24,
  },

  // Small Button Text
  BUTTON_SMALL: {
    fontSize: 14,
    fontWeight: '500' as const,
    fontFamily: FONT_FAMILY.MEDIUM,
    lineHeight: 20,
  },
} as const;

// ============================================
// SPACING SYSTEM (8px Base Unit)
// ============================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

// ============================================
// BORDER RADIUS SYSTEM
// ============================================

export const BORDER_RADIUS = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
  PILL: 50, // Fully rounded buttons, avatars
} as const;

// ============================================
// SHADOWS (Elevation System)
// ============================================

export const SHADOWS = {
  ELEVATION_0: undefined, // No shadow
  ELEVATION_1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ELEVATION_2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  ELEVATION_3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  ELEVATION_4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ============================================
// PRESET STYLES (Ready to use combinations)
// ============================================

export const PRESET_STYLES = {
  // Page backgrounds
  screenBackground: {
    backgroundColor: BRAND.LIGHT_BACKGROUND,
  },

  // Card styles
  card: {
    backgroundColor: SURFACES.CARD,
    borderRadius: BORDER_RADIUS.LARGE,
    ...SHADOWS.ELEVATION_2,
  },

  // Header styles
  headerContainer: {
    backgroundColor: HEADER_COLORS.background,
  },
  headerTitle: {
    ...TYPOGRAPHY.HEADING_3,
    color: HEADER_COLORS.text,
  },

  // Button styles
  primaryButton: {
    backgroundColor: BUTTON_COLORS.PRIMARY.background,
    borderRadius: BORDER_RADIUS.PILL,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.BUTTON,
    color: BUTTON_COLORS.PRIMARY.text,
  },

  secondaryButton: {
    backgroundColor: BUTTON_COLORS.SECONDARY.background,
    borderRadius: BORDER_RADIUS.PILL,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.BUTTON,
    color: BUTTON_COLORS.SECONDARY.text,
  },

  outlineButton: {
    backgroundColor: BUTTON_COLORS.OUTLINE.background,
    borderWidth: 2,
    borderColor: BUTTON_COLORS.OUTLINE.border,
    borderRadius: BORDER_RADIUS.PILL,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  outlineButtonText: {
    ...TYPOGRAPHY.BUTTON,
    color: BUTTON_COLORS.OUTLINE.text,
  },

  // Input styles
  inputContainer: {
    borderWidth: 1,
    borderColor: INPUT_COLORS.border,
    borderRadius: BORDER_RADIUS.MEDIUM,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    backgroundColor: INPUT_COLORS.background,
    minHeight: 48,
  },
  inputText: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: INPUT_COLORS.text,
  },
  inputPlaceholder: {
    color: INPUT_COLORS.placeholder,
  },

  // Text styles
  heading: {
    ...TYPOGRAPHY.HEADING_3,
    color: TEXT.PRIMARY,
  },
  body: {
    ...TYPOGRAPHY.BODY,
    color: TEXT.PRIMARY,
  },
  bodySecondary: {
    ...TYPOGRAPHY.BODY,
    color: TEXT.SECONDARY,
  },
  caption: {
    ...TYPOGRAPHY.CAPTION,
    color: TEXT.SECONDARY,
  },

  // Badge styles
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.LARGE,
  },

  // Low stock indicator
  lowStockBadge: {
    backgroundColor: LOW_STOCK_COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.LARGE,
  },
  lowStockText: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: LOW_STOCK_COLORS.text,
    fontWeight: '600' as const,
  },

  // Safe area padding
  screenPadding: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
} as const;

// ============================================
// UTILITY TYPES
// ============================================

export type ColorScheme = 'light' | 'dark';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'error';

// ============================================
// EXPORT ALL
// ============================================

export const COLORS = {
  BRAND,
  SEMANTIC,
  TEXT,
  SURFACES,
  BUTTON_COLORS,
  INPUT_COLORS,
  HEADER_COLORS,
  TABBAR_COLORS,
  STATUS_BADGE_COLORS,
  LOW_STOCK_COLORS,
  PAYMENT_COLORS,
  FONT_FAMILY,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  PRESET_STYLES,
} as const;

export default COLORS;