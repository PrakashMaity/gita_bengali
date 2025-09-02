import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';

import { ReadingProgress } from '@/components/progress';
import { VerseReader } from '@/components/verseReader';
import { useTheme } from '@/hooks/useTheme';
import {
  getChapterNumberFromId,
  getNextChapterId,
  getPreviousChapterId,
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

  const handlePreviousChapter = () => {
    if (id) {
      const previousChapterId = getPreviousChapterId(id);
      if (previousChapterId) {
        router.replace(`/chapter/${previousChapterId}`);
      }
    }
  };

  const handleNextChapter = () => {
    if (id) {
      const nextChapterId = getNextChapterId(id);
      if (nextChapterId) {
        router.replace(`/chapter/${nextChapterId}`);
      }
    }
  };

  const toggleTranslation = () => setShowTranslation(!showTranslation);
  const toggleBengali = () => setShowBengali(!showBengali);

  if (loading) {
    return (
      <ThemedSafeAreaView>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText style={{ ...styles.loadingText, color: theme.text.secondary }}>
            অধ্যায় লোড হচ্ছে...
          </ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  if (!chapterData) {
    return (
      <ThemedSafeAreaView>
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={{ ...styles.errorText, color: theme.text.error }}>
            অধ্যায় পাওয়া যায়নি
          </ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  const { chapter, verses } = chapterData;
  const currentVerseData = verses[currentVerse];

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#8B4513" />
          </TouchableOpacity>
          
          <ThemedView style={styles.headerContent}>
            <ThemedText style={styles.chapterTitle}>
              {chapter.title}
            </ThemedText>
            <ThemedText style={styles.chapterSubtitle}>
              {chapter.subtitle}
            </ThemedText>
            <ThemedText style={styles.chapterEnglishTitle}>
              {chapter.englishTitle}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Chapter Navigation */}
        <ThemedView style={styles.chapterNavigation}>
          <TouchableOpacity 
            onPress={handlePreviousChapter}
            disabled={!id || !getPreviousChapterId(id)}
            style={[
              styles.navButton,
              { opacity: (!id || !getPreviousChapterId(id)) ? 0.5 : 1 }
            ]}
          >
            <Ionicons name="chevron-back" size={16} color="#8B4513" />
            <ThemedText style={styles.navButtonText}>
              পূর্ববর্তী
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.chapterInfo}>
            <ThemedText style={styles.chapterNumber}>
              অধ্যায় {chapter.number}
            </ThemedText>
            <ThemedText style={styles.verseCount}>
              {currentVerse + 1}/{verses.length}
            </ThemedText>
          </ThemedView>

          <TouchableOpacity 
            onPress={handleNextChapter}
            disabled={!id || !getNextChapterId(id)}
            style={[
              styles.navButton,
              { opacity: (!id || !getNextChapterId(id)) ? 0.5 : 1 }
            ]}
          >
            <ThemedText style={styles.navButtonText}>
              পরবর্তী
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#8B4513" />
          </TouchableOpacity>
        </ThemedView>

        {/* Language Toggle */}
        <ThemedView style={styles.languageToggle}>
          <TouchableOpacity 
            onPress={toggleBengali}
            style={[
              styles.languageButton,
              { backgroundColor: showBengali ? '#FF6B35' : '#F5E6D3' }
            ]}
          >
            <ThemedText style={{
              ...styles.languageButtonText,
              color: showBengali ? '#FFFFFF' : '#8B4513'
            }}>
              বাংলা
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={toggleTranslation}
            style={[
              styles.languageButton,
              { backgroundColor: showTranslation ? '#FF6B35' : '#F5E6D3' }
            ]}
          >
            <ThemedText style={{
              ...styles.languageButtonText,
              color: showTranslation ? '#FFFFFF' : '#8B4513'
            }}>
              অনুবাদ
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Verse Display */}
        <ScrollView style={styles.verseContainer} showsVerticalScrollIndicator={false}>
          <VerseReader
            verse={currentVerseData}
            showBengali={showBengali}
            showTranslation={showTranslation}
            onToggleBengali={toggleBengali}
            onToggleTranslation={toggleTranslation}
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
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="bookmark-outline" size={20} color="#8B4513" />
            <ThemedText style={styles.bookmarkText}>বুকমার্ক</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handlePreviousVerse}
            disabled={currentVerse <= 0}
            style={[
              styles.verseNavButton,
              { opacity: currentVerse <= 0 ? 0.5 : 1 }
            ]}
          >
            <Ionicons name="chevron-back" size={16} color="#8B4513" />
            <ThemedText style={styles.verseNavButtonText}>
              পূর্ববর্তী
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleNextVerse}
            disabled={currentVerse >= verses.length - 1}
            style={[
              styles.verseNavButton,
              { opacity: currentVerse >= verses.length - 1 ? 0.5 : 1 }
            ]}
          >
            <ThemedText style={styles.verseNavButtonText}>
              পরবর্তী
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color="#8B4513" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
  },
  loadingText: {
    fontSize: 16,
    color: '#8B4513',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
  },
  errorText: {
    fontSize: 16,
    color: '#8B4513',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 16,
    marginTop: 4,
  },
  headerContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  chapterSubtitle: {
    fontSize: 18,
    color: '#8B4513',
    marginBottom: 4,
  },
  chapterEnglishTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#A0522D',
  },
  chapterNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5E6D3',
  },
  navButtonText: {
    fontSize: 14,
    marginHorizontal: 4,
    color: '#8B4513',
  },
  chapterInfo: {
    alignItems: 'center',
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  verseCount: {
    fontSize: 12,
    marginTop: 2,
    color: '#A0522D',
  },
  languageToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  verseContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F5E6D3',
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
  },
  bookmarkText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  verseNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5E6D3',
  },
  verseNavButtonText: {
    fontSize: 14,
    marginHorizontal: 4,
    color: '#8B4513',
  },
});
