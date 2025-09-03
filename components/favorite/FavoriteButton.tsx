import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { useFavoriteStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface FavoriteButtonProps {
  verseId: string;
  chapterId: string;
  chapterNumber: string;
  verseNumber: string;
  verseText: string;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

export default function FavoriteButton({
  verseId,
  chapterId,
  chapterNumber,
  verseNumber,
  verseText,
  onFavoriteChange,
}: FavoriteButtonProps) {
  const { theme } = useTheme();
  const { 
    favorites,
    isFavorite, 
    addFavorite, 
    removeFavorite, 
    isLoading 
  } = useFavoriteStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Get current favorite status - this will re-run when favorites change
  const favoriteStatus = isFavorite(verseId);

  // Update parent component when favorite status changes
  useEffect(() => {
    onFavoriteChange?.(favoriteStatus);
  }, [favoriteStatus, onFavoriteChange]);

  const handleFavoriteToggle = async () => {
    try {
      if (favoriteStatus) {
        // Remove favorite
        await removeFavorite(verseId);
        Alert.alert('প্রিয় শ্লোক সরানো হয়েছে', 'এই শ্লোকটি প্রিয় শ্লোক থেকে সরানো হয়েছে');
      } else {
        // Add favorite
        await addFavorite(verseId, chapterId, chapterNumber, verseNumber, verseText);
        Alert.alert('প্রিয় শ্লোক যোগ করা হয়েছে', 'এই শ্লোকটি প্রিয় শ্লোকে যোগ করা হয়েছে');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('ত্রুটি', 'প্রিয় শ্লোক পরিবর্তন করতে সমস্যা হয়েছে');
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
      onPress={handleFavoriteToggle}
   
    >
      <Ionicons 
        name={favoriteStatus ? "heart" : "heart-outline"} 
        size={SIZES.icon.xxl} 
        color={favoriteStatus ? "#FF6B6B" : theme.icon.secondary} 
      />
   
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
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: SIZES.borderRadius.md,
    borderWidth: 1,
  },
  favoriteText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: SIZES.spacing.xs,
  },
});
