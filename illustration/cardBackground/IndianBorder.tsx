import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { G, Path, Rect } from "react-native-svg";

interface IndianBorderProps {
  width?: number;
  height?: number;
  opacity?: number;
  variant?: 'top' | 'bottom' | 'left' | 'right' | 'all';
  thickness?: number;
}

const IndianBorder: React.FC<IndianBorderProps> = ({ 
  width = 200, 
  height = 200, 
  opacity = 0.1,
  variant = 'all',
  thickness = 2
}) => {
  const theme = useThemeColors();
  
  const createDecorativeElement = (x: number, y: number, size: number) => (
    <G key={`${x}-${y}`}>
      {/* Small decorative circle */}
      <Path
        d={`M${x},${y} m-${size/2},0 a${size/2},${size/2} 0 1,1 ${size},0 a${size/2},${size/2} 0 1,1 -${size},0`}
        fill={theme.border.primary}
        fillOpacity={opacity}
      />
      {/* Small decorative diamond */}
      <Path
        d={`M${x},${y-size/2} L${x+size/2},${y} L${x},${y+size/2} L${x-size/2},${y} Z`}
        fill={theme.border.secondary}
        fillOpacity={opacity * 0.7}
      />
    </G>
  );
  
  const getBorderPattern = () => {
    const elements = [];
    
    switch (variant) {
      case 'top':
        // Top border with decorative elements
        elements.push(
          <Path
            key="top-border"
            d={`M0,${thickness} L${width},${thickness}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />
        );
        // Add decorative elements along the top
        for (let x = 20; x < width; x += 30) {
          elements.push(createDecorativeElement(x, thickness + 8, 4));
        }
        break;
        
      case 'bottom':
        // Bottom border with decorative elements
        elements.push(
          <Path
            key="bottom-border"
            d={`M0,${height-thickness} L${width},${height-thickness}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />
        );
        // Add decorative elements along the bottom
        for (let x = 20; x < width; x += 30) {
          elements.push(createDecorativeElement(x, height - thickness - 8, 4));
        }
        break;
        
      case 'left':
        // Left border with decorative elements
        elements.push(
          <Path
            key="left-border"
            d={`M${thickness},0 L${thickness},${height}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />
        );
        // Add decorative elements along the left
        for (let y = 20; y < height; y += 30) {
          elements.push(createDecorativeElement(thickness + 8, y, 4));
        }
        break;
        
      case 'right':
        // Right border with decorative elements
        elements.push(
          <Path
            key="right-border"
            d={`M${width-thickness},0 L${width-thickness},${height}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />
        );
        // Add decorative elements along the right
        for (let y = 20; y < height; y += 30) {
          elements.push(createDecorativeElement(width - thickness - 8, y, 4));
        }
        break;
        
      default: // 'all'
        // All borders with corner decorations
        elements.push(
          <Path
            key="top-border"
            d={`M0,${thickness} L${width},${thickness}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />,
          <Path
            key="bottom-border"
            d={`M0,${height-thickness} L${width},${height-thickness}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />,
          <Path
            key="left-border"
            d={`M${thickness},0 L${thickness},${height}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />,
          <Path
            key="right-border"
            d={`M${width-thickness},0 L${width-thickness},${height}`}
            stroke={theme.border.primary}
            strokeWidth={thickness}
            strokeOpacity={opacity}
          />
        );
        
        // Corner decorations
        elements.push(
          // Top-left corner
          createDecorativeElement(thickness + 8, thickness + 8, 6),
          // Top-right corner
          createDecorativeElement(width - thickness - 8, thickness + 8, 6),
          // Bottom-left corner
          createDecorativeElement(thickness + 8, height - thickness - 8, 6),
          // Bottom-right corner
          createDecorativeElement(width - thickness - 8, height - thickness - 8, 6)
        );
        break;
    }
    
    return elements;
  };
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      <Rect fill="transparent" width={width} height={height} />
      {getBorderPattern()}
    </Svg>
  );
};

export default IndianBorder;
