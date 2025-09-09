import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function MangalacharanScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');

  const mangalacharanText = `ওঁ পূর্ণমদঃ পূর্ণমিদং পূর্ণাৎ পূর্ণমুদচ্যতে।
পূর্ণস্য পূর্ণমাদায় পূর্ণমেবাবশিষ্যতে॥

ওঁ শান্তিঃ শান্তিঃ শান্তিঃ॥

ওঁ নারায়ণং নমস্কৃত্য নরং চৈব নরোত্তমম্।
দেবীং সরস্বতীং ব্যাসং ততো জয়মুদীরয়েৎ॥

ওঁ ভদ্রং কর্ণেভিঃ শৃণুয়াম দেবাঃ।
ভদ্রং পশ্যেমাক্ষভির্যজত্রাঃ।
স্থিরৈরঙ্গৈস্তুষ্টুবাংসস্তনূভিঃ।
ব্যশেম দেবহিতং যদায়ুঃ॥

ওঁ শান্তিঃ শান্তিঃ শান্তিঃ॥`;

  const meaningText = `এই মঙ্গলাচরণে আমরা ঈশ্বরের কাছে প্রার্থনা করি যে, আমাদের জ্ঞান, বুদ্ধি ও শক্তি বৃদ্ধি পাক এবং আমরা সত্যের পথে চলতে পারি।`;

  return (
    <ThemedView variant="primary" style={styles.container}>
      <WavePattern 
        width={width} 
        height={height} 
      />
      
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.lg} color={theme.icon.primary} />
        </TouchableOpacity>
        <ThemedBengaliText 
          variant="primary" 
          size="title" 
          fontFamily="begumZia"
          style={styles.title}
        >
          মঙ্গলাচরণ
        </ThemedBengaliText>
        <ThemedView style={styles.placeholder} />
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction Card */}
        <ThemedCard style={styles.introCard}>
          <ThemedBengaliText 
            variant="primary" 
            size="large" 
            fontFamily="begumZia"
            style={styles.introTitle}
          >
            গীতা পাঠের পূর্বে মঙ্গলাচরণ
          </ThemedBengaliText>
          <ThemedBengaliText 
            variant="secondary" 
            size="medium" 
            fontFamily="mahinSameya"
            style={styles.introText}
          >
            মঙ্গলাচরণ হল গীতা পাঠের পূর্বে উচ্চারিত পবিত্র মন্ত্রসমূহ। এটি আমাদের মনকে শান্ত করে এবং জ্ঞানের জন্য প্রস্তুত করে।
          </ThemedBengaliText>
        </ThemedCard>

        {/* Prayer Text Card */}
        <ThemedCard style={styles.prayerCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              মঙ্গলাচরণ মন্ত্র
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedBengaliText 
            variant="primary"
            size="large"
            fontFamily="benSen"
            style={styles.prayerText}
          >
            {mangalacharanText}
          </ThemedBengaliText>
        </ThemedCard>

        {/* Meaning Card */}
        <ThemedCard style={styles.meaningCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              অর্থ
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedBengaliText 
            variant="secondary"
            size="medium"
            fontFamily="mahinSameya"
            style={styles.meaningText}
          >
            {meaningText}
          </ThemedBengaliText>
        </ThemedCard>

        {/* Instructions Card */}
        <ThemedCard style={styles.instructionsCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              পাঠের নির্দেশনা
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedView style={styles.instructionList}>
            <ThemedView style={styles.instructionItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.instructionText}
              >
                শান্ত পরিবেশে বসে মঙ্গলাচরণ পাঠ করুন
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedView style={styles.instructionItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.instructionText}
              >
                প্রতিটি মন্ত্র মনোযোগ সহকারে উচ্চারণ করুন
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedView style={styles.instructionItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.instructionText}
              >
                মঙ্গলাচরণের পর গীতা পাঠ শুরু করুন
              </ThemedBengaliText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.sm,
  },
  backButton: {
    padding: SIZES.spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.xl,
  },
  introCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  introTitle: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.md,
  },
  introText: {
    textAlign: 'center',
    lineHeight: SIZES.spacing.xl,
  },
  prayerCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  meaningCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  instructionsCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  sectionIndicator: {
    width: SIZES.borderSize.xxl,
    height: SIZES.spacing.xxxl,
    borderRadius: SIZES.radius.sm,
    marginRight: SIZES.spacing.md,
  },
  sectionTitle: {
    flex: 1,
  },
  prayerText: {
    textAlign: 'center',
    lineHeight: SIZES.spacing.xl,
    fontStyle: 'italic',
  },
  meaningText: {
    lineHeight: SIZES.spacing.xl,
  },
  instructionList: {
    gap: SIZES.spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SIZES.spacing.md,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: SIZES.radius.round,
    marginTop: SIZES.spacing.sm,
  },
  instructionText: {
    flex: 1,
    lineHeight: SIZES.spacing.lg,
  },
});
