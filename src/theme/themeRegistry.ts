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
    canvasBg: '#F8F5EE',
    surfaceBg: '#FCFAF6',
    surfaceSubtle: '#F2ECE0',
    borderFine: '#E5DCBE',
    borderMedium: '#D0C49F',
    inkPrimary: '#1E1B18',
    inkSecondary: '#4A443B',
    inkMuted: '#7D7364',
    accentColor: '#8C6C38', // Weathered sandstone ochre
    accentLight: '#F3EDDF',
    accentBorder: '#D8CCA8',
  },

  // 2. Satavahana: muted limestone, earthy clay, charcoal
  satavahana: {
    id: 'satavahana',
    name: 'Satavahana Brahmi (Sannati Limestone)',
    canvasBg: '#F5F5F0',
    surfaceBg: '#FAF9F6',
    surfaceSubtle: '#EDECE5',
    borderFine: '#E0DFD5',
    borderMedium: '#CBC9BD',
    inkPrimary: '#1F1E1B',
    inkSecondary: '#47453F',
    inkMuted: '#75736B',
    accentColor: '#9E5B38', // Earthy pottery clay
    accentLight: '#F4ECE4',
    accentBorder: '#DFCEBF',
  },

  // 3. Kadamba: pale carved stone, subdued forest-ink accent, deep brown
  kadamba: {
    id: 'kadamba',
    name: 'Kadamba Script (Banavasi Sandstone)',
    canvasBg: '#F7F6F2',
    surfaceBg: '#FCFBF9',
    surfaceSubtle: '#EFECE3',
    borderFine: '#E4DFD2',
    borderMedium: '#CDC5B4',
    inkPrimary: '#1D1C19',
    inkSecondary: '#444139',
    inkMuted: '#746F63',
    accentColor: '#3A5442', // Subdued forest-ink accent (Banavasi jungle foliage)
    accentLight: '#ECF2ED',
    accentBorder: '#C2D4C6',
  },

  // 4. Badami Chalukya: aged red sandstone, warm ivory, dark stone
  badami_chalukya: {
    id: 'badami_chalukya',
    name: 'Badami Chalukya (Vatapi Red Sandstone)',
    canvasBg: '#F9F5F1',
    surfaceBg: '#FDFAF7',
    surfaceSubtle: '#F3E9DF',
    borderFine: '#E7D8CA',
    borderMedium: '#D2BDAA',
    inkPrimary: '#201A18',
    inkSecondary: '#4D403A',
    inkMuted: '#7E6B62',
    accentColor: '#8F452E', // Aged red sandstone cliff
    accentLight: '#F7EDE7',
    accentBorder: '#DFC4B7',
  },

  // 5. Rashtrakuta: basalt charcoal, parchment, restrained antique copper
  rashtrakuta: {
    id: 'rashtrakuta',
    name: 'Rashtrakuta (Manyakheta Basalt & Copper)',
    canvasBg: '#F6F5F2',
    surfaceBg: '#FAF9F7',
    surfaceSubtle: '#EEECE7',
    borderFine: '#E1DED5',
    borderMedium: '#CCC7BA',
    inkPrimary: '#1C1C1B',
    inkSecondary: '#454441',
    inkMuted: '#73716B',
    accentColor: '#965A2C', // Restrained antique copper plate
    accentLight: '#F6EDE6',
    accentBorder: '#DECBBF',
  },

  // 6. Kalyana Chalukya: muted soapstone, olive-grey, dark ink
  kalyana_chalukya: {
    id: 'kalyana_chalukya',
    name: 'Kalyana Chalukya (Green Chloritic Soapstone)',
    canvasBg: '#F5F6F3',
    surfaceBg: '#FAFBF9',
    surfaceSubtle: '#ECEEE7',
    borderFine: '#DFE2D8',
    borderMedium: '#C8CCC0',
    inkPrimary: '#1A1C1A',
    inkSecondary: '#3F443E',
    inkMuted: '#6D746A',
    accentColor: '#455949', // Muted chloritic soapstone olive-grey
    accentLight: '#EDF2EE',
    accentBorder: '#CAD6CC',
  },

  // 7. Hoysala: carved-stone ivory, deep umber, subtle earthy accents
  hoysala: {
    id: 'hoysala',
    name: 'Hoysala Script (Belur Fine Soapstone)',
    canvasBg: '#F9F6F0',
    surfaceBg: '#FDFCF9',
    surfaceSubtle: '#F2EDE2',
    borderFine: '#E6DEC9',
    borderMedium: '#CFC5AA',
    inkPrimary: '#1C1917',
    inkSecondary: '#433E37',
    inkMuted: '#736B5E',
    accentColor: '#784E29', // Deep umber relief tone
    accentLight: '#F5EEE6',
    accentBorder: '#D8C5B3',
  },

  // 8. Vijayanagara: weathered granite, pale stone, terracotta
  vijayanagara: {
    id: 'vijayanagara',
    name: 'Vijayanagara (Hampi Crystalline Granite)',
    canvasBg: '#F7F6F4',
    surfaceBg: '#FCFBFA',
    surfaceSubtle: '#EFECE7',
    borderFine: '#E3DFD7',
    borderMedium: '#CAC4B9',
    inkPrimary: '#1B1918',
    inkSecondary: '#423F3D',
    inkMuted: '#706B67',
    accentColor: '#8C4830', // Hampi monument terracotta
    accentLight: '#F6ECE8',
    accentBorder: '#DEC4BB',
  },

  // 9. Mysuru: palm-leaf cream, faded manuscript brown, archival ink
  mysuru: {
    id: 'mysuru',
    name: 'Mysuru Wodeyar (Talagari Palm Leaf Manuscript)',
    canvasBg: '#F9F7F1',
    surfaceBg: '#FDFBF7',
    surfaceSubtle: '#F2EDE0',
    borderFine: '#E7DFC9',
    borderMedium: '#D2C7AA',
    inkPrimary: '#1E1C18',
    inkSecondary: '#49443B',
    inkMuted: '#7A7263',
    accentColor: '#7D5C35', // Faded iron-gall manuscript brown
    accentLight: '#F5EFE4',
    accentBorder: '#DACDB8',
  },

  // 10. Present Kannada: clean ivory, charcoal, restrained indigo ink
  present_kannada: {
    id: 'present_kannada',
    name: 'Present Kannada (Standard Moveable Type)',
    canvasBg: '#F8F8F7',
    surfaceBg: '#FCFCFB',
    surfaceSubtle: '#F0F0EE',
    borderFine: '#E2E2DE',
    borderMedium: '#CACAC3',
    inkPrimary: '#171716',
    inkSecondary: '#3E3E3C',
    inkMuted: '#6E6E69',
    accentColor: '#2B4254', // Restrained institutional indigo ink
    accentLight: '#EBF1F5',
    accentBorder: '#C4D4E0',
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
    badgeBg: '#F4ECE4',
    badgeText: '#6E3A20',
    badgeBorder: '#DEC7B5',
    calloutBg: '#FCFAF7',
    calloutBorder: '#E8D9CC',
    calloutText: '#3D2517',
  },
  halegannada: {
    id: 'halegannada',
    name: 'Classical Halegannada',
    badgeBg: '#F2EFEB',
    badgeText: '#594433',
    badgeBorder: '#D8CFB5',
    calloutBg: '#FBF9F6',
    calloutBorder: '#E5DDCE',
    calloutText: '#382B20',
  },
  nadugannada: {
    id: 'nadugannada',
    name: 'Nadugannada (Middle Kannada)',
    badgeBg: '#EDEFEA',
    badgeText: '#3C4D38',
    badgeBorder: '#CAD1C4',
    calloutBg: '#F9FAF8',
    calloutBorder: '#DFE5D9',
    calloutText: '#263324',
  },
  hosagannada: {
    id: 'hosagannada',
    name: 'Hosagannada (Modern Kannada)',
    badgeBg: '#EBF0F4',
    badgeText: '#284154',
    badgeBorder: '#C6D4DF',
    calloutBg: '#F8FAFC',
    calloutBorder: '#DCE5ED',
    calloutText: '#182A38',
  },

  // Sanskrit: pale parchment with muted manuscript-red accents
  sanskrit: {
    id: 'sanskrit',
    name: 'Epigraphical Sanskrit',
    badgeBg: '#F7EBE8',
    badgeText: '#7A2C21',
    badgeBorder: '#E8C5BE',
    calloutBg: '#FCF8F7',
    calloutBorder: '#F0D5D0',
    calloutText: '#4A1C15',
  },

  // Prakrit: weathered limestone with subdued earthy accents
  prakrit: {
    id: 'prakrit',
    name: 'Prakrit',
    badgeBg: '#F2EFE8',
    badgeText: '#635338',
    badgeBorder: '#D9D1BE',
    calloutBg: '#FAF8F4',
    calloutBorder: '#E8E1CF',
    calloutText: '#3B3221',
  },

  // Unknown / Neutral fallback: neutral charcoal-and-ivory theme
  unknown: {
    id: 'unknown',
    name: 'Unspecified / Neutral',
    badgeBg: '#F0EFEF',
    badgeText: '#4A4947',
    badgeBorder: '#D4D2D0',
    calloutBg: '#F8F8F7',
    calloutBorder: '#E1E0DD',
    calloutText: '#262524',
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
