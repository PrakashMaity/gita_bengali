import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { useBookmarkStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface BookmarkButtonProps {
  verseId: string;
  chapterId: string;
  chapterNumber: string;
  verseNumber: string;
  verseText: string;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}



export default function BookmarkButton({
  verseId,
  chapterId,
  chapterNumber,
  verseNumber,
  verseText,
  onBookmarkChange,
}: BookmarkButtonProps) {
  const { theme } = useTheme();
  const { 
    bookmarks,
    isBookmarked, 
    addBookmark, 
    removeBookmark, 
    isLoading 
  } = useBookmarkStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Get current bookmark status - this will re-run when bookmarks change
  const bookmarkStatus = isBookmarked(verseId);



  // Update parent component when bookmark status changes
  useEffect(() => {
    onBookmarkChange?.(bookmarkStatus);
  }, [bookmarkStatus, onBookmarkChange]);

  const handleBookmarkToggle = async () => {
    try {
      if (bookmarkStatus) {
        // Remove bookmark
        await removeBookmark(verseId);
        Alert.alert('বুকমার্ক সরানো হয়েছে', 'এই শ্লোকটি বুকমার্ক থেকে সরানো হয়েছে');
      } else {
        // Add bookmark
        await addBookmark(verseId, chapterId, chapterNumber, verseNumber, verseText);
        Alert.alert('বুকমার্ক যোগ করা হয়েছে', 'এই শ্লোকটি বুকমার্কে যোগ করা হয়েছে');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('ত্রুটি', 'বুকমার্ক পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  if (loading || isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ ...styles.loadingText, color: theme.text.secondary }}>
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
          backgroundColor: bookmarkStatus ? theme.button.primary.background : theme.background.secondary,
          borderColor: bookmarkStatus ? theme.button.primary.background : theme.border.primary,
        }
      ]}
    >
      <Ionicons 
        name={bookmarkStatus ? "checkmark" : "bookmark-outline"} 
        size={20} 
        color={bookmarkStatus ? "#4CAF50" : theme.icon.secondary} 
      />
      <ThemedText style={{
        ...styles.bookmarkText,
        color: bookmarkStatus ? theme.button.primary.text : theme.text.primary
      }}>
        {bookmarkStatus ? 'বুকমার্ক করা' : 'বুকমার্ক'}
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
