import { SettingsItem, SettingsSection, SettingsToggle } from '@/components/settings';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme } from '@/hooks/useTheme';
import { useSettingsStore } from '@/store';
import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const { theme, toggleMode, isDark } = useTheme();
  const { 
    settings, 
    toggleBackgroundAudio, 
    toggleNotifications, 
    toggleAutoPlayNext,
    updateSetting 
  } = useSettingsStore();

  const handleThemeChange = () => {
    toggleMode();
  };

  const handleAudioQualityChange = () => {
    const qualities = ['low', 'medium', 'high'] as const;
    const currentIndex = qualities.indexOf(settings.audioQuality);
    const nextIndex = (currentIndex + 1) % qualities.length;
    updateSetting('audioQuality', qualities[nextIndex]);
  };

  const handleFontSizeChange = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    updateSetting('fontSize', sizes[nextIndex]);
  };

  const handleLanguageChange = () => {
    const languages = ['bengali', 'english', 'hindi'] as const;
    const currentIndex = languages.indexOf(settings.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    updateSetting('language', languages[nextIndex]);
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset logic would go here
            Alert.alert('Settings Reset', 'All settings have been reset to default values.');
          }
        }
      ]
    );
  };

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'low': return 'Low (64 kbps)';
      case 'medium': return 'Medium (128 kbps)';
      case 'high': return 'High (320 kbps)';
      default: return 'Medium (128 kbps)';
    }
  };

  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return 'Small';
      case 'medium': return 'Medium';
      case 'large': return 'Large';
      default: return 'Medium';
    }
  };

  const getLanguageLabel = (language: string) => {
    switch (language) {
      case 'bengali': return 'বাংলা (Bengali)';
      case 'english': return 'English';
      case 'hindi': return 'हिन्दी (Hindi)';
      default: return 'বাংলা (Bengali)';
    }
  };

  return (
    <ThemedView variant='primary' style={styles.container}>
      {/* Header */}
      <ThemedView style={[styles.header, { borderBottomColor: theme.border.tertiary }]}>
        <ThemedText style={{ ...styles.title, color: theme.text.primary }}>
          সেটিংস (Settings)
        </ThemedText>
        <ThemedText style={{ ...styles.subtitle, color: theme.text.secondary }}>
          Customize your Gita experience
        </ThemedText>
      </ThemedView>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <SettingsSection 
            title="Appearance" 
            description="Customize the look and feel of the app"
          >
            <SettingsToggle
              title="Dark Mode"
              subtitle={isDark ? "Dark theme enabled" : "Light theme enabled"}
              icon="🌙"
              value={isDark}
              onValueChange={handleThemeChange}
              showDivider={true}
            />
            <SettingsItem
              title="Font Size"
              subtitle="Adjust text size for better readability"
              icon="🔤"
              value={getSizeLabel(settings.fontSize)}
              onPress={handleFontSizeChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="Audio" 
            description="Manage audio playback and quality settings"
          >
            <SettingsToggle
              title="Background Audio"
              subtitle="Continue playing audio when app is in background"
              icon="🎵"
              value={settings.backgroundAudioEnabled}
              onValueChange={toggleBackgroundAudio}
              showDivider={true}
            />
            <SettingsToggle
              title="Auto Play Next"
              subtitle="Automatically play next chapter or verse"
              icon="⏭️"
              value={settings.autoPlayNext}
              onValueChange={toggleAutoPlayNext}
              showDivider={true}
            />
            <SettingsItem
              title="Audio Quality"
              subtitle="Choose audio quality for better experience"
              icon="🎧"
              value={getQualityLabel(settings.audioQuality)}
              onPress={handleAudioQualityChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="Language" 
            description="Select your preferred language"
          >
            <SettingsItem
              title="Interface Language"
              subtitle="Choose the language for app interface"
              icon="🌐"
              value={getLanguageLabel(settings.language)}
              onPress={handleLanguageChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="Notifications" 
            description="Manage notification preferences"
          >
            <SettingsToggle
              title="Push Notifications"
              subtitle="Receive daily verses and reminders"
              icon="🔔"
              value={settings.notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </SettingsSection>

          <SettingsSection 
            title="About" 
            description="App information and support"
          >
            <SettingsItem
              title="App Version"
              subtitle="Current version of Bhagavad Gita app"
              icon="ℹ️"
              value="1.0.0"
            />
            <SettingsItem
              title="Reset Settings"
              subtitle="Reset all settings to default values"
              icon="🔄"
              onPress={handleResetSettings}
            />
          </SettingsSection>

        <ThemedView style={styles.bottomSpacing} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.xl,
    paddingBottom: SIZES.spacing.lg,
    borderBottomWidth: SIZES.borderSize.sm,
    marginBottom: SIZES.spacing.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.largeTitle,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: SIZES.spacing.sm,
    lineHeight: TYPOGRAPHY.lineHeight.largeTitle,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    opacity: 0.7,
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.lg,
    paddingTop: SIZES.spacing.sm,
  },
  bottomSpacing: {
    height: SIZES.spacing.huge,
  },
});
