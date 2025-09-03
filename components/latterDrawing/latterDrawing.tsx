import { SIZES } from "@/constants/sizes";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ui/ThemedText/ThemedText";
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

export const LetterTracing = forwardRef<LetterTracingRef, LetterTracingProps>(({
  // Letter configuration
  letterSvg,
  fullSvg,
  fallbackPath,
  
  // Styling
  strokeWidth = 20,
  letterColor = "black",
  backgroundColor = "#49EDFF",
  drawingColor = "#FA00FF",
  drawingStrokeWidth = 6,
  letterSize = 1,
  
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
  // State for drawing paths (simplified for fallback)
  const [drawingPaths] = useState<Array<{x: number, y: number}>>([]);

  // Callbacks
  const resetDrawing = useCallback(() => {
    // Drawing functionality temporarily disabled
    onReset?.();
  }, [onReset]);

  const clearDrawing = useCallback(() => {
    // Drawing functionality temporarily disabled
  }, []);

  const getDrawingPath = useCallback((): DrawingPath => ({
    path: drawingPaths,
    timestamp: Date.now(),
  }), [drawingPaths]);

  const setLetterPath = useCallback((path: string) => {
    console.log('Setting new letter path:', path);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    resetDrawing,
    clearDrawing,
    getDrawingPath,
    setLetterPath,
  }), [resetDrawing, clearDrawing, getDrawingPath, setLetterPath]);

  // Note: Gesture handling removed as it's not needed for the fallback UI

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
      <View style={styles.container}>
        <ThemedText style={styles.title}>Letter Drawing</ThemedText>
        <ThemedText style={styles.subtitle}>
          Drawing functionality temporarily unavailable
        </ThemedText>
        <ThemedText style={styles.description}>
          The letter drawing feature requires React Native Skia which is currently not available.
          This feature will be restored in a future update.
        </ThemedText>
      </View>
    </ThemedView>
  );
});

LetterTracing.displayName = 'LetterTracing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SIZES.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: SIZES.spacing.lg,
    textAlign: 'center',
    opacity: 0.8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 20,
  },
});

export default LetterTracing;