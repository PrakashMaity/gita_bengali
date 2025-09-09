import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedButton } from '@/components/ui/ThemedButton/ThemedButton';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { useSettingsStore } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const { height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  image: any;
  title: string;
  subtitle: string;
  description: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    image: require('@/assets/images/onboarding/onboardBanner1.png'),
    title: 'শ্রীমদ্ভগবদ্গীতা',
    subtitle: 'জীবনের পথপ্রদর্শক',
    description: 'প্রাচীন হিন্দু ধর্মগ্রন্থের মধ্যে শ্রীমদ্ভগবদ্গীতা একটি অনন্য স্থান অধিকার করে আছে। এটি কেবল একটি ধর্মগ্রন্থই নয়, বরং জীবনের সকল সমস্যার সমাধানের পথ দেখায়।'
  },
  {
    id: 2,
    image: require('@/assets/images/onboarding/onboardBanner2.png'),
    title: 'ধ্যান ও চিন্তা',
    subtitle: 'আধ্যাত্মিক জ্ঞানের ভাণ্ডার',
    description: 'গীতার প্রতিটি শ্লোক জীবনের গভীর অর্থ প্রকাশ করে। এখানে আপনি পাবেন ধ্যান, চিন্তা এবং আধ্যাত্মিক উন্নতির জন্য প্রয়োজনীয় সকল উপাদান।'
  },
  {
    id: 3,
    image: require('@/assets/images/onboarding/onboardBanner3.png'),
    title: 'শুরু করুন',
    subtitle: 'আপনার আধ্যাত্মিক যাত্রা',
    description: 'এখনই শুরু করুন আপনার আধ্যাত্মিক যাত্রা। গীতার জ্ঞানের আলোকে আলোকিত হন এবং জীবনের প্রতিটি মুহূর্তকে অর্থবহ করে তুলুন।'
  }
];

export default function OnboardingScreen() {
  const theme = useThemeColors();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { updateSetting } = useSettingsStore();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    // Mark onboarding as complete
    updateSetting('onboardingCompleted', true);
    
    // Wait a moment for the state to persist
    await new Promise(resolve => setTimeout(resolve, 100));
    
    router.replace('/(tabs)');
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = onboardingSlides[currentSlide];
  const isLastSlide = currentSlide === onboardingSlides.length - 1;
  const isFirstSlide = currentSlide === 0;

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <StatusBar style="light" backgroundColor={theme.background.primary} />
      
      {/* Header with Skip button */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <ThemedBengaliText variant="secondary" size="medium" fontFamily="mahinSameya">
            এড়িয়ে যান
          </ThemedBengaliText>
        </TouchableOpacity>
      </ThemedView>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Container */}
        <ThemedCard variant="transparent" style={styles.imageCard}>
          <ThemedView style={styles.imageContainer}>
            <Image 
              source={currentSlideData.image} 
              style={styles.onboardingImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageGradient}
            />
          </ThemedView>
        </ThemedCard>

        {/* Content Card */}
        <ThemedCard variant="primary" style={styles.contentCard}>
          <ThemedView style={styles.contentContainer}>
            {/* Title */}
            <ThemedBengaliText 
              variant="primary" 
              size="title" 
              fontFamily="benSen"
              style={styles.title}
            >
              {currentSlideData.title}
            </ThemedBengaliText>

            {/* Subtitle */}
            <ThemedBengaliText 
              variant="secondary" 
              size="xl" 
              fontFamily="mahinSameya"
              style={styles.subtitle}
            >
              {currentSlideData.subtitle}
            </ThemedBengaliText>

            {/* Description */}
            <ThemedBengaliText 
              variant="tertiary" 
              size="large" 
              fontFamily="mahinSameya"
              style={styles.description}
            >
              {currentSlideData.description}
            </ThemedBengaliText>
          </ThemedView>
        </ThemedCard>
      </ScrollView>

      {/* Bottom Navigation */}
      <ThemedView style={styles.bottomContainer}>
        {/* Page Indicators */}
        <ThemedView style={styles.pageIndicators}>
          {onboardingSlides.map((_, index) => (
            <ThemedView
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentSlide 
                    ? theme.button.primary.background 
                    : theme.border.tertiary,
                  width: index === currentSlide ? 24 : 8,
                }
              ]}
            />
          ))}
        </ThemedView>

        {/* Navigation Buttons */}
        <ThemedView style={styles.navigationButtons}>
          {!isFirstSlide && (
            <ThemedButton
              title="পূর্ববর্তী"
              onPress={handlePrevious}
              variant="outline"
              size="md"
              style={styles.navButton}
            />
          )}
          
          <ThemedButton
            title={isLastSlide ? "শুরু করুন" : "পরবর্তী"}
            onPress={handleNext}
            variant="primary"
            size="md"
            style={styles.primaryButton}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.md,
  },
  skipButton: {
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SIZES.spacing.xl,
  },
  imageCard: {
    margin: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: SIZES.radius.xl,
    overflow: 'hidden',
    height: height * 0.4,
  },
  onboardingImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  contentCard: {
    margin: SIZES.spacing.lg,
    marginTop: SIZES.spacing.sm,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.lg,
    opacity: 0.9,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  bottomContainer: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.xl,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xl,
    gap: SIZES.spacing.sm,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.spacing.md,
  },
  navButton: {
    flex: 1,
  },
  primaryButton: {
    flex: 2,
  },
});
