import { SettingsItem, SettingsSection, SettingsToggle } from '@/components/settings';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme, useThemeColors } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { useSettingsStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const theme = useThemeColors();
  const { isDark } = useTheme();
  const { 
    settings, 
    updateSetting 
  } = useSettingsStore();
  const { width, height } = Dimensions.get('window');

  const handleThemeChange = () => {
    const newMode = isDark ? 'light' : 'dark';
    updateSetting('themeMode', newMode);
  };



  const handleFontSizeChange = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    updateSetting('fontSize', sizes[nextIndex]);
  };


  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return 'Small';
      case 'medium': return 'Medium';
      case 'large': return 'Large';
      default: return 'Medium';
    }
  };

  const handleResetOnboarding = () => {
    updateSetting('onboardingCompleted', false);
    router.replace('onboarding' as any);
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
     
      </ThemedCard>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
     

        <SettingsSection 
            title="দেখার ধরন" 
            description="অ্যাপের চেহারা এবং অনুভূতি কাস্টমাইজ করুন"
          >
            <SettingsToggle
              title="ডার্ক মোড"
              subtitle="লাইট এবং ডার্ক থিমের মধ্যে পরিবর্তন করুন"
              icon={<Feather name="moon" size={SIZES.icon.lg} color={theme.icon.primary} />}
              value={isDark}
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
              title="অনবোর্ডিং পুনরায় দেখুন"
              subtitle="শুরু করার গাইড পুনরায় দেখুন"
              icon={<Feather name="refresh-cw" size={SIZES.icon.lg} color={theme.icon.primary} />}
              onPress={handleResetOnboarding}
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
