import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { TranslationData, useTranslationStore } from '@/store';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TranslationsScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');
  const { translations, isLoading, loadAllTranslations } = useTranslationStore();

  useEffect(() => {
    loadAllTranslations();
  }, [loadAllTranslations]);

  const handleTranslationPress = (chapterId: string) => {
    router.push(`/translation/${chapterId}`);
  };

  const renderTranslationCard = (translation: TranslationData) => {
    const { chapter } = translation;

    return (
      <TouchableOpacity
        key={chapter.id}
        onPress={() => handleTranslationPress(chapter.id)}
        style={styles.translationCardContainer}
      >
        <ThemedCard style={[styles.translationCard]}>
          <ThemedView style={{flexDirection: 'row'}} >
            <ThemedView style={[styles.iconContainer, {
              backgroundColor: theme.background.tertiary,
            }]}>
              <ThemedBengaliText
                variant="primary"
                size="large"
                fontFamily="begumZia"
                style={styles.chapterNumber}
              >
                {chapter.number}
              </ThemedBengaliText>
            </ThemedView>

            {/* Text Content */}
            <ThemedView style={styles.textContainer}>
              {chapter.subtitle && chapter.subtitle !== chapter.title && (
                <ThemedBengaliText
                  variant="secondary"
                  size="medium"
                  fontFamily="mahinSameya"
                  style={styles.chapterSubtitle}
                  numberOfLines={1}
                >
                  {chapter.subtitle}
                </ThemedBengaliText>
              )}

              <ThemedView style={styles.chapterInfo}>
                <ThemedBengaliText
                  variant="secondary"
                  size="small"
                  fontFamily="mahinSameya"
                  style={styles.verseCount}
                >
                  {chapter.totalVerses} শ্লোকের অনুবাদ
                </ThemedBengaliText>
              </ThemedView>
            </ThemedView>

            {/* Arrow Container */}
            <ThemedView style={[styles.arrowContainer, { backgroundColor: theme.background.quaternary }]}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={SIZES.icon.md}
                color={theme.icon.quaternary}
              />
            </ThemedView>
          </ThemedView>
        </ThemedCard>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <ThemedSafeAreaView>
        <View style={styles.loadingContainer}>
          <WavePattern width={200} height={200} opacity={0.1} />
          <ThemedBengaliText
            variant="secondary"
            size="large"
            fontFamily="begumZia"
            style={styles.loadingText}
          >
            অনুবাদ লোড হচ্ছে...
          </ThemedBengaliText>
        </View>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedView variant="primary" style={styles.container}>
      <WavePattern
        width={width}
        height={height}
      />

      {/* Header Card */}
      <ThemedCard variant='transparent' style={styles.headerCard}>
        <ThemedBengaliText
          variant="primary"
          size="title"
          fontFamily="begumZia"
          style={styles.title}
        >
          বাংলা অনুবাদ
        </ThemedBengaliText>
        <ThemedView style={styles.headerActions}>
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <MaterialIcons
              name="translate"
              size={SIZES.icon.xl}
              color={theme.icon.primary}
            />
          </ThemedView>
        </ThemedView>
      </ThemedCard>

      {/* Translations List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText
              variant="primary"
              size="xxl"
              fontFamily="mahinSameya"
              style={styles.sectionTitle}
            >
              ভগবদগীতা অনুবাদসমূহ
            </ThemedBengaliText>
          </ThemedView>
          <ThemedView style={styles.translationsContainer}>
            {translations.map(renderTranslationCard)}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.spacing.lg,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.md,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.spacing.sm,
  },
  actionButton: {
    borderWidth: SIZES.borderSize.sm,
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
  section: {
    marginBottom: SIZES.spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
    paddingHorizontal: SIZES.spacing.lg,
  },
  sectionIndicator: {
    width: 5,
    height: 32,
    borderRadius: SIZES.radius.md,
    marginRight: SIZES.spacing.md,
  },
  sectionTitle: {
    flex: 1,
    fontWeight: '600',
  },
  translationsContainer: {
    paddingHorizontal: SIZES.spacing.lg,
   
  },
  translationCardContainer: {
    // marginBottom: SIZES.spacing.sm,
  },
  translationCard: {
    alignItems: 'center',
    padding: SIZES.spacing.xl,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
    // marginBottom: SIZES.spacing.md,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.md,
    },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.shadow.lg,
    elevation: 4,
  },
  chapterNumber: {
    // Font styling handled by ThemedBengaliText component
  },
  iconContainer: {
    width: SIZES.avatar.xl,
    height: SIZES.avatar.xl,
    borderRadius: SIZES.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.spacing.lg,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.md,
    },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.shadow.md,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chapterSubtitle: {
    marginBottom: SIZES.spacing.sm,
    lineHeight: 20,
    opacity: 0.85,
  },
  verseCount: {
    opacity: 0.9,
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.spacing.md,
  },
  arrowContainer: {
    width: SIZES.avatar.md,
    height: SIZES.avatar.md,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.spacing.sm,
  },
});
