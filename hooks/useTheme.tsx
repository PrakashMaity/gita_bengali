import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeMode, defaultTheme, generateTheme } from '../constants/theme';

// Theme Context Interface
interface ThemeContextType {
  theme: Theme;
  currentMode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>('light');
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Update theme when mode changes
  useEffect(() => {
    const newTheme = generateTheme(currentMode);
    setTheme(newTheme);
  }, [currentMode]);

  // Toggle between light and dark mode
  const toggleMode = React.useCallback(() => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
  }, [currentMode]);

  const contextValue: ThemeContextType = React.useMemo(() => ({
    theme,
    currentMode,
    setMode: setCurrentMode,
    toggleMode,
    isDark: currentMode === 'dark',
  }), [theme, currentMode, toggleMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook to get only the theme object
export const useThemeColors = (): Theme => {
  const { theme } = useTheme();
  return theme;
};

// Hook to get theme mode
export const useThemeMode = (): { isDark: boolean; mode: ThemeMode } => {
  const { isDark, currentMode } = useTheme();
  return { isDark, mode: currentMode };
}; 