/**
 * Kannada Heritage AI — Epigraphical Theme Registry (Light Heritage Aesthetic)
 * 
 * Provides crisp, high-contrast, light-mode CSS variable palettes mapped to
 * the 10 historical script classes and source languages.
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
 * 10 Historical Script Class Palettes (Light Heritage Aesthetic)
 */
export const SCRIPT_THEMES: Record<ScriptClassId, EpigraphThemeTokens> = {
  // 1. Ashoka / Early Brahmi
  ashoka: {
    id: 'ashoka',
    name: 'Ashokan Brahmi (Mauryan Sandstone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#D97706',
    accentLight: '#FEF3C7',
    accentBorder: '#FCD34D',
  },

  // 2. Satavahana
  satavahana: {
    id: 'satavahana',
    name: 'Satavahana Brahmi (Sannati Limestone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F8F6F0',
    borderFine: '#E5E7EB',
    borderMedium: '#D1D5DB',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#EA580C',
    accentLight: '#FFEDD5',
    accentBorder: '#FDBA74',
  },

  // 3. Kadamba (Proto-Kannada)
  kadamba: {
    id: 'kadamba',
    name: 'Kadamba Script (Banavasi Sandstone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F0FDF4',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#059669',
    accentLight: '#D1FAE5',
    accentBorder: '#6EE7B7',
  },

  // 4. Badami Chalukya
  badami_chalukya: {
    id: 'badami_chalukya',
    name: 'Badami Chalukya (Vatapi Red Sandstone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#FEF2F2',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#DC2626',
    accentLight: '#FEE2E2',
    accentBorder: '#FCA5A5',
  },

  // 5. Rashtrakuta
  rashtrakuta: {
    id: 'rashtrakuta',
    name: 'Rashtrakuta (Manyakheta Basalt & Copper)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F8FAFC',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#D97706',
    accentLight: '#FEF3C7',
    accentBorder: '#FCD34D',
  },

  // 6. Kalyana Chalukya
  kalyana_chalukya: {
    id: 'kalyana_chalukya',
    name: 'Kalyana Chalukya (Green Chloritic Soapstone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F0FDFA',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#0D9488',
    accentLight: '#CCFBF1',
    accentBorder: '#5EEAD4',
  },

  // 7. Hoysala
  hoysala: {
    id: 'hoysala',
    name: 'Hoysala Script (Belur Fine Soapstone)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#FFFBEB',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#B45309',
    accentLight: '#FEF3C7',
    accentBorder: '#FCD34D',
  },

  // 8. Vijayanagara
  vijayanagara: {
    id: 'vijayanagara',
    name: 'Vijayanagara (Hampi Crystalline Granite)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#FFF7ED',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#C2410C',
    accentLight: '#FFEDD5',
    accentBorder: '#FDBA74',
  },

  // 9. Mysuru
  mysuru: {
    id: 'mysuru',
    name: 'Mysuru Wodeyar (Talagari Palm Leaf Manuscript)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#FDFBF7',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#B45309',
    accentLight: '#FEF3C7',
    accentBorder: '#FCD34D',
  },

  // 10. Present Kannada
  present_kannada: {
    id: 'present_kannada',
    name: 'Present Kannada (Standard Moveable Type)',
    canvasBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceSubtle: '#F0F9FF',
    borderFine: '#E2E8F0',
    borderMedium: '#CBD5E1',
    inkPrimary: '#0F172A',
    inkSecondary: '#334155',
    inkMuted: '#64748B',
    accentColor: '#0284C7',
    accentLight: '#E0F2FE',
    accentBorder: '#7DD3FC',
  },
};

/**
 * Secondary Historical Source Language Themes (Light Aesthetics)
 */
export const LANGUAGE_THEMES: Record<SourceLanguageId | 'unknown', LanguageThemeTokens> = {
  purvada_halegannada: {
    id: 'purvada_halegannada',
    name: 'Purvada Halegannada',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    badgeBorder: '#FDE68A',
    calloutBg: '#FFFBEB',
    calloutBorder: '#FDE68A',
    calloutText: '#78350F',
  },
  halegannada: {
    id: 'halegannada',
    name: 'Classical Halegannada',
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
    badgeBorder: '#FCD34D',
    calloutBg: '#FFFBEB',
    calloutBorder: '#FCD34D',
    calloutText: '#78350F',
  },
  nadugannada: {
    id: 'nadugannada',
    name: 'Nadugannada (Middle Kannada)',
    badgeBg: '#D1FAE5',
    badgeText: '#065F46',
    badgeBorder: '#A7F3D0',
    calloutBg: '#ECFDF5',
    calloutBorder: '#A7F3D0',
    calloutText: '#064E3B',
  },
  hosagannada: {
    id: 'hosagannada',
    name: 'Hosagannada (Modern Kannada)',
    badgeBg: '#E0F2FE',
    badgeText: '#075985',
    badgeBorder: '#BAE6FD',
    calloutBg: '#F0F9FF',
    calloutBorder: '#BAE6FD',
    calloutText: '#0C4A6E',
  },
  sanskrit: {
    id: 'sanskrit',
    name: 'Epigraphical Sanskrit',
    badgeBg: '#FFE4E6',
    badgeText: '#9F1239',
    badgeBorder: '#FECDD3',
    calloutBg: '#FFF1F2',
    calloutBorder: '#FECDD3',
    calloutText: '#881337',
  },
  prakrit: {
    id: 'prakrit',
    name: 'Prakrit',
    badgeBg: '#F3E8FF',
    badgeText: '#6B21A8',
    badgeBorder: '#E9D5FF',
    calloutBg: '#FAF5FF',
    calloutBorder: '#E9D5FF',
    calloutText: '#581C87',
  },
  unknown: {
    id: 'unknown',
    name: 'Unspecified / Neutral',
    badgeBg: '#F1F5F9',
    badgeText: '#475569',
    badgeBorder: '#CBD5E1',
    calloutBg: '#F8FAFC',
    calloutBorder: '#CBD5E1',
    calloutText: '#1E293B',
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
