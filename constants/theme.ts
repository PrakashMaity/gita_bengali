import { Theme } from '../interface/color.interface';
import { colors } from './tint';

export type { Theme };
export type ThemeMode = 'light' | 'dark';

export const generateTheme = (mode: ThemeMode): Theme => {
  if (mode === 'light') {
    return {
      background: {
        primary: colors.primary100,      // Light cream background (main content area)
        secondary: colors.primary200,    // Slightly darker cream (card backgrounds)
        card: colors.primary200,         // Card backgrounds (grid buttons)
        tertiary: colors.primary300,     // Medium orange (subtle accents)
        quaternary: colors.primary400,   // Bright orange (highlights)
      },
      text: {
        primary: colors.warmGray900,     // Dark warm gray (main text)
        secondary: colors.warmGray700,   // Medium warm gray (secondary text)
        disabled: colors.warmGray400,    // Light warm gray (disabled text)
        error: colors.red,               // Error text
        success: colors.green,           // Success text
        warning: colors.yellow,          // Warning text
        tertiary: colors.warmGray900,    // Dark text on tertiary backgrounds
        quaternary: colors.white,        // White text on quaternary backgrounds
      },
      icon: {
        primary: colors.primary600,      // Vibrant orange (header icons)
        secondary: colors.primary700,    // Dark orange (secondary icons)
        tertiary: colors.warmGray700,   // Medium gray (tertiary icons)
        quaternary: colors.white,        // White (quaternary icons)
        disabled: colors.warmGray400,    // Light gray (disabled icons)
        error: colors.red,               // Error icons
        success: colors.green,           // Success icons
        warning: colors.yellow,          // Warning icons
      },
      border: {
        primary: colors.primary400,      // Bright orange (primary borders)
        secondary: colors.primary300,    // Medium orange (secondary borders)
        error: colors.red,               // Error borders
        tertiary: colors.warmGray300,    // Light gray (tertiary borders)
        quaternary: colors.primary500,   // Deep orange (quaternary borders)
      },
      button: {
        primary: {
          background: colors.primary600, // Vibrant orange (main action buttons)
          text: colors.white,            // White text on orange
        },
        secondary: {
          background: colors.white,      // White background (secondary buttons)
          text: colors.primary700,       // Dark orange text
        },
        tertiary: {
          background: colors.primary200, // Light cream (grid buttons)
          text: colors.warmGray900,      // Dark text on cream
        },
        quaternary: {
          background: colors.primary400, // Bright orange (highlight buttons)
          text: colors.white,            // White text
        },
        disabled: {
          background: colors.warmGray200, // Light gray (disabled)
          text: colors.warmGray400,      // Medium gray text
        },
      },
      status: {
        success: colors.green,           // Success status
        error: colors.red,               // Error status
        warning: colors.yellow,          // Warning status
        info: colors.blue,               // Info status
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
          primary: colors.primary100,    // Light cream (matches main theme)
          secondary: colors.primary200,  // Slightly darker cream
          grid: colors.warmGray200,      // Light gray grid lines
          axis: colors.warmGray400,      // Medium gray axis lines
        },
      },
    };
  } else {
    return {
      background: {
        primary: colors.black900,        // Almost black (main background)
        secondary: colors.maroon900,     // Dark maroon (secondary background)
        card: colors.black800,           // Dark gray (card backgrounds)
        tertiary: colors.coolGray800,    // Cool dark gray (tertiary)
        quaternary: colors.coolGray700,  // Medium cool gray (quaternary)
      },
      text: {
        primary: colors.white,           // White (main text)
        secondary: colors.coolGray100,   // Light cool gray (secondary text)
        disabled: colors.coolGray400,    // Medium cool gray (disabled)
        error: colors.red,               // Error text
        success: colors.green,           // Success text
        warning: colors.yellow,          // Warning text
        tertiary: colors.white,          // White (tertiary text)
        quaternary: colors.white,        // White (quaternary text)
      },
      icon: {
        primary: colors.maroon600,       // Maroon (primary icons)
        secondary: colors.maroon500,     // Light maroon (secondary icons)
        tertiary: colors.indigo,         // Indigo (tertiary icons)
        quaternary: colors.purple,       // Purple (quaternary icons)
        disabled: colors.coolGray400,    // Medium gray (disabled)
        error: colors.red,               // Error icons
        success: colors.green,           // Success icons
        warning: colors.yellow,          // Warning icons
      },
      border: {
        primary: colors.maroon500,       // Light maroon (primary borders)
        secondary: colors.maroon600,     // Maroon (secondary borders)
        error: colors.red,               // Error borders
        tertiary: colors.indigo,         // Indigo (tertiary borders)
        quaternary: colors.purple,       // Purple (quaternary borders)
      },
      button: {
        primary: {
          background: colors.maroon600,  // Maroon (primary buttons)
          text: colors.white,            // White text
        },
        secondary: {
          background: colors.black800,   // Dark gray (secondary buttons)
          text: colors.maroon300,        // Light maroon text
        },
        tertiary: {
          background: colors.indigo,     // Indigo (tertiary buttons)
          text: colors.white,            // White text
        },
        quaternary: {
          background: colors.purple,     // Purple (quaternary buttons)
          text: colors.white,            // White text
        },
        disabled: {
          background: colors.coolGray700, // Medium gray (disabled)
          text: colors.coolGray400,      // Light gray text
        },
      },
      status: {
        success: colors.green,           // Success status
        error: colors.red,               // Error status
        warning: colors.yellow,          // Warning status
        info: colors.blue,               // Info status
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
          primary: colors.black900,      // Almost black (matches main theme)
          secondary: colors.black800,    // Dark gray
          grid: colors.coolGray700,      // Medium gray grid lines
          axis: colors.coolGray500,      // Light gray axis lines
        },
      },
    };
  }
};

export const defaultTheme = generateTheme('light');
