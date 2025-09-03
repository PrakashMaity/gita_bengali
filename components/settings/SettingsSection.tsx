import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedCard } from '../ui/ThemedCard/ThemedCard';
import { ThemedText } from '../ui/ThemedText/ThemedText';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  description,
}) => {
  const { theme } = useTheme();

  return (
    <ThemedCard  style={styles.container}>
      <View style={[styles.header, { borderBottomColor: theme.border.tertiary }]}>
        <ThemedText style={{...styles.title, color: theme.text.primary }}>
          {title}
        </ThemedText>
        {description && (
          <ThemedText style={{...styles.description, color: theme.text.secondary }}>
            {description}
          </ThemedText>
        )}
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.spacing.md,
    marginHorizontal: 0,
    padding: 0,
  },
  header: {
    paddingHorizontal: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.md,
    borderBottomWidth: SIZES.borderSize.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: SIZES.spacing.xs,
    lineHeight: TYPOGRAPHY.lineHeight.xxl,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    opacity: 0.7,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
  },
  content: {
    paddingTop: SIZES.spacing.xs,
    paddingBottom: SIZES.spacing.sm,
  },
});
