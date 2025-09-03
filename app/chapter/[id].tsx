import { BookmarkButton } from '@/components/bookmark';
import { ReadingProgress } from '@/components/progress';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { VerseReader } from '@/components/verseReader';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import {
  getChapterNumberFromId,
  isValidChapterId
} from '@/utils/chapterUtils';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Verse {
  verseNumber: string;
  bengali: string;
  translation: string;
  speaker: string;
  id: string;
}

interface ChapterData {
  chapter: {
    number: string;
    title: string;
    subtitle: string;
    englishTitle: string;
    totalVerses: string;
    description: string;
    id: string;
  };
  dedication?: {
    bengali: string;
    meaning: string;
  };
  verses: Verse[];
  summary?: {
    title: string;
    description: string;
    keyThemes: string[];
  };
}





export default function ChapterDetailScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showBengali, setShowBengali] = useState(true);

  const normalizeChapterData = (rawData: any): ChapterData => {
    if (rawData.chapter) {
      // Already in the correct format
      return rawData as ChapterData;
    } else {
      // Convert from flat structure to nested structure
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
        dedication: rawData.dedication,
        verses: rawData.verses || [],
        summary: {
          title: rawData.title || '',
          description: summaryText,
          keyThemes: rawData.keyThemes || [],
        },
      };
    }
  };

  const loadChapter = useCallback(async (chapterId: string) => {
    try {
      // Validate chapter ID
      if (!isValidChapterId(chapterId)) {
        throw new Error('Invalid chapter ID');
      }

      const chapterNumber = getChapterNumberFromId(chapterId);
      if (!chapterNumber) {
        throw new Error('Chapter not found');
      }

      let chapterModule;
      switch (chapterNumber) {
        case 1:
          chapterModule = await import('@/Data/chapter1.json');
          break;
        case 2:
          chapterModule = await import('@/Data/chapter2.json');
          break;
        case 3:
          chapterModule = await import('@/Data/chapter3.json');
          break;
        case 4:
          chapterModule = await import('@/Data/chapter4.json');
          break;
        case 5:
          chapterModule = await import('@/Data/chapter5.json');
          break;
        case 6:
          chapterModule = await import('@/Data/chapter6.json');
          break;
        case 7:
          chapterModule = await import('@/Data/chapter7.json');
          break;
        case 8:
          chapterModule = await import('@/Data/chapter8.json');
          break;
        case 9:
          chapterModule = await import('@/Data/chapter9.json');
          break;
        case 10:
          chapterModule = await import('@/Data/chapter10.json');
          break;
        case 11:
          chapterModule = await import('@/Data/chapter11.json');
          break;
        default:
          throw new Error('Invalid chapter number');
      }
      const normalizedData = normalizeChapterData(chapterModule.default);
      setChapterData(normalizedData);
    } catch (error) {
      console.error('Error loading chapter:', error);
      Alert.alert('ত্রুটি', 'অধ্যায় লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadChapter(id);
    }
  }, [id, loadChapter]);

  const handlePreviousVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  const handleNextVerse = () => {
    if (chapterData && currentVerse < chapterData.verses.length - 1) {
      setCurrentVerse(currentVerse + 1);
    }
  };


  const toggleTranslation = () => setShowTranslation(!showTranslation);
  const toggleBengali = () => setShowBengali(!showBengali);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedBengaliText variant="secondary" size="medium">
          অধ্যায় লোড হচ্ছে...
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  if (!chapterData) {
    return (
      <ThemedView variant="primary" style={styles.errorContainer}>
        <ThemedBengaliText variant="error" size="medium">
          অধ্যায় পাওয়া যায়নি
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  const { chapter, verses } = chapterData;
  const currentVerseData = verses[currentVerse];

  return (

    <ThemedView variant="primary" style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.xl} color={theme.icon.primary} />
        </TouchableOpacity>

        <ThemedView style={styles.headerContent}>
          <ThemedBengaliText variant="primary" size="title" style={styles.chapterTitle}>
            {chapter.title}
          </ThemedBengaliText>
          {chapter.subtitle && chapter.subtitle !== chapter.title && (
            <ThemedBengaliText variant="secondary" size="large" style={styles.chapterSubtitle}>
              {chapter.subtitle}
            </ThemedBengaliText>
          )}
        </ThemedView>
      </ThemedView>



      {/* Verse Display */}
      <ScrollView style={styles.verseContainer} showsVerticalScrollIndicator={false}>
        <VerseReader
          verse={currentVerseData}
          showBengali={showBengali}
          showTranslation={showTranslation}
          onToggleBengali={toggleBengali}
          onToggleTranslation={toggleTranslation}
          chapterId={chapter.id}
          chapterNumber={chapter.number}
        />

        {/* Reading Progress */}
        <ReadingProgress
          chapterNumber={parseInt(chapter.number)}
          currentVerse={currentVerse + 1}
          totalVerses={verses.length}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <ThemedView style={styles.bottomNavigation}>
        <BookmarkButton
          verseId={currentVerseData.id}
          chapterId={chapter.id}
          chapterNumber={chapter.number}
          verseNumber={currentVerseData.verseNumber}
          verseText={currentVerseData.bengali}
        />

        <TouchableOpacity
          onPress={handlePreviousVerse}
          disabled={currentVerse <= 0}
          style={[
            styles.verseNavButton,
            {
              backgroundColor: theme.background.secondary,
              opacity: currentVerse <= 0 ? 0.5 : 1
            }
          ]}
        >
          <Ionicons name="chevron-back" size={SIZES.icon.md} color={theme.icon.primary} />
          <ThemedBengaliText variant="primary" size="medium">
            পূর্ববর্তী
          </ThemedBengaliText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextVerse}
          disabled={currentVerse >= verses.length - 1}
          style={[
            styles.verseNavButton,
            {
              backgroundColor: theme.background.secondary,
              opacity: currentVerse >= verses.length - 1 ? 0.5 : 1
            }
          ]}
        >
          <ThemedBengaliText variant="primary" size="medium">
            পরবর্তী
          </ThemedBengaliText>
          <Ionicons name="chevron-forward" size={SIZES.icon.md} color={theme.icon.primary} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: SIZES.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: SIZES.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.sm,
  },
  backButton: {
    marginRight: SIZES.spacing.lg,
    marginTop: SIZES.spacing.xs,
    padding: SIZES.spacing.sm,
    borderRadius: SIZES.radius.lg,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    padding: SIZES.spacing.md,
  },
  chapterTitle: {
    marginBottom: SIZES.spacing.xs,
    lineHeight: 32,
  },
  chapterSubtitle: {
    marginBottom: SIZES.spacing.sm,
    lineHeight: 24,
    opacity: 0.85,
  },

  verseContainer: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.xl,
  },
  bottomNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.xl,
    paddingVertical: SIZES.spacing.lg,
    gap: SIZES.spacing.md,
  },

  verseNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    gap: SIZES.spacing.sm,
    minHeight: 44,
  },

});
