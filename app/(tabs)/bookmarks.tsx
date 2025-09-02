import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Bookmark {
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  timestamp: number;
}

const BOOKMARK_KEY = 'gita_bookmarks';

export default function BookmarksScreen() {
  const { theme } = useTheme();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const bookmarksJson = await AsyncStorage.getItem(BOOKMARK_KEY);
      const bookmarksData = bookmarksJson ? JSON.parse(bookmarksJson) : [];
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      Alert.alert('ত্রুটি', 'বুকমার্ক লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (chapterNumber: number, verseNumber: number) => {
    try {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => 
          !(bookmark.chapterNumber === chapterNumber && bookmark.verseNumber === verseNumber)
      );
      await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      Alert.alert('বুকমার্ক সরানো হয়েছে', 'এই শ্লোকটি বুকমার্ক থেকে সরানো হয়েছে');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      Alert.alert('ত্রুটি', 'বুকমার্ক সরাতে সমস্যা হয়েছে');
    }
  };

  const handleBookmarkPress = (chapterNumber: number, verseNumber: number) => {
    router.push(`/chapter/${chapterNumber}?verse=${verseNumber}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderBookmark = (bookmark: Bookmark, index: number) => (
    <TouchableOpacity
      key={`${bookmark.chapterNumber}-${bookmark.verseNumber}-${index}`}
      onPress={() => handleBookmarkPress(bookmark.chapterNumber, bookmark.verseNumber)}
      style={styles.bookmarkCardContainer}
    >
      <ThemedCard style={styles.bookmarkCard}>
        <ThemedView style={styles.bookmarkHeader}>
          <ThemedView style={styles.chapterInfo}>
            <ThemedView style={styles.chapterNumberContainer}>
              <ThemedText style={{ ...styles.chapterNumber, color: theme.text.quaternary }}>
                {bookmark.chapterNumber}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.verseInfo}>
              <ThemedText style={{ ...styles.verseTitle, color: theme.text.primary }}>
                অধ্যায় {bookmark.chapterNumber} • শ্লোক {bookmark.verseNumber}
              </ThemedText>
              <ThemedText style={{ ...styles.bookmarkDate, color: theme.text.tertiary }}>
                {formatDate(bookmark.timestamp)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          
          <TouchableOpacity
            onPress={() => removeBookmark(bookmark.chapterNumber, bookmark.verseNumber)}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={20} color={theme.icon.error} />
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedText 
          style={{ ...styles.verseText, color: theme.text.secondary }}
          numberOfLines={3}
        >
          {bookmark.verseText}
        </ThemedText>
        
        <ThemedView style={styles.bookmarkFooter}>
          <Ionicons name="chevron-forward" size={16} color={theme.icon.primary} />
        </ThemedView>
      </ThemedCard>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ThemedSafeAreaView>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText style={{ ...styles.loadingText, color: theme.text.secondary }}>
            বুকমার্ক লোড হচ্ছে...
          </ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={{ ...styles.title, color: theme.text.primary }}>
            বুকমার্ক
          </ThemedText>
          <ThemedText style={{ ...styles.subtitle, color: theme.text.secondary }}>
            আপনার সংরক্ষিত শ্লোকসমূহ
          </ThemedText>
        </ThemedView>

        {/* Bookmarks List */}
        {bookmarks.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={64} color={theme.icon.tertiary} />
            <ThemedText style={{ ...styles.emptyTitle, color: theme.text.primary }}>
              কোন বুকমার্ক নেই
            </ThemedText>
            <ThemedText style={{ ...styles.emptySubtitle, color: theme.text.secondary }}>
              অধ্যায় পড়ার সময় শ্লোক বুকমার্ক করুন
            </ThemedText>
          </ThemedView>
        ) : (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedView style={styles.bookmarksList}>
              {bookmarks.map(renderBookmark)}
            </ThemedView>
            
            {/* Footer Info */}
            <ThemedView style={styles.footer}>
              <ThemedText style={{ ...styles.footerText, color: theme.text.tertiary }}>
                মোট {bookmarks.length}টি বুকমার্ক
              </ThemedText>
            </ThemedView>
          </ScrollView>
        )}
      </ThemedView>
    </ThemedSafeAreaView>
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
    fontSize: 16,
  },
  header: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingTop: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.xl,
  },
  bookmarksList: {
    marginTop: SIZES.spacing.md,
  },
  bookmarkCardContainer: {
    marginBottom: SIZES.spacing.md,
  },
  bookmarkCard: {
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chapterNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.md,
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  verseInfo: {
    flex: 1,
  },
  verseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SIZES.spacing.xs,
  },
  bookmarkDate: {
    fontSize: 12,
  },
  removeButton: {
    padding: SIZES.spacing.sm,
  },
  verseText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SIZES.spacing.md,
  },
  bookmarkFooter: {
    alignItems: 'flex-end',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
