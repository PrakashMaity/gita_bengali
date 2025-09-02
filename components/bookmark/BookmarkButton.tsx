import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface BookmarkButtonProps {
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

interface Bookmark {
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
  timestamp: number;
}

const BOOKMARK_KEY = 'gita_bookmarks';

export default function BookmarkButton({
  chapterNumber,
  verseNumber,
  verseText,
  onBookmarkChange,
}: BookmarkButtonProps) {
  const { theme } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBookmarkStatus();
  }, [chapterNumber, verseNumber]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarks = await getBookmarks();
      const bookmarkExists = bookmarks.some(
        (bookmark) => 
          bookmark.chapterNumber === chapterNumber && 
          bookmark.verseNumber === verseNumber
      );
      setIsBookmarked(bookmarkExists);
      onBookmarkChange?.(bookmarkExists);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookmarks = async (): Promise<Bookmark[]> => {
    try {
      const bookmarksJson = await AsyncStorage.getItem(BOOKMARK_KEY);
      return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  };

  const saveBookmarks = async (bookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      const bookmarks = await getBookmarks();
      const bookmarkKey = `${chapterNumber}-${verseNumber}`;
      
      if (isBookmarked) {
        // Remove bookmark
        const updatedBookmarks = bookmarks.filter(
          (bookmark) => 
            !(bookmark.chapterNumber === chapterNumber && bookmark.verseNumber === verseNumber)
        );
        await saveBookmarks(updatedBookmarks);
        setIsBookmarked(false);
        onBookmarkChange?.(false);
        Alert.alert('বুকমার্ক সরানো হয়েছে', 'এই শ্লোকটি বুকমার্ক থেকে সরানো হয়েছে');
      } else {
        // Add bookmark
        const newBookmark: Bookmark = {
          chapterNumber,
          verseNumber,
          verseText,
          timestamp: Date.now(),
        };
        const updatedBookmarks = [...bookmarks, newBookmark];
        await saveBookmarks(updatedBookmarks);
        setIsBookmarked(true);
        onBookmarkChange?.(true);
        Alert.alert('বুকমার্ক যোগ করা হয়েছে', 'এই শ্লোকটি বুকমার্কে যোগ করা হয়েছে');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('ত্রুটি', 'বুকমার্ক পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.loadingText, { color: theme.text.secondary }]}>
          লোড হচ্ছে...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleBookmarkToggle}
      style={[
        styles.bookmarkButton,
        {
          backgroundColor: isBookmarked ? theme.button.primary.background : theme.background.secondary,
          borderColor: isBookmarked ? theme.button.primary.background : theme.border.primary,
        }
      ]}
    >
      <Ionicons 
        name={isBookmarked ? "bookmark" : "bookmark-outline"} 
        size={20} 
        color={isBookmarked ? theme.button.primary.text : theme.icon.secondary} 
      />
      <ThemedText style={[
        styles.bookmarkText,
        { color: isBookmarked ? theme.button.primary.text : theme.text.primary }
      ]}>
        {isBookmarked ? 'বুকমার্ক করা' : 'বুকমার্ক'}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.spacing.sm,
  },
  loadingText: {
    fontSize: 12,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: SIZES.borderRadius.md,
    borderWidth: 1,
  },
  bookmarkText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: SIZES.spacing.xs,
  },
});
