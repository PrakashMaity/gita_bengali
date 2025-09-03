import { BookmarkIcon } from '@/components/ui/BookmarkIcon';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ChapterData {
  chapter: {
    number: string;
    title: string;
    subtitle: string;
    englishTitle: string;
    totalVerses: string;
    description: string;
    id: string;
    verseNumber?: string;
  };
  summary?: {
    title: string;
    description: string;
    keyThemes: string[];
  };
}


interface ReadingProgress {
  chapterNumber: number;
  lastReadVerse: number;
  totalVerses: number;
  lastReadDate: number;
  isCompleted: boolean;
}

export default function ChaptersScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState<{ [key: number]: ReadingProgress }>({});

  const normalizeChapterData = (rawData: any): ChapterData => {
    if (rawData.chapter) {
      return rawData as ChapterData;
    } else {
      const summaryText = typeof rawData.summary === 'string' ? rawData.summary : rawData.summary?.description || '';
      return {
        chapter: {
          number: rawData.chapterNumber || '0',
          title: rawData.title || '',
          subtitle: rawData.title || '',
          englishTitle: rawData.titleEnglish || '',
          totalVerses: rawData.totalVerses || '0',
          description: summaryText,
          id: rawData.id || '',
        },
        summary: {
          title: rawData.title || '',
          description: summaryText,
          keyThemes: rawData.keyThemes || [],
        },
      };
    }
  };

  const loadChapters = useCallback(async () => {
    try {
      const chapterPromises = [
        import('@/Data/chapter1.json').then(module => module.default),
        import('@/Data/chapter2.json').then(module => module.default),
        import('@/Data/chapter3.json').then(module => module.default),
        import('@/Data/chapter4.json').then(module => module.default),
        import('@/Data/chapter5.json').then(module => module.default),
        import('@/Data/chapter6.json').then(module => module.default),
        import('@/Data/chapter7.json').then(module => module.default),
        import('@/Data/chapter8.json').then(module => module.default),
        import('@/Data/chapter9.json').then(module => module.default),
        import('@/Data/chapter10.json').then(module => module.default),
        import('@/Data/chapter11.json').then(module => module.default),
        import('@/Data/chapter12.json').then(module => module.default),
        import('@/Data/chapter13.json').then(module => module.default),
        import('@/Data/chapter14.json').then(module => module.default),
        import('@/Data/chapter15.json').then(module => module.default),
        import('@/Data/chapter16.json').then(module => module.default),
        import('@/Data/chapter17.json').then(module => module.default),
        import('@/Data/chapter18.json').then(module => module.default),
      ];
      const rawChapterData = await Promise.all(chapterPromises);
      const normalizedData = rawChapterData.map(normalizeChapterData);
      setChapters(normalizedData);
    } catch (error) {
      console.error('Error loading chapters:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadReadingProgress = useCallback(async () => {
    try {
      const progressJson = await AsyncStorage.getItem('gita_reading_progress');
      const progress = progressJson ? JSON.parse(progressJson) : {};
      setReadingProgress(progress);
    } catch (error) {
      console.error('Error loading reading progress:', error);
    }
  }, []);

  useEffect(() => {
    loadChapters();
    loadReadingProgress();
  }, [loadChapters, loadReadingProgress]);

  const handleChapterPress = (chapterId: string) => {
    router.push(`/chapter/${chapterId}`);
  };

  const renderChapterCard = (chapter: ChapterData) => {
    const { chapter: chapterInfo } = chapter;
    const chapterNumber = parseInt(chapterInfo.number);
    const progress = readingProgress[chapterNumber];
    const progressPercentage = progress ? Math.round((progress.lastReadVerse / progress.totalVerses) * 100) : 0;

    return (
      <TouchableOpacity
        key={chapterInfo.id}
        onPress={() => handleChapterPress(chapterInfo.id)}
        style={styles.chapterCardContainer}
       
      >
        <ThemedCard style={[styles.chapterCard, { 
       
        }]}>
          <ThemedView style={[styles.iconContainer, { 
            backgroundColor: theme.background.tertiary,
           
          }]}>
            <ThemedBengaliText 
              variant="primary" 
              size="large" 
              fontFamily="begumZia"
              style={styles.chapterNumber}
            >
              {chapterInfo.number}
            </ThemedBengaliText>
          </ThemedView>

          {/* Text Content */}
          <ThemedView style={styles.textContainer}>
            <ThemedBengaliText
              variant="primary"
              size="large"
              fontFamily="begumZia"
              style={styles.chapterTitle}
              numberOfLines={2}
            >
              {chapterInfo.title}
            </ThemedBengaliText>
            {chapterInfo.subtitle && chapterInfo.subtitle !== chapterInfo.title && (
              <ThemedBengaliText
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.chapterSubtitle}
                numberOfLines={1}
              >
                {chapterInfo.subtitle}
              </ThemedBengaliText>
            )}

            <ThemedView style={styles.chapterInfo}>
              <ThemedBengaliText 
                variant="secondary" 
                size="small" 
                fontFamily="mahinSameya"
                style={styles.verseCount}
              >
                {chapterInfo.totalVerses} শ্লোক
              </ThemedBengaliText>
              {progress && (
                <ThemedBengaliText 
                  variant="tertiary" 
                  size="small" 
                  fontFamily="spaceMono"
                  style={styles.progressText}
                >
                  {progressPercentage}% সম্পূর্ণ
                </ThemedBengaliText>
              )}
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
        </ThemedCard>
      </TouchableOpacity>
    );
  };

  if (loading) {
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
            অধ্যায়গুলি লোড হচ্ছে...
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
          অধ্যায়সমূহ
        </ThemedBengaliText>
        <ThemedView style={styles.headerActions}>
         
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <BookmarkIcon 
              size={SIZES.icon.xl} 
              color={theme.icon.primary} 
              focused={true}
              showBadge={true}
              badgeSize="medium"
            />
          </ThemedView>
        </ThemedView>
      </ThemedCard>

      {/* Chapters List */}
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
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              ভগবদগীতা অধ্যায়সমূহ
            </ThemedBengaliText>
          </ThemedView>
          <ThemedView style={styles.chaptersContainer}>
            {chapters.map(renderChapterCard)}
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
  chaptersContainer: {
    paddingHorizontal: SIZES.spacing.lg,
    gap: SIZES.spacing.sm,
  },
  chapterCardContainer: {
    // marginBottom: SIZES.spacing.sm,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.xl,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
    marginBottom: SIZES.spacing.md,
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chapterTitle: {
    marginBottom: SIZES.spacing.xs,
    lineHeight: 26,
  },
  chapterSubtitle: {
    marginBottom: SIZES.spacing.sm,
    lineHeight: 20,
    opacity: 0.85,
  },
  chapterEnglishTitle: {
    fontSize: SIZES.sm,
    fontStyle: 'italic',
    marginBottom: SIZES.spacing.sm,
    lineHeight: SIZES.spacing.lg,
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
  verseCount: {
    opacity: 0.9,
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.spacing.md,
  },
  progressText: {
    opacity: 0.8,
    fontWeight: '500',
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