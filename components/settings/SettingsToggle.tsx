import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { ThemedText } from '../ui/ThemedText/ThemedText';
import { ThemedView } from '../ui/ThemedView/ThemedView';

interface SettingsToggleProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: string;
  disabled?: boolean;
  showDivider?: boolean;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
  icon,
  disabled = false,
  showDivider = false,
}) => {
  const { theme } = useTheme();

  return (
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
      
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: theme.background.card,
          true: theme.button.primary.background,
        }}
        thumbColor={value ? theme.text.primary : theme.text.secondary}
        ios_backgroundColor={theme.background.card}
      />
      
      {showDivider && (
        <ThemedView style={[styles.divider, { backgroundColor: theme.border.tertiary }]} />
      )}
    </ThemedView>
  );
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
  divider: {
    position: 'absolute',
    bottom: 0,
    left: SIZES.spacing.xl,
    right: SIZES.spacing.xl,
    height: SIZES.borderSize.xs,
  },
});
