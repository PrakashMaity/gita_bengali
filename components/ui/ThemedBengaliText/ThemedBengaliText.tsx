import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useThemeColors } from '../../../hooks/useTheme';

export type BengaliTextVariant = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'accent' 
  | 'error' 
  | 'success';

export type BengaliTextSize = 
  | 'xs' 
  | 'small' 
  | 'medium' 
  | 'large' 
  | 'xl' 
  | 'xxl' 
  | 'title';

export type BengaliFontFamily = 
  | 'begumZia' 
  | 'benSen' 
  | 'mahinSameya' 
  | 'mahinDhaka' 
  | 'spaceMono';

export interface ThemedBengaliTextProps extends TextProps {
  variant?: BengaliTextVariant;
  size?: BengaliTextSize;
  fontFamily?: BengaliFontFamily;
  children: React.ReactNode;
}

export const ThemedBengaliText: React.FC<ThemedBengaliTextProps> = ({
  variant = 'primary',
  size = 'medium',
  fontFamily = 'begumZia',
  style,
  children,
  ...props
}) => {
  const theme = useThemeColors();

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: 'left',
    };

    // Variant styles
    const variantStyles: Record<BengaliTextVariant, TextStyle> = {
      primary: {
        color: theme.text.primary,
      },
      secondary: {
        color: theme.text.secondary,
      },
      tertiary: {
        color: theme.text.tertiary,
      },
      accent: {
        color: theme.text.primary,
      },
      error: {
        color: theme.text.error,
      },
      success: {
        color: theme.text.success,
      },
    };

    // Size styles
    const sizeStyles: Record<BengaliTextSize, TextStyle> = {
      xs: {
        fontSize: 12,
        lineHeight: 16,
      },
      small: {
        fontSize: 14,
        lineHeight: 18,
      },
      medium: {
        fontSize: 16,
        lineHeight: 20,
      },
      large: {
        fontSize: 18,
        lineHeight: 22,
      },
      xl: {
        fontSize: 20,
        lineHeight: 24,
      },
      xxl: {
        fontSize: 24,
        lineHeight: 28,
      },
      title: {
        fontSize: 28,
        lineHeight: 32,
      },
    };

    // Font family styles
    const fontFamilyStyles: Record<BengaliFontFamily, TextStyle> = {
      begumZia: {
        fontFamily: 'BegumZiaRegulaCurve',
      },
      benSen: {
        fontFamily: 'BenSenHandwriting',
      },
      mahinSameya: {
        fontFamily: 'FNMahinSameyaANSI',
      },
      mahinDhaka: {
        fontFamily: 'MahinDhakaItalic',
      },
      spaceMono: {
        fontFamily: 'SpaceMono-Regular',
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...fontFamilyStyles[fontFamily],
    };
  };

  const textStyle = getTextStyle();

  // Handle both single style and array of styles
  const finalStyle = Array.isArray(style) 
    ? [textStyle, ...style] 
    : { ...textStyle, ...(style as TextStyle) };

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
};
