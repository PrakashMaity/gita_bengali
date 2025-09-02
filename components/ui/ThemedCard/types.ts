import { ViewProps, ViewStyle } from "react-native";
import { CardVariant } from "./ThemedCard";

export interface ThemedCardProps extends ViewProps {
    variant?: CardVariant;
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
    borderVariant?: 'none' | 'primary' | 'secondary';
    onPress?: () => void;
    activeOpacity?: number;
  }