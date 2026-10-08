/**
 * Northbrook Care — design tokens
 * Extracted from the Northbrook mobile prototype.
 * Single source of truth for colors, fonts, spacing, radii, shadows and type.
 */

import { Platform } from "react-native";

/* ───────────────────────────── Colors ───────────────────────────── */

export const colors = {
  // Brand
  primary: "#4B3FD6", // indigo — buttons, active states, links
  primaryDark: "#3A2FC0", // pressed state
  primaryLight: "#7A6BF5", // gradient end (logo mark)
  primaryDeep: "#2E2496", // text on tint cards
  accent: "#F2A33C", // amber — dots, highlighted stat

  // Surfaces
  background: "#F6F5FD", // app background
  surface: "#FFFFFF", // cards, inputs, back button
  tint: "#F1EFFE", // soft indigo card / pill / active Android tab
  ink: "#171334", // dark card, headings

  // Text
  text: "#171334",
  textSecondary: "#5A5678",
  textLabel: "#3F3B5C", // form labels
  textFaint: "#9A97B4", // footnotes, helper text
  textOnDark: "#FFFFFF",
  textOnDarkMuted: "rgba(255,255,255,0.75)",

  // Lines & borders
  line: "rgba(23,19,52,0.10)", // card borders, dividers
  inputBorder: "rgba(23,19,52,0.18)",
  outlineButton: "rgba(23,19,52,0.16)",

  // Feedback
  error: "#D92D20",

  // Overlays
  scrim: "rgba(0,0,0,0.38)", // call sheet backdrop (iOS)
  scrimAndroid: "rgba(0,0,0,0.40)",

  // Native iOS action-sheet blue
  iosBlue: "#007AFF",

  // Gradients (use with expo-linear-gradient)
  logoGradient: ["#4B3FD6", "#7A6BF5"],
};

/* ───────────────────────────── Fonts ───────────────────────────── */
/**
 * These names match what @expo-google-fonts registers via useFonts().
 * Load them once in the root layout (see setup note below).
 */

export const fonts = {
  // Headings, buttons, tab labels — Outfit
  heading: "Outfit_700Bold",
  headingSemi: "Outfit_600SemiBold",

  // Body — IBM Plex Sans
  body: "IBMPlexSans_400Regular",
  bodyMedium: "IBMPlexSans_500Medium",
  bodySemi: "IBMPlexSans_600SemiBold",
  bodyBold: "IBMPlexSans_700Bold",

  // Native system font (iOS call sheet / Android dialog feel)
  system: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "system-ui",
  }),
};

/* ───────────────────────────── Spacing ───────────────────────────── */

export const spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,

  // Values the Northbrook design uses constantly
  gutter: 14, // outer screen/card margin
  inset: 18, // inner screen padding
};

/* ───────────────────────────── Radii ───────────────────────────── */

export const radii = {
  logo: 10,
  input: 13,
  button: 100, // pill
  backButton: 14,
  chip: 16,
  card: 18,
  cardLarge: 22,
  hero: 26,
  sheet: 28,
  pill: 100,
};

/* ───────────────────────────── Shadows ───────────────────────────── */
/** RN shadows approximate the CSS ones in the prototype. */

export const shadows = {
  // Primary button glow
  button: {
    shadowColor: "#4B3FD6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  // Hero card on Home
  hero: {
    shadowColor: "#4B3FD6",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 6,
  },
  // iOS floating tab bar
  tabBar: {
    shadowColor: "#171334",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },
};

/* ───────────────────────────── Typography ───────────────────────────── */
/** letterSpacing in px (the prototype used em: -0.03em × size). */

export const type = {
  display: {
    fontFamily: fonts.heading,
    fontSize: 31,
    lineHeight: 34,
    letterSpacing: -0.93,
  },
  title: { fontFamily: fonts.heading, fontSize: 26, letterSpacing: -0.65 },
  heading: { fontFamily: fonts.heading, fontSize: 22 },
  cardTitle: { fontFamily: fonts.headingSemi, fontSize: 17 },
  button: { fontFamily: fonts.headingSemi, fontSize: 17 },
  tabLabel: { fontFamily: fonts.headingSemi, fontSize: 14.5 },
  body: { fontFamily: fonts.body, fontSize: 16.5, lineHeight: 25 },
  bodySmall: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21 },
  label: { fontFamily: fonts.bodySemi, fontSize: 14 },
  caption: { fontFamily: fonts.body, fontSize: 13, lineHeight: 17 },
};

/* ───────────────────────────── Layout ───────────────────────────── */

export const layout = {
  minTouch: 44, // minimum tap target
  buttonHeight: 54,
  inputHeight: 52,
  tabItemHeight: 50,
};

// Space reserved so content clears the tab bar (iOS floating pill / Android M3 bar)
export const bottomTabInset = Platform.select({ ios: 96, android: 80 }) ?? 0;
export const maxContentWidth = 800;
