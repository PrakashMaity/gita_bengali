import { SIZES } from "@/constants/sizes";
import { Canvas, Fill, Mask, Morphology, Path, Skia } from "@shopify/react-native-skia";
import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { ThemedView } from "../ui/ThemedView/ThemedView";

// Types
export interface DrawingPath {
  path: any;
  timestamp: number;
}

export interface LetterTracingProps {
  // Letter configuration
  letterSvg?: string;
  fullSvg?: string;
  fallbackPath?: () => any;
  
  // Styling
  strokeWidth?: number;
  letterColor?: string;
  backgroundColor?: string;
  drawingColor?: string;
  drawingStrokeWidth?: number;
  letterSize?: number;
  
  // Canvas configuration
  canvasSize?: number;
  showBackground?: boolean;
  
  // Callbacks
  onReset?: () => void;
  onVerify?: (drawPath: DrawingPath) => void;
  onDrawingStart?: () => void;
  onDrawingEnd?: () => void;
  onPathChange?: (path: DrawingPath) => void;
  
  // Styling
  style?: any;
  className?: string;
}

export interface LetterTracingRef {
  resetDrawing: () => void;
  clearDrawing: () => void;
  getDrawingPath: () => DrawingPath;
  setLetterPath: (path: string) => void;
}

// Constants
const DEFAULT_CANVAS_SIZE = SIZES.xxxl * 15; // 360px
const DEFAULT_STROKE_WIDTH = 20;
const DEFAULT_LETTER_COLOR = "black";
const DEFAULT_BACKGROUND_COLOR = "#49EDFF";
const DEFAULT_DRAWING_COLOR = "#FA00FF";
const DEFAULT_DRAWING_STROKE_WIDTH = 6;
const DEFAULT_LETTER_SIZE = 1;

// Utility functions
const extractPathFromSVG = (svgString: string): string | null => {
  try {
    // Extract path data from SVG string using regex
    const pathMatch = svgString.match(/<path[^>]*d="([^"]*)"[^>]*>/);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1];
    }
    
    // Try to extract from circle if it's a circle
    const circleMatch = svgString.match(/<circle[^>]*cx="([^"]*)"[^>]*cy="([^"]*)"[^>]*r="([^"]*)"[^>]*>/);
    if (circleMatch) {
      const cx = parseFloat(circleMatch[1]);
      const cy = parseFloat(circleMatch[2]);
      const r = parseFloat(circleMatch[3]);
      return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx - r} ${cy}`;
    }
    
    return null;
  } catch (error) {
    console.warn('Error extracting path from SVG:', error);
    return null;
  }
};

const createScaledPath = (path: any, canvasSize: number): any => {
  if (!path || path.isEmpty()) return path;
  
  try {
    const bounds = path.getBounds();
    const padding = canvasSize * 0.1; // 10% padding
    const availableSize = canvasSize - (padding * 2);
    
    // Calculate scale to fit within canvas
    const scaleX = availableSize / bounds.width;
    const scaleY = availableSize / bounds.height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
    
    // Calculate center position
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    
    // Create transformed path
    const transformedPath = Skia.Path.Make();
    const matrix = Skia.Matrix()
      .translate(
        centerX - (bounds.width * scale) / 2 - bounds.x * scale,
        centerY - (bounds.height * scale) / 2 - bounds.y * scale
      )
      .scale(scale, scale);
    
    transformedPath.addPath(path, matrix);
    return transformedPath;
  } catch (error) {
    console.warn('Error scaling path:', error);
    return path;
  }
};

export const LetterTracing = forwardRef<LetterTracingRef, LetterTracingProps>(({
  // Letter configuration
  letterSvg,
  fullSvg,
  fallbackPath,
  
  // Styling
  strokeWidth = DEFAULT_STROKE_WIDTH,
  letterColor = DEFAULT_LETTER_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  drawingColor = DEFAULT_DRAWING_COLOR,
  drawingStrokeWidth = DEFAULT_DRAWING_STROKE_WIDTH,
  letterSize = DEFAULT_LETTER_SIZE,
  
  // Canvas configuration
  canvasSize = DEFAULT_CANVAS_SIZE,
  showBackground = true,
  
  // Callbacks
  onReset,
  onVerify,
  onDrawingStart,
  onDrawingEnd,
  onPathChange,
  
  // Styling
  style,
  className,
}, ref) => {
  // State
  const drawPath = useSharedValue(Skia.Path.Make());
  const isDrawing = useSharedValue(false);

  // Memoized letter path with proper scaling
  const letterPath = useMemo(() => {
    let path: any = null;
    
    // Try full SVG first if provided
    if (fullSvg) {
      const extractedPath = extractPathFromSVG(fullSvg);
      if (extractedPath) {
        path = Skia.Path.MakeFromSVGString(extractedPath);
      }
    }
    
    // Try SVG path if provided
    if (!path && letterSvg) {
      path = Skia.Path.MakeFromSVGString(letterSvg);
    }
    
    // Use fallback if provided
    if (!path && fallbackPath) {
      path = fallbackPath();
    }
    
    // Create empty path if nothing works
    if (!path) {
      path = Skia.Path.Make();
    }
    
    // Scale and center the path
    return createScaledPath(path, canvasSize);
  }, [letterSvg, fullSvg, fallbackPath, canvasSize]);

  // Callbacks
  const resetDrawing = useCallback(() => {
    drawPath.value = Skia.Path.Make();
    drawPath.modify();
    onReset?.();
  }, [drawPath, onReset]);

  const clearDrawing = useCallback(() => {
    drawPath.value = Skia.Path.Make();
    drawPath.modify();
  }, [drawPath]);

  const getDrawingPath = useCallback((): DrawingPath => ({
    path: drawPath.value,
    timestamp: Date.now(),
  }), [drawPath]);

  const setLetterPath = useCallback((path: string) => {
    // This could be enhanced to dynamically update the letter
    console.log('Setting new letter path:', path);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    resetDrawing,
    clearDrawing,
    getDrawingPath,
    setLetterPath,
  }), [resetDrawing, clearDrawing, getDrawingPath, setLetterPath]);

  // Gesture handling
  const gesture = useMemo(() => Gesture.Pan()
    .onBegin((event) => {
      isDrawing.value = true;
      drawPath.value.moveTo(event.x, event.y);
      drawPath.modify();
      onDrawingStart?.();
    })
    .onChange((event) => {
      if (isDrawing.value) {
        drawPath.value.lineTo(event.x, event.y);
        drawPath.modify();
        onPathChange?.(getDrawingPath());
      }
    })
    .onEnd(() => {
      isDrawing.value = false;
      onDrawingEnd?.();
    })
    .onFinalize(() => {
      isDrawing.value = false;
    }), [drawPath, isDrawing, onDrawingStart, onDrawingEnd, onPathChange, getDrawingPath]);

  // Canvas styles
  const canvasContainerStyle = {
    width: canvasSize,
    height: canvasSize,
    maxWidth: '100%' as const,
    maxHeight: '100%' as const,
    aspectRatio: 1,
    overflow: 'hidden' as const,
  };

  const canvasStyle = {
    width: '100%' as const,
    height: '100%' as const,
  };

  return (
    <ThemedView 
      variant="primary" 
      style={[
        { 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: SIZES.spacing.md,
        }, 
        style
      ]}
    >
      <GestureHandlerRootView style={canvasContainerStyle}>
        <GestureDetector gesture={gesture}>
          <Canvas style={canvasStyle}>
            {showBackground && <Fill color={backgroundColor} />}
            
            {/* Letter outline */}
            <Path 
              path={letterPath} 
              color={letterColor} 
              strokeWidth={strokeWidth * letterSize} 
              style="stroke" 
            />
            
            {/* Drawing mask - only allow drawing on the letter stroke */}
            <Mask mask={
              <Path 
                path={letterPath} 
                color="black" 
                strokeWidth={strokeWidth * letterSize} 
                style="stroke"
              >
                <Morphology radius={1} />
              </Path>
            }>
              <Path 
                path={drawPath} 
                color={drawingColor} 
                strokeWidth={drawingStrokeWidth} 
                style="stroke" 
              />
            </Mask>
          </Canvas>
        </GestureDetector>
      </GestureHandlerRootView>
    </ThemedView>
  );
});

LetterTracing.displayName = 'LetterTracing';

export default LetterTracing;