import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { SIZES } from '../../../constants/sizes';
import { Z_INDEX } from '../../../constants/zIndex';
import { useThemeColors } from '../../../hooks/useTheme';
import { ThemedView } from '../ThemedView/ThemedView';
import { ThemedCardProps } from './types';

export type CardVariant = 'primary' | 'secondary' | 'card' | 'transparent';



export const ThemedCard: React.FC<ThemedCardProps> = ({
  variant = 'transparent',
  style,
  children,
  borderVariant = 'none',
  onPress,
  activeOpacity = 0.7,
  ...props
}) => {
  const theme = useThemeColors();

  const getCardStyle = (): ViewStyle | ViewStyle[] => {
    const baseStyle: ViewStyle = {
      borderRadius: SIZES.card.borderRadius,
      padding: SIZES.card.padding,
      margin: SIZES.card.margin,
      zIndex: Z_INDEX.card,
      borderWidth:borderVariant === 'none' ? 0 : SIZES.borderSize.lg,
      borderColor:borderVariant === 'none' ? 'transparent' : theme.border[borderVariant],
    };

    // Variant styles
    const variantStyles: Record<CardVariant, ViewStyle> = {
      primary: {
        backgroundColor: theme.background.secondary,
       
      },
      secondary: {
        backgroundColor: theme.background.primary,
       
      },
      card: {
        backgroundColor: theme.background.card,
       
      },
      transparent: {
        backgroundColor: 'transparent',
      },
    };

    const finalStyle = {
      ...baseStyle,
      ...variantStyles[variant],
    };

    // Handle both single style and array of styles
    if (Array.isArray(style)) {
      return [finalStyle, ...style];
    }

    return {
      ...finalStyle,
      ...style,
    };
  };

  const cardStyle = getCardStyle();

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView variant='primary' style={cardStyle} {...props}>
      {children}
    </ThemedView>
  );
};

