import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface WavePatternProps {
  width?: number;
  height?: number;
  opacity?: number;
}

const WavePattern: React.FC<WavePatternProps> = ({ 
  width = 400, 
  height = 400, 
  opacity = 0.15 
}) => {
  const theme = useThemeColors();
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      {/* Transparent background so the pattern shows through */}
      <Rect fill="transparent" width={width} height={height} />
      
      {/* Top wave */}
      <Path
        d={`M0,${height * 0.2} Q${width * 0.25},${height * 0.1} ${width * 0.5},${height * 0.2} T${width},${height * 0.2} L${width},${height * 0.3} L0,${height * 0.3} Z`}
        fill={theme.border.tertiary}
        fillOpacity={opacity}
      />
      
      {/* Middle wave */}
      <Path
        d={`M0,${height * 0.5} Q${width * 0.25},${height * 0.4} ${width * 0.5},${height * 0.5} T${width},${height * 0.5} L${width},${height * 0.6} L0,${height * 0.6} Z`}
        fill={theme.border.secondary}
        fillOpacity={opacity * 0.8}
      />
      
      {/* Bottom wave */}
      <Path
        d={`M0,${height * 0.8} Q${width * 0.25},${height * 0.7} ${width * 0.5},${height * 0.8} T${width},${height * 0.8} L${width},${height * 0.9} L0,${height * 0.9} Z`}
        fill={theme.border.primary}
        fillOpacity={opacity * 0.6}
      />
    </Svg>
  );
};

export default WavePattern;
