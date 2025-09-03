import { SearchBar, SearchResults } from '@/components/search';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface SearchResult {
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  translation: string;
  speaker: string;
  matchType: 'sanskrit' | 'bengali' | 'translation';
}

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allChapters, setAllChapters] = useState<any[]>([]);

  const normalizeChapterData = (rawData: any) => {
    if (rawData.chapter) {
      // Already in the correct format
      return rawData;
    } else {
      // Convert from flat structure to nested structure
      return {
        chapter: {
          number: rawData.chapterNumber || 0,
          title: rawData.title || '',
          subtitle: rawData.title || '',
          englishTitle: rawData.titleEnglish || '',
          totalVerses: rawData.totalVerses || 0,
          description: rawData.summary || '',
        },
        verses: rawData.verses || [],
      };
    }
  };

  const loadAllChapters = useCallback(async () => {
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
      ];
      const rawChapterData = await Promise.all(chapterPromises);
      const normalizedData = rawChapterData.map(normalizeChapterData);
      setAllChapters(normalizedData);
    } catch (error) {
      console.error('Error loading chapters for search:', error);
    }
  }, []);

  useEffect(() => {
    loadAllChapters();
  }, [loadAllChapters]);

  const searchInChapters = (query: string): SearchResult[] => {
    if (!query.trim() || allChapters.length === 0) {
      return [];
    }

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    allChapters.forEach((chapterData) => {
      const { chapter, verses } = chapterData;
      
      verses.forEach((verse: any) => {
        const matches: SearchResult[] = [];

        // Search in Sanskrit
        if (verse.sanskrit && verse.sanskrit.toLowerCase().includes(searchTerm)) {
          matches.push({
            chapterNumber: chapter.number,
            verseNumber: verse.verseNumber,
            verseText: verse.sanskrit,
            translation: verse.translation,
            speaker: verse.speaker,
            matchType: 'sanskrit',
          });
        }

        // Search in Bengali
        if (verse.bengali && verse.bengali.toLowerCase().includes(searchTerm)) {
          matches.push({
            chapterNumber: chapter.number,
            verseNumber: verse.verseNumber,
            verseText: verse.bengali,
            translation: verse.translation,
            speaker: verse.speaker,
            matchType: 'bengali',
          });
        }

        // Search in Translation
        if (verse.translation && verse.translation.toLowerCase().includes(searchTerm)) {
          matches.push({
            chapterNumber: chapter.number,
            verseNumber: verse.verseNumber,
            verseText: verse.translation,
            translation: verse.translation,
            speaker: verse.speaker,
            matchType: 'translation',
          });
        }

        results.push(...matches);
      });
    });

    // Remove duplicates and sort by chapter and verse number
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => 
        r.chapterNumber === result.chapterNumber && 
        r.verseNumber === result.verseNumber && 
        r.matchType === result.matchType
      )
    );

    return uniqueResults.sort((a, b) => {
      if (a.chapterNumber !== b.chapterNumber) {
        return a.chapterNumber - b.chapterNumber;
      }
      return a.verseNumber - b.verseNumber;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const results = searchInChapters(query);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultPress = (chapterNumber: number, verseNumber: number) => {
    router.push(`/chapter/${chapterNumber}?verse=${verseNumber}`);
  };

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.icon.primary} />
          </TouchableOpacity>
          
          <ThemedView style={styles.headerContent}>
            <ThemedText style={{ ...styles.title, color: theme.text.primary }}>
              অনুসন্ধান
            </ThemedText>
            <ThemedText style={{ ...styles.subtitle, color: theme.text.secondary }}>
              শ্লোক অনুসন্ধান করুন
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="শ্লোক, অনুবাদ বা সংস্কৃত অনুসন্ধান করুন..."
          value={searchQuery}
        />

        {/* Search Results */}
        {isSearching ? (
          <ThemedView style={styles.loadingContainer}>
            <ThemedText style={{ ...styles.loadingText, color: theme.text.secondary }}>
              অনুসন্ধান করা হচ্ছে...
            </ThemedText>
          </ThemedView>
        ) : (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            onResultPress={handleResultPress}
          />
        )}

        {/* Search Tips */}
        {searchQuery.length === 0 && (
          <ThemedView style={styles.tipsContainer}>
            <ThemedText style={{ ...styles.tipsTitle, color: theme.text.primary }}>
              অনুসন্ধানের টিপস
            </ThemedText>
            <ThemedView style={styles.tipsList}>
              <ThemedView style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={theme.icon.success} />
                <ThemedText style={{ ...styles.tipText, color: theme.text.secondary }}>
                  কমপক্ষে ২টি অক্ষর লিখুন
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={theme.icon.success} />
                <ThemedText style={{ ...styles.tipText, color: theme.text.secondary }}>
                  সংস্কৃত, বাংলা বা অনুবাদে অনুসন্ধান করুন
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={theme.icon.success} />
                <ThemedText style={{ ...styles.tipText, color: theme.text.secondary }}>
                  ফলাফলে ট্যাপ করে সরাসরি শ্লোকে যান
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.lg,
    paddingTop: SIZES.spacing.md,
    paddingBottom: SIZES.spacing.sm,
  },
  backButton: {
    marginRight: SIZES.spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: SIZES.spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  tipsContainer: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.lg,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SIZES.spacing.md,
  },
  tipsList: {
    gap: SIZES.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    marginLeft: SIZES.spacing.sm,
  },
});
