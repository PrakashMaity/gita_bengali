import { SettingsItem, SettingsSection, SettingsToggle } from '@/components/settings';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useThemeColors } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { useSettingsStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const theme = useThemeColors();
  const { 
    settings, 
    toggleBackgroundAudio, 
    toggleNotifications, 
    toggleAutoPlayNext,
    updateSetting 
  } = useSettingsStore();
  const { width, height } = Dimensions.get('window');

  const handleThemeChange = () => {
    // Theme toggle logic would go here
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
      <WavePattern 
        width={width} 
        height={height} 
      />
      
      {/* Header Card */}
      <ThemedCard variant='transparent' style={styles.headerCard}>
        <ThemedView style={styles.headerContent}>
          <ThemedBengaliText 
            variant="primary" 
            size="xxl" 
            fontFamily="mahinSameya"
            style={styles.title}
          >
            সেটিংস
          </ThemedBengaliText>
          <ThemedText style={styles.subtitle}>
            আপনার গীতা অভিজ্ঞতা কাস্টমাইজ করুন
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.headerActions}>
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <Feather name="settings" size={SIZES.icon.lg} color={theme.icon.primary} />
          </ThemedView>
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <FontAwesome name="user" size={SIZES.icon.lg} color={theme.icon.primary} />
          </ThemedView>
        </ThemedView>
      </ThemedCard>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Actions Card */}
        <ThemedCard variant='primary' style={styles.quickActionsCard}>
          <ThemedView style={styles.quickActionItem}>
            <ThemedView style={[styles.quickActionIcon, { backgroundColor: theme.background.card }]}>
              <Feather name="download" size={SIZES.icon.md} color={theme.icon.primary} />
            </ThemedView>
            <ThemedText style={styles.quickActionText}>ডেটা এক্সপোর্ট</ThemedText>
          </ThemedView>
          <ThemedView style={styles.quickActionItem}>
            <ThemedView style={[styles.quickActionIcon, { backgroundColor: theme.background.card }]}>
              <Feather name="share-2" size={SIZES.icon.md} color={theme.icon.primary} />
            </ThemedView>
            <ThemedText style={styles.quickActionText}>অ্যাপ শেয়ার</ThemedText>
          </ThemedView>
          <ThemedView style={styles.quickActionItem}>
            <ThemedView style={[styles.quickActionIcon, { backgroundColor: theme.background.card }]}>
              <Feather name="help-circle" size={SIZES.icon.md} color={theme.icon.primary} />
            </ThemedView>
            <ThemedText style={styles.quickActionText}>সহায়তা</ThemedText>
          </ThemedView>
        </ThemedCard>

        <SettingsSection 
            title="দেখার ধরন" 
            description="অ্যাপের চেহারা এবং অনুভূতি কাস্টমাইজ করুন"
          >
            <SettingsToggle
              title="ডার্ক মোড"
              subtitle="লাইট এবং ডার্ক থিমের মধ্যে পরিবর্তন করুন"
              icon={<Feather name="moon" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={false}
              onValueChange={handleThemeChange}
              showDivider={true}
            />
            <SettingsItem
              title="ফন্ট সাইজ"
              subtitle="ভালো পাঠযোগ্যতার জন্য টেক্সট সাইজ সামঞ্জস্য করুন"
              icon={<Feather name="type" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={getSizeLabel(settings.fontSize)}
              onPress={handleFontSizeChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="অডিও" 
            description="অডিও প্লেব্যাক এবং গুণমানের সেটিংস পরিচালনা করুন"
          >
            <SettingsToggle
              title="ব্যাকগ্রাউন্ড অডিও"
              subtitle="অ্যাপ ব্যাকগ্রাউন্ডে থাকাকালীন অডিও চালিয়ে যান"
              icon={<Feather name="music" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={settings.backgroundAudioEnabled}
              onValueChange={toggleBackgroundAudio}
              showDivider={true}
            />
            <SettingsToggle
              title="অটো প্লে নেক্সট"
              subtitle="স্বয়ংক্রিয়ভাবে পরবর্তী অধ্যায় বা শ্লোক চালান"
              icon={<Feather name="skip-forward" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={settings.autoPlayNext}
              onValueChange={toggleAutoPlayNext}
              showDivider={true}
            />
            <SettingsItem
              title="অডিও কোয়ালিটি"
              subtitle="ভালো অভিজ্ঞতার জন্য অডিও গুণমান নির্বাচন করুন"
              icon={<Feather name="headphones" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={getQualityLabel(settings.audioQuality)}
              onPress={handleAudioQualityChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="ভাষা" 
            description="আপনার পছন্দের ভাষা নির্বাচন করুন"
          >
            <SettingsItem
              title="ইন্টারফেস ভাষা"
              subtitle="অ্যাপ ইন্টারফেসের জন্য ভাষা নির্বাচন করুন"
              icon={<Feather name="globe" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={getLanguageLabel(settings.language)}
              onPress={handleLanguageChange}
            />
          </SettingsSection>

          <SettingsSection 
            title="নোটিফিকেশন" 
            description="নোটিফিকেশন পছন্দসমূহ পরিচালনা করুন"
          >
            <SettingsToggle
              title="পুশ নোটিফিকেশন"
              subtitle="দৈনিক শ্লোক এবং অনুস্মারক গ্রহণ করুন"
              icon={<Feather name="bell" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={settings.notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </SettingsSection>

          <SettingsSection 
            title="সম্পর্কে" 
            description="অ্যাপের তথ্য এবং সহায়তা"
          >
            <SettingsItem
              title="অ্যাপ ভার্সন"
              subtitle="ভগবদ গীতা অ্যাপের বর্তমান ভার্সন"
              icon={<Feather name="info" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value="1.0.0"
            />
            <SettingsItem
              title="সেটিংস রিসেট"
              subtitle="সব সেটিংস ডিফল্ট মানে রিসেট করুন"
              icon={<Feather name="refresh-cw" size={SIZES.icon.lg} color={theme.icon.primary} />}
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
    position: 'relative',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    marginBottom: SIZES.spacing.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    opacity: 0.7,
    lineHeight: TYPOGRAPHY.lineHeight.md,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    borderWidth: 1,
    padding: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.spacing.xl,
  },
  bottomSpacing: {
    height: SIZES.spacing.huge,
  },
  quickActionsCard: {
    flexDirection: 'row',
    gap: SIZES.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.spacing.lg,
    marginTop: SIZES.spacing.sm,
    marginBottom: SIZES.spacing.sm,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.md,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.spacing.sm,
  },
  quickActionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textAlign: 'center',
  },
});
