import { useThemeColors } from '@/hooks/useTheme';
import * as React from "react";
import Svg, { Rect } from "react-native-svg";

interface TestPatternProps {
  width?: number;
  height?: number;
}

const TestPattern: React.FC<TestPatternProps> = ({ 
  width = 400, 
  height = 400
}) => {
  const theme = useThemeColors();
  
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', zIndex: -1 }}
    >
      {/* Test pattern with visible colors */}
      <Rect x={0} y={0} width={width/2} height={height/2} fill={theme.border.primary} fillOpacity={0.3} />
      <Rect x={width/2} y={0} width={width/2} height={height/2} fill={theme.border.secondary} fillOpacity={0.3} />
      <Rect x={0} y={height/2} width={width/2} height={height/2} fill={theme.border.tertiary} fillOpacity={0.3} />
      <Rect x={width/2} y={height/2} width={width/2} height={height/2} fill={theme.icon.primary} fillOpacity={0.3} />
    </Svg>
  );
};

export default TestPattern;
