import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

interface MandalaPatternProps {
  width?: number;
  height?: number;
  opacity?: number;
  variant?: 'full' | 'corner' | 'center';
}

const MandalaPattern: React.FC<MandalaPatternProps> = ({ 
  width = 200, 
  height = 200, 
  opacity = 0.08,
  variant = 'full'
}) => {
  const theme = useThemeColors();
  
  const getPattern = () => {
    switch (variant) {
      case 'corner':
        return (
          <G>
            {/* Corner mandala - quarter circle design */}
            <Path
              d="M0,0 L0,60 Q0,0 60,0 Z"
              fill={theme.border.quaternary}
              fillOpacity={opacity}
            />
            <Path
              d="M0,0 L0,40 Q0,0 40,0 Z"
              fill={theme.border.quaternary}
              fillOpacity={opacity * 0.7}
            />
            <Path
              d="M0,0 L0,20 Q0,0 20,0 Z"
              fill={theme.border.quaternary}
              fillOpacity={opacity * 0.5}
            />
            {/* Lotus petals */}
            <Path
              d="M0,0 Q10,5 20,0 Q10,-5 0,0"
              fill={theme.icon.quaternary}
              fillOpacity={opacity * 0.6}
            />
            <Path
              d="M0,0 Q5,10 0,20 Q-5,10 0,0"
              fill={theme.icon.quaternary}
              fillOpacity={opacity * 0.6}
            />
          </G>
        );
      case 'center':
        return (
          <G>
            {/* Center mandala - circular design */}
            <Circle
              cx={width/2}
              cy={height/2}
              r="30"
              fill="none"
              stroke={theme.border.quaternary}
              strokeWidth="1"
              strokeOpacity={opacity}
            />
            <Circle
              cx={width/2}
              cy={height/2}
              r="20"
              fill="none"
              stroke={theme.border.quaternary}
              strokeWidth="1"
              strokeOpacity={opacity * 0.7}
            />
            <Circle
              cx={width/2}
              cy={height/2}
              r="10"
              fill={theme.border.quaternary}
              fillOpacity={opacity * 0.5}
            />
            {/* Lotus center */}
            <Path
              d={`M${width/2},${height/2-8} Q${width/2+6},${height/2-4} ${width/2},${height/2+8} Q${width/2-6},${height/2-4} ${width/2},${height/2-8}`}
              fill={theme.icon.quaternary}
              fillOpacity={opacity * 0.8}
            />
          </G>
        );
      default:
        return (
          <G>
            {/* Full mandala pattern */}
            <Circle
              cx={width/2}
              cy={height/2}
              r="80"
              fill="none"
              stroke={theme.border.quaternary}
              strokeWidth="1"
              strokeOpacity={opacity}
            />
            <Circle
              cx={width/2}
              cy={height/2}
              r="60"
              fill="none"
              stroke={theme.border.quaternary}
              strokeWidth="1"
              strokeOpacity={opacity * 0.7}
            />
            <Circle
              cx={width/2}
              cy={height/2}
              r="40"
              fill="none"
              stroke={theme.border.quaternary}
              strokeWidth="1"
              strokeOpacity={opacity * 0.5}
            />
            <Circle
              cx={width/2}
              cy={height/2}
              r="20"
              fill={theme.border.quaternary}
              fillOpacity={opacity * 0.3}
            />
            {/* Decorative petals around the center */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = width/2 + Math.cos(angle) * 25;
              const y1 = height/2 + Math.sin(angle) * 25;
              const x2 = width/2 + Math.cos(angle) * 35;
              const y2 = height/2 + Math.sin(angle) * 35;
              return (
                <Path
                  key={i}
                  d={`M${width/2},${height/2} L${x1},${y1} Q${x2},${y2} ${x1},${y1} Z`}
                  fill={theme.icon.primary}
                  fillOpacity={opacity * 0.4}
                />
              );
            })}
          </G>
        );
    }
  };
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      <Rect fill="transparent" width={width} height={height} />
      {getPattern()}
    </Svg>
  );
};

export default MandalaPattern;
