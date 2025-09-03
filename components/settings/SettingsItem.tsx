import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ui/ThemedText/ThemedText';
import { ThemedView } from '../ui/ThemedView/ThemedView';

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  value,
  icon,
  onPress,
  rightElement,
  disabled = false,
}) => {
  const { theme } = useTheme();

  const content = (
    <ThemedView style={[styles.container, disabled && styles.disabledContainer]}>
      <View style={styles.leftContent}>
        {icon && (
          <ThemedText style={[styles.icon, { color: theme.icon.primary }]}>
            {icon}
          </ThemedText>
        )}
        <View style={styles.textContent}>
          <ThemedText style={[styles.title, { color: theme.text.primary }]}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText style={[styles.subtitle, { color: theme.text.secondary }]}>
              {subtitle}
            </ThemedText>
          )}
        </View>
      </View>
      
      <View style={styles.rightContent}>
        {value && (
          <ThemedText style={[styles.value, { color: theme.text.secondary }]}>
            {value}
          </ThemedText>
        )}
        {rightElement}
        {onPress && (
          <ThemedText style={[styles.chevron, { color: theme.text.secondary }]}>
            ›
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.spacing.lg,
    paddingHorizontal: SIZES.spacing.xl,
    marginVertical: SIZES.spacing.xs,
    minHeight: SIZES.button.lg,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: SIZES.icon.lg,
    marginRight: SIZES.spacing.lg,
    width: SIZES.icon.xl,
    textAlign: 'center',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    marginBottom: SIZES.spacing.xs,
    lineHeight: TYPOGRAPHY.lineHeight.lg,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    opacity: 0.7,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginRight: SIZES.spacing.md,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
    opacity: 0.8,
  },
  chevron: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.light,
    opacity: 0.6,
  },
});
