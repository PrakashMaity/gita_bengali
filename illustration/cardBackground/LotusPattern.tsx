import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface LotusPatternProps {
  width?: number;
  height?: number;
  opacity?: number;
  size?: 'small' | 'medium' | 'large';
}

const LotusPattern: React.FC<LotusPatternProps> = ({ 
  width = 150, 
  height = 150, 
  opacity = 0.06,
  size = 'medium'
}) => {
  const theme = useThemeColors();
  
  const getSizeMultiplier = () => {
    switch (size) {
      case 'small': return 0.7;
      case 'large': return 1.3;
      default: return 1;
    }
  };
  
  const multiplier = getSizeMultiplier();
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Create lotus petals
  const createLotusPetal = (angle: number, radius: number, petalSize: number) => {
    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * (radius + petalSize);
    const y2 = centerY + Math.sin(angle) * (radius + petalSize);
    const x3 = centerX + Math.cos(angle + 0.2) * (radius + petalSize * 0.7);
    const y3 = centerY + Math.sin(angle + 0.2) * (radius + petalSize * 0.7);
    
    return (
      <Path
        key={angle}
        d={`M${centerX},${centerY} L${x1},${y1} Q${x2},${y2} ${x3},${y3} Q${x1},${y1} ${centerX},${centerY} Z`}
        fill={theme.border.primary}
        fillOpacity={opacity}
      />
    );
  };
  
  // Create inner lotus petals
  const createInnerLotusPetal = (angle: number, radius: number, petalSize: number) => {
    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * (radius + petalSize);
    const y2 = centerY + Math.sin(angle) * (radius + petalSize);
    
    return (
      <Path
        key={`inner-${angle}`}
        d={`M${centerX},${centerY} L${x1},${y1} Q${x2},${y2} ${centerX},${centerY} Z`}
        fill={theme.border.secondary}
        fillOpacity={opacity * 0.7}
      />
    );
  };
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      <Rect fill="transparent" width={width} height={height} />
      
      {/* Outer lotus petals */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        return createLotusPetal(angle, 20 * multiplier, 15 * multiplier);
      })}
      
      {/* Inner lotus petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        return createInnerLotusPetal(angle, 10 * multiplier, 8 * multiplier);
      })}
      
      {/* Center circle */}
      <Path
        d={`M${centerX},${centerY} m-${5 * multiplier},0 a${5 * multiplier},${5 * multiplier} 0 1,1 ${10 * multiplier},0 a${5 * multiplier},${5 * multiplier} 0 1,1 -${10 * multiplier},0`}
        fill={theme.icon.primary}
        fillOpacity={opacity * 0.8}
      />
    </Svg>
  );
};

export default LotusPattern;
