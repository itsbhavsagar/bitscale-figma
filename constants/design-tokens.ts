export const colors = {
  background: "#FFFFFF",
  foreground: "#1A202C",
  textPrimary: "#1A202C",
  textSecondary: "#6B7280",
  primaryBlue: "#1A56DB",
  borderColor: "#E5E7EB",
  buttonDark: "#1F2A37",
  cardBg: "#F8FBFD",
  sidebarBg: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

export type SpacingToken = keyof typeof spacing;

export const borderRadius = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
} as const;

export type BorderRadiusToken = keyof typeof borderRadius;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export type FontWeightToken = keyof typeof fontWeight;

export const typography = {
  heading: {
    fontSize: "18px",
    fontWeight: fontWeight.semibold,
    lineHeight: "25.2px",
  },
  body: {
    fontSize: "14px",
    fontWeight: fontWeight.regular,
    lineHeight: "21px",
  },
  navigation: {
    fontSize: "14px",
    fontWeight: fontWeight.medium,
    lineHeight: "21px",
  },
  button: {
    fontSize: "14px",
    fontWeight: fontWeight.medium,
    lineHeight: "21px",
  },
} as const;

export type TypographyVariant = keyof typeof typography;

export const designTokens = {
  colors,
  spacing,
  borderRadius,
  fontWeight,
  typography,
} as const;

export type DesignTokens = typeof designTokens;
