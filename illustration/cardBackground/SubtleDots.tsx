import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

interface SubtleDotsProps {
  width?: number;
  height?: number;
  opacity?: number;
  dotSize?: number;
  spacing?: number;
}

const SubtleDots: React.FC<SubtleDotsProps> = ({ 
  width = 400, 
  height = 400, 
  opacity = 0.05,
  dotSize = 2,
  spacing = 40
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
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      <Rect fill={theme.background.primary} width={width} height={height} />
      {dots.map((dot, index) => (
        <Circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dotSize}
          fill={theme.border.tertiary}
          fillOpacity={opacity}
        />
      ))}
    </Svg>
  );
};

export default SubtleDots;
