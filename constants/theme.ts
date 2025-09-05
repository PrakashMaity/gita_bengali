import { Theme } from '../interface/color.interface';
import { colors } from './tint';

export type { Theme };
export type ThemeMode = 'light' | 'dark';

export const generateTheme = (mode: ThemeMode): Theme => {
  if (mode === 'light') {
    return {
      background: {
        primary: colors.maroon50,       // Deep chocolate brown (main content area)
        secondary: colors.maroon100,    // Rich brown (secondary background)
        card: colors.maroon200,         // Medium brown (card backgrounds)
        tertiary: colors.secondary100,   // Rich teal (accent areas)
        quaternary: colors.accent100,    // Goldenrod (highlights and CTAs)
      },
      text: {
        primary: colors.white,           // White text on deep backgrounds
        secondary: colors.white,         // White text for better contrast
        disabled: colors.primary500,     // Very light brown (disabled text)
        error: colors.maroon200,         // Medium warm red (error text)
        success: colors.secondary200,    // Medium teal (success text)
        warning: colors.accent200,       // Medium gold (warning text)
        tertiary: colors.white,          // White text on dark backgrounds
        quaternary: colors.white,        // White text on bright backgrounds
      },
      icon: {
        primary: colors.accent200,       // Medium gold (primary icons)
        secondary: colors.secondary200,  // Medium teal (secondary icons)
        tertiary: colors.tertiary200,    // Medium purple (tertiary icons)
        quaternary: colors.white,        // White (quaternary icons)
        disabled: colors.primary500,     // Very light brown (disabled icons)
        error: colors.maroon200,         // Medium warm red (error icons)
        success: colors.secondary200,    // Medium teal (success icons)
        warning: colors.accent200,       // Medium gold (warning icons)
      },
      border: {
        primary: colors.accent200,       // Medium gold (primary borders)
        secondary: colors.secondary200,  // Medium teal (secondary borders)
        error: colors.maroon200,         // Medium warm red (error borders)
        tertiary: colors.primary300,     // Light brown (tertiary borders)
        quaternary: colors.accent200,    // Medium gold (quaternary borders)
      },
      button: {
        primary: {
          background: colors.accent100,  // Goldenrod (main action buttons)
          text: colors.white,            // White text
        },
        secondary: {
          background: colors.secondary100, // Rich teal (secondary buttons)
          text: colors.white,            // White text
        },
        tertiary: {
          background: colors.tertiary100, // Rich purple (tertiary buttons)
          text: colors.white,            // White text
        },
        quaternary: {
          background: colors.quaternary100, // Rich orange (quaternary buttons)
          text: colors.white,            // White text
        },
        disabled: {
          background: colors.primary300, // Light brown (disabled)
          text: colors.primary500,       // Very light brown text
        },
      },
      status: {
        success: colors.secondary200,    // Medium teal (success status)
        error: colors.maroon200,         // Medium warm red (error status)
        warning: colors.accent200,       // Medium gold (warning status)
        info: colors.quaternary200,      // Medium orange (info status)
      },
      data: {
        // Primary data colors (8 colors - perfect for most visualizations)
        primary: [
          colors.dataLight.blue,
          colors.dataLight.green,
          colors.dataLight.orange,
          colors.dataLight.red,
          colors.dataLight.purple,
          colors.dataLight.teal,
          colors.dataLight.yellow,
          colors.dataLight.pink,
        ],
        // Extended data colors (16 colors - for complex visualizations)
        extended: [
          colors.dataLight.blue,
          colors.dataLight.green,
          colors.dataLight.orange,
          colors.dataLight.red,
          colors.dataLight.purple,
          colors.dataLight.teal,
          colors.dataLight.yellow,
          colors.dataLight.pink,
          colors.dataLight.indigo,
          colors.dataLight.emerald,
          colors.dataLight.amber,
          colors.dataLight.rose,
          colors.dataLight.cyan,
          colors.dataLight.lime,
          colors.dataLight.violet,
          colors.dataLight.fuchsia,
        ],
        // Semantic data colors
        semantic: {
          positive: colors.dataLight.green,
          negative: colors.dataLight.red,
          neutral: colors.dataLight.gray,
          highlight: colors.dataLight.blue,
        },
        // Data visualization background colors
        background: {
          primary: colors.primary50,     // Deep chocolate brown (matches main theme)
          secondary: colors.primary100,  // Rich brown
          grid: colors.primary300,       // Light brown grid lines
          axis: colors.primary400,       // Pale brown axis lines
        },
      },
    };
  } else {
    return {
      background: {
        primary: '#0A0E1A',             // Deep navy blue (main background)
        secondary: '#1A2332',           // Rich dark blue (secondary background)
        card: '#2A3441',                // Medium dark blue (card backgrounds)
        tertiary: '#1E3A5F',            // Deep blue (tertiary)
        quaternary: '#2563EB',          // Bright blue (quaternary)
      },
      text: {
        primary: colors.white,           // White (main text)
        secondary: '#E0E7FF',           // Light blue-white (secondary text)
        disabled: '#94A3B8',            // Medium blue-gray (disabled)
        error: '#F87171',               // Light red (error text)
        success: '#34D399',             // Light green (success text)
        warning: '#FBBF24',             // Light amber (warning text)
        tertiary: colors.white,          // White (tertiary text)
        quaternary: colors.white,        // White (quaternary text)
      },
      icon: {
        primary: '#60A5FA',             // Light blue (primary icons)
        secondary: '#34D399',           // Light green (secondary icons)
        tertiary: '#A78BFA',            // Light purple (tertiary icons)
        quaternary: colors.white,        // White (quaternary icons)
        disabled: '#94A3B8',            // Medium blue-gray (disabled)
        error: '#F87171',               // Light red (error icons)
        success: '#34D399',             // Light green (success icons)
        warning: '#FBBF24',             // Light amber (warning icons)
      },
      border: {
        primary: '#60A5FA',             // Light blue (primary borders)
        secondary: '#34D399',           // Light green (secondary borders)
        error: '#F87171',               // Light red (error borders)
        tertiary: '#94A3B8',            // Medium blue-gray (tertiary borders)
        quaternary: '#60A5FA',          // Light blue (quaternary borders)
      },
      button: {
        primary: {
          background: '#2563EB',         // Bright blue (primary buttons)
          text: colors.white,            // White text
        },
        secondary: {
          background: '#059669',         // Dark green (secondary buttons)
          text: colors.white,            // White text
        },
        tertiary: {
          background: '#7C3AED',         // Dark purple (tertiary buttons)
          text: colors.white,            // White text
        },
        quaternary: {
          background: '#DC2626',         // Dark red (quaternary buttons)
          text: colors.white,            // White text
        },
        disabled: {
          background: '#374151',         // Dark gray (disabled)
          text: '#94A3B8',               // Medium blue-gray text
        },
      },
      status: {
        success: colors.secondary200,    // Medium teal (success status)
        error: colors.maroon200,         // Medium warm red (error status)
        warning: colors.accent200,       // Medium gold (warning status)
        info: colors.quaternary200,      // Medium orange (info status)
      },
      data: {
        // Primary data colors (8 colors - perfect for most visualizations)
        primary: [
          colors.dataDark.blue,
          colors.dataDark.green,
          colors.dataDark.orange,
          colors.dataDark.red,
          colors.dataDark.purple,
          colors.dataDark.teal,
          colors.dataDark.yellow,
          colors.dataDark.pink,
        ],
        // Extended data colors (16 colors - for complex visualizations)
        extended: [
          colors.dataDark.blue,
          colors.dataDark.green,
          colors.dataDark.orange,
          colors.dataDark.red,
          colors.dataDark.purple,
          colors.dataDark.teal,
          colors.dataDark.yellow,
          colors.dataDark.pink,
          colors.dataDark.indigo,
          colors.dataDark.emerald,
          colors.dataDark.amber,
          colors.dataDark.rose,
          colors.dataDark.cyan,
          colors.dataDark.lime,
          colors.dataDark.violet,
          colors.dataDark.fuchsia,
        ],
        // Semantic data colors
        semantic: {
          positive: colors.dataDark.green,
          negative: colors.dataDark.red,
          neutral: colors.dataDark.gray,
          highlight: colors.dataDark.blue,
        },
        // Data visualization background colors
        background: {
          primary: '#0A0E1A',           // Deep navy blue (matches main theme)
          secondary: '#1A2332',         // Rich dark blue
          grid: '#374151',              // Dark gray grid lines
          axis: '#6B7280',              // Medium gray axis lines
        },
      },
    };
  }
};

export const defaultTheme = generateTheme('light');
