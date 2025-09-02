import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

interface VisibleDotsProps {
  width?: number;
  height?: number;
  opacity?: number;
  dotSize?: number;
  spacing?: number;
}

const VisibleDots: React.FC<VisibleDotsProps> = ({ 
  width = 400, 
  height = 400, 
  opacity = 0.3,
  dotSize = 3,
  spacing = 50
}) => {
  const theme = useThemeColors();
  
  // Generate dots in a grid pattern
  const dots = [];
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      dots.push({ x, y });
    }
  }
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      <Rect fill="transparent" width={width} height={height} />
      {dots.map((dot, index) => (
        <Circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dotSize}
          fill={theme.border.primary}
          fillOpacity={opacity}
        />
      ))}
    </Svg>
  );
};

export default VisibleDots;
