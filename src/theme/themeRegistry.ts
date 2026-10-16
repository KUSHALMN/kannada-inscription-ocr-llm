/**
 * Kannada Heritage AI — Dynamic Historical Epigraphical Theme Registry
 * 
 * Provides typed CSS variable palettes mapped to the 10 historical script classes 
 * and secondary historical source languages.
 * 
 * Strict constraints:
 * - Solid or nearly-solid backgrounds (No gradients, no neon, no glassmorphism).
 * - Maximum contrast and high readability for stone inscriptions.
 * - Centralized CSS variables injected at container scope.
 */

import { ScriptClassId, SourceLanguageId } from '../types';

export interface EpigraphThemeTokens {
  id: string;
  name: string;
  canvasBg: string;       // main viewport background
  surfaceBg: string;      // card / panel background
  surfaceSubtle: string;   // header / inset background
  borderFine: string;     // primary dividers and borders
  borderMedium: string;   // active borders and cards
  inkPrimary: string;     // high-contrast primary text
  inkSecondary: string;   // descriptive prose text
  inkMuted: string;       // tertiary labels / accession numbers
  accentColor: string;    // characteristic historical tone
  accentLight: string;    // badge / highlight background
  accentBorder: string;   // badge border
}

export interface LanguageThemeTokens {
  id: string;
  name: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  calloutBg: string;
  calloutBorder: string;
  calloutText: string;
}

/**
 * 10 Historical Script Class Palettes
 */
export const SCRIPT_THEMES: Record<ScriptClassId, EpigraphThemeTokens> = {
  // 1. Ashoka / Early Brahmi: weathered sandstone, warm chalk, dark inscription ink
  ashoka: {
    id: 'ashoka',
    name: 'Ashokan Brahmi (Mauryan Sandstone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0F1521',
    surfaceSubtle: '#141C2B',
    borderFine: 'rgba(245, 158, 11, 0.15)',
    borderMedium: 'rgba(245, 158, 11, 0.35)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#F59E0B', // Mauryan Gold Ochre
    accentLight: 'rgba(245, 158, 11, 0.12)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
  },

  // 2. Satavahana: muted limestone, earthy clay, charcoal
  satavahana: {
    id: 'satavahana',
    name: 'Satavahana Brahmi (Sannati Limestone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0F1622',
    surfaceSubtle: '#151D2C',
    borderFine: 'rgba(217, 119, 6, 0.15)',
    borderMedium: 'rgba(217, 119, 6, 0.35)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#F97316', // Earthy terracotta pottery
    accentLight: 'rgba(249, 115, 22, 0.12)',
    accentBorder: 'rgba(249, 115, 22, 0.3)',
  },

  // 3. Kadamba: pale carved stone, subdued forest-ink accent, deep brown
  kadamba: {
    id: 'kadamba',
    name: 'Kadamba Script (Banavasi Sandstone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0F1722',
    surfaceSubtle: '#14202E',
    borderFine: 'rgba(16, 185, 129, 0.18)',
    borderMedium: 'rgba(16, 185, 129, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#10B981', // Banavasi evergreen schist
    accentLight: 'rgba(16, 185, 129, 0.12)',
    accentBorder: 'rgba(16, 185, 129, 0.3)',
  },

  // 4. Badami Chalukya: aged red sandstone, warm ivory, dark stone
  badami_chalukya: {
    id: 'badami_chalukya',
    name: 'Badami Chalukya (Vatapi Red Sandstone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#12141F',
    surfaceSubtle: '#1A1C2B',
    borderFine: 'rgba(239, 68, 68, 0.18)',
    borderMedium: 'rgba(239, 68, 68, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#EF4444', // Vatapi Red Sandstone Cliffs
    accentLight: 'rgba(239, 68, 68, 0.12)',
    accentBorder: 'rgba(239, 68, 68, 0.3)',
  },

  // 5. Rashtrakuta: basalt charcoal, parchment, restrained antique copper
  rashtrakuta: {
    id: 'rashtrakuta',
    name: 'Rashtrakuta (Manyakheta Basalt & Copper)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0F1521',
    surfaceSubtle: '#151E2E',
    borderFine: 'rgba(245, 158, 11, 0.18)',
    borderMedium: 'rgba(245, 158, 11, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#D97706', // Antique copper plate
    accentLight: 'rgba(217, 119, 6, 0.12)',
    accentBorder: 'rgba(217, 119, 6, 0.3)',
  },

  // 6. Kalyana Chalukya: muted soapstone, olive-grey, dark ink
  kalyana_chalukya: {
    id: 'kalyana_chalukya',
    name: 'Kalyana Chalukya (Green Chloritic Soapstone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0E1720',
    surfaceSubtle: '#13212C',
    borderFine: 'rgba(20, 184, 166, 0.18)',
    borderMedium: 'rgba(20, 184, 166, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#14B8A6', // Soapstone jade
    accentLight: 'rgba(20, 184, 166, 0.12)',
    accentBorder: 'rgba(20, 184, 166, 0.3)',
  },

  // 7. Hoysala: carved-stone ivory, deep umber, subtle earthy accents
  hoysala: {
    id: 'hoysala',
    name: 'Hoysala Script (Belur Fine Soapstone)',
    canvasBg: '#0B0F17',
    surfaceBg: '#101524',
    surfaceSubtle: '#161D31',
    borderFine: 'rgba(245, 158, 11, 0.2)',
    borderMedium: 'rgba(245, 158, 11, 0.45)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#FBBF24', // Belur ornate gold filigree
    accentLight: 'rgba(251, 191, 36, 0.12)',
    accentBorder: 'rgba(251, 191, 36, 0.3)',
  },

  // 8. Vijayanagara: weathered granite, pale stone, terracotta
  vijayanagara: {
    id: 'vijayanagara',
    name: 'Vijayanagara (Hampi Crystalline Granite)',
    canvasBg: '#0B0F17',
    surfaceBg: '#111420',
    surfaceSubtle: '#181D2E',
    borderFine: 'rgba(249, 115, 22, 0.18)',
    borderMedium: 'rgba(249, 115, 22, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#F97316', // Hampi monument terracotta
    accentLight: 'rgba(249, 115, 22, 0.12)',
    accentBorder: 'rgba(249, 115, 22, 0.3)',
  },

  // 9. Mysuru: palm-leaf cream, faded manuscript brown, archival ink
  mysuru: {
    id: 'mysuru',
    name: 'Mysuru Wodeyar (Talagari Palm Leaf Manuscript)',
    canvasBg: '#0B0F17',
    surfaceBg: '#101622',
    surfaceSubtle: '#172030',
    borderFine: 'rgba(217, 119, 6, 0.18)',
    borderMedium: 'rgba(217, 119, 6, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#D97706', // Royal Mysuru gold amber
    accentLight: 'rgba(217, 119, 6, 0.12)',
    accentBorder: 'rgba(217, 119, 6, 0.3)',
  },

  // 10. Present Kannada: clean ivory, charcoal, restrained indigo ink
  present_kannada: {
    id: 'present_kannada',
    name: 'Present Kannada (Standard Moveable Type)',
    canvasBg: '#0B0F17',
    surfaceBg: '#0F1521',
    surfaceSubtle: '#141C2B',
    borderFine: 'rgba(6, 182, 212, 0.18)',
    borderMedium: 'rgba(6, 182, 212, 0.38)',
    inkPrimary: '#F9FAFB',
    inkSecondary: '#D1D5DB',
    inkMuted: '#9CA3AF',
    accentColor: '#06B6D4', // Modern Digital Cyan
    accentLight: 'rgba(6, 182, 212, 0.12)',
    accentBorder: 'rgba(6, 182, 212, 0.3)',
  },
};

/**
 * Secondary Historical Source Language Themes
 */
export const LANGUAGE_THEMES: Record<SourceLanguageId | 'unknown', LanguageThemeTokens> = {
  // Kannada (Purvada Halegannada, Halegannada, Nadugannada, Hosagannada)
  purvada_halegannada: {
    id: 'purvada_halegannada',
    name: 'Purvada Halegannada',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeText: '#FDE68A',
    badgeBorder: 'rgba(245, 158, 11, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(245, 158, 11, 0.25)',
    calloutText: '#FEF3C7',
  },
  halegannada: {
    id: 'halegannada',
    name: 'Classical Halegannada',
    badgeBg: 'rgba(217, 119, 6, 0.15)',
    badgeText: '#FBBF24',
    badgeBorder: 'rgba(217, 119, 6, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(217, 119, 6, 0.25)',
    calloutText: '#FDE68A',
  },
  nadugannada: {
    id: 'nadugannada',
    name: 'Nadugannada (Middle Kannada)',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeText: '#6EE7B7',
    badgeBorder: 'rgba(16, 185, 129, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(16, 185, 129, 0.25)',
    calloutText: '#D1FAE5',
  },
  hosagannada: {
    id: 'hosagannada',
    name: 'Hosagannada (Modern Kannada)',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    badgeText: '#67E8F9',
    badgeBorder: 'rgba(6, 182, 212, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(6, 182, 212, 0.25)',
    calloutText: '#CFFAFE',
  },
  // Sanskrit
  sanskrit: {
    id: 'sanskrit',
    name: 'Epigraphical Sanskrit',
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    badgeText: '#FDA4AF',
    badgeBorder: 'rgba(244, 63, 94, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(244, 63, 94, 0.25)',
    calloutText: '#FFE4E6',
  },
  // Prakrit
  prakrit: {
    id: 'prakrit',
    name: 'Prakrit',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#D8B4FE',
    badgeBorder: 'rgba(168, 85, 247, 0.35)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(168, 85, 247, 0.25)',
    calloutText: '#F3E8FF',
  },
  // Unknown / Neutral fallback
  unknown: {
    id: 'unknown',
    name: 'Unspecified / Neutral',
    badgeBg: 'rgba(156, 163, 175, 0.15)',
    badgeText: '#E5E7EB',
    badgeBorder: 'rgba(156, 163, 175, 0.3)',
    calloutBg: 'rgba(15, 21, 33, 0.8)',
    calloutBorder: 'rgba(255, 255, 255, 0.1)',
    calloutText: '#F3F4F6',
  },
};

/**
 * Generate CSS variable style object from script and language tokens
 */
export function getEpigraphThemeVariables(
  scriptClass: ScriptClassId,
  sourceLanguage?: SourceLanguageId
): React.CSSProperties {
  const scriptTheme = SCRIPT_THEMES[scriptClass] || SCRIPT_THEMES.kadamba;
  const langKey = sourceLanguage && LANGUAGE_THEMES[sourceLanguage] ? sourceLanguage : 'unknown';
  const langTheme = LANGUAGE_THEMES[langKey];

  return {
    '--theme-canvas-bg': scriptTheme.canvasBg,
    '--theme-surface-bg': scriptTheme.surfaceBg,
    '--theme-surface-subtle': scriptTheme.surfaceSubtle,
    '--theme-border-fine': scriptTheme.borderFine,
    '--theme-border-medium': scriptTheme.borderMedium,
    '--theme-ink-primary': scriptTheme.inkPrimary,
    '--theme-ink-secondary': scriptTheme.inkSecondary,
    '--theme-ink-muted': scriptTheme.inkMuted,
    '--theme-accent': scriptTheme.accentColor,
    '--theme-accent-light': scriptTheme.accentLight,
    '--theme-accent-border': scriptTheme.accentBorder,
    // Language specific accents
    '--lang-badge-bg': langTheme.badgeBg,
    '--lang-badge-text': langTheme.badgeText,
    '--lang-badge-border': langTheme.badgeBorder,
    '--lang-callout-bg': langTheme.calloutBg,
    '--lang-callout-border': langTheme.calloutBorder,
    '--lang-callout-text': langTheme.calloutText,
  } as React.CSSProperties;
}
