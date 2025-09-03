import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function DhyanaScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');

  const dhyanaText = `ধ্যানং পরমং ব্রহ্মণি সচ্চিদানন্দরূপিণি।
তস্মিন্ ধ্যাতৃধ্যেয়ভাবেন ভেদো নাস্তি কদাচন॥

ধ্যানং মনসি সংস্থাপ্য পরমাত্মনি চেতসা।
সর্বভূতেষু চৈতন্যং সমং পশ্যতি যোগী॥

ধ্যানযোগেন মনসি পশ্যন্তি তে যুগানুযুগং।
তস্মিন্ ধ্যাতৃধ্যেয়ভাবেন ভেদো নাস্তি কদাচন॥`;

  const meaningText = `ধ্যান হল পরমাত্মার প্রতি মনোনিবেশ। যখন আমরা ধ্যানে বসি, তখন আমাদের মন শান্ত হয় এবং আমরা ঈশ্বরের সাথে একাত্মতা অনুভব করি।`;

  const benefits = [
    'মন শান্ত ও স্থির হয়',
    'চিন্তার গতি কমে',
    'আত্মবিশ্বাস বৃদ্ধি পায়',
    'স্ট্রেস ও উদ্বেগ কমে',
    'সৃজনশীলতা বৃদ্ধি পায়',
    'আধ্যাত্মিক উন্নতি ঘটে'
  ];

  const steps = [
    'শান্ত ও নির্জন স্থান নির্বাচন করুন',
    'সুস্থভাবে বসুন (পদ্মাসন বা সুখাসন)',
    'চোখ বন্ধ করে গভীর শ্বাস নিন',
    'মনকে শ্বাসের উপর কেন্দ্রীভূত করুন',
    'যখন মন ভ্রমণ করে, আবার শ্বাসে ফিরুন',
    'প্রতিদিন ১০-১৫ মিনিট ধ্যান করুন'
  ];

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
          ধ্যান
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
            ধ্যান ও চিন্তন
          </ThemedBengaliText>
          <ThemedBengaliText 
            variant="secondary" 
            size="medium" 
            fontFamily="mahinSameya"
            style={styles.introText}
          >
            ধ্যান হল আধ্যাত্মিক উন্নতির একটি গুরুত্বপূর্ণ মাধ্যম। এটি আমাদের মনকে শান্ত করে এবং আত্মার সাথে সংযোগ স্থাপন করতে সাহায্য করে।
          </ThemedBengaliText>
        </ThemedCard>

        {/* Dhyana Text Card */}
        <ThemedCard style={styles.dhyanaCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              ধ্যান সম্পর্কিত শ্লোক
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedBengaliText 
            variant="primary"
            size="large"
            fontFamily="benSen"
            style={styles.dhyanaText}
          >
            {dhyanaText}
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
              ধ্যানের অর্থ
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

        {/* Benefits Card */}
        <ThemedCard style={styles.benefitsCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              ধ্যানের উপকারিতা
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedView style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <ThemedView key={index} style={styles.benefitItem}>
                <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
                <ThemedBengaliText 
                  variant="secondary"
                  size="medium"
                  fontFamily="mahinSameya"
                  style={styles.benefitText}
                >
                  {benefit}
                </ThemedBengaliText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedCard>

        {/* Steps Card */}
        <ThemedCard style={styles.stepsCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              ধ্যানের পদ্ধতি
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedView style={styles.stepsList}>
            {steps.map((step, index) => (
              <ThemedView key={index} style={styles.stepItem}>
                <ThemedView style={[styles.stepNumber, { backgroundColor: theme.background.quaternary }]}>
                  <ThemedBengaliText 
                    variant="primary"
                    size="small"
                    fontFamily="begumZia"
                    style={styles.stepNumberText}
                  >
                    {index + 1}
                  </ThemedBengaliText>
                </ThemedView>
                <ThemedBengaliText 
                  variant="secondary"
                  size="medium"
                  fontFamily="mahinSameya"
                  style={styles.stepText}
                >
                  {step}
                </ThemedBengaliText>
              </ThemedView>
            ))}
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
  dhyanaCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  meaningCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  benefitsCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  stepsCard: {
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
  dhyanaText: {
    textAlign: 'center',
    lineHeight: SIZES.spacing.xl,
    fontStyle: 'italic',
  },
  meaningText: {
    lineHeight: SIZES.spacing.xl,
  },
  benefitsList: {
    gap: SIZES.spacing.md,
  },
  benefitItem: {
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
  benefitText: {
    flex: 1,
    lineHeight: SIZES.spacing.lg,
  },
  stepsList: {
    gap: SIZES.spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SIZES.spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.spacing.xs,
  },
  stepNumberText: {
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    lineHeight: SIZES.spacing.lg,
  },
});
