import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { createConfirmAlert, createErrorAlert, createSuccessAlert, useCustomAlert } from '@/hooks/useCustomAlert';
import { useTheme } from '@/hooks/useTheme';
import { FavoriteVerse, useFavoriteStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { removeFavorite, clearAllFavorites, isLoading, getFavoritesSortedByDate } = useFavoriteStore();
  const { showAlert, AlertComponent } = useCustomAlert();
  
  // Get favorites sorted by date (newest first)
  const sortedFavorites = getFavoritesSortedByDate();

  const handleRemoveFavorite = async (verseId: string) => {
    try {
      await removeFavorite(verseId);
      showAlert(createSuccessAlert('প্রিয় শ্লোক সরানো হয়েছে', 'এই শ্লোকটি প্রিয় শ্লোক থেকে সরানো হয়েছে'));
    } catch (error) {
      console.error('Error removing favorite:', error);
      showAlert(createErrorAlert('ত্রুটি', 'প্রিয় শ্লোক সরাতে সমস্যা হয়েছে'));
    }
  };

  const handleFavoritePress = (chapterId: string, verseNumber: string) => {
    // Convert Bengali numerals to English for verse parameter
    const convertBengaliToEnglish = (bengaliNum: string) => {
      return bengaliNum.replace(/[০-৯]/g, (match) => 
        String.fromCharCode(match.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0))
      );
    };
    
    const englishVerse = convertBengaliToEnglish(verseNumber);
    router.push(`/chapter/${chapterId}?verse=${englishVerse}`);
  };

  const handleRemoveAllFavorites = () => {
    showAlert(createConfirmAlert(
      'সব প্রিয় শ্লোক সরান',
      'আপনি কি নিশ্চিত যে আপনি সব প্রিয় শ্লোক সরাতে চান?',
      async () => {
        try {
          await clearAllFavorites();
          showAlert(createSuccessAlert('সফল', 'সব প্রিয় শ্লোক সরানো হয়েছে'));
        } catch (error) {
          console.error('Error clearing all favorites:', error);
          showAlert(createErrorAlert('ত্রুটি', 'প্রিয় শ্লোক সরাতে সমস্যা হয়েছে'));
        }
      }
    ));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get speaker avatar based on chapter number
  const getSpeakerAvatar = (chapterNumber: string) => {
    // You can add more speaker avatars here based on chapter
    switch (chapterNumber) {
      case '১':
        return require('@/assets/images/speaker/dhritarystra.png');
      case '২':
      case '৩':
      case '৪':
      case '৫':
      case '৬':
      case '৭':
      case '৮':
      case '৯':
      case '১০':
      case '১১':
      case '১২':
      case '১৩':
      case '১৪':
      case '১৫':
      case '১৬':
      case '১৭':
      case '১৮':
        return require('@/assets/images/speaker/shreekrishna.png');
      default:
        return require('@/assets/images/speaker/shreekrishna.png');
    }
  };

  const renderFavorite = (favorite: FavoriteVerse, index: number) => (
    <TouchableOpacity
      key={`${favorite.verseId}-${index}`}
      onPress={() => handleFavoritePress(favorite.chapterId, favorite.verseNumber)}
      style={styles.favoriteCardContainer}
      activeOpacity={0.8}
    >
      <ThemedCard style={styles.chatMessage}>
        <ThemedView style={styles.messageHeader}>
          <ThemedView style={styles.speakerInfo}>
            <Image 
              source={getSpeakerAvatar(favorite.chapterNumber)} 
              style={styles.speakerAvatar}
              resizeMode="cover"
            />
            <ThemedView style={styles.speakerDetails}>
              <ThemedBengaliText
                variant="primary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.speakerName}
              >
                অধ্যায় {favorite.chapterNumber} • শ্লোক {favorite.verseNumber}
              </ThemedBengaliText>
              <ThemedBengaliText 
                variant="secondary" 
                size="small" 
                fontFamily="mahinSameya"
                style={styles.favoriteDate}
              >
                {formatDate(favorite.timestamp)}
              </ThemedBengaliText>
            </ThemedView>
          </ThemedView>
          
          <TouchableOpacity
            onPress={() => handleRemoveFavorite(favorite.verseId)}
            style={styles.removeButton}
          >
            <Ionicons name="heart-dislike-outline" size={SIZES.icon.md} color={theme.icon.error} />
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.messageContent}>
          <ThemedBengaliText
            variant="primary"
            size="medium"
            fontFamily="mahinSameya"
            style={styles.translationText}
          >
            {favorite.verseText}
          </ThemedBengaliText>
        </ThemedView>
      </ThemedCard>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedBengaliText variant="secondary" size="medium">
          প্রিয় শ্লোক লোড হচ্ছে...
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  return (
    <ThemedView variant="primary" style={styles.container}>
      {AlertComponent}
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.xl} color={theme.icon.primary} />
        </TouchableOpacity>

        <ThemedView style={styles.headerContent}>
          <ThemedBengaliText variant="primary" size="title" style={styles.chapterTitle}>
            প্রিয় শ্লোক
          </ThemedBengaliText>
          {sortedFavorites.length > 0 && (
            <ThemedBengaliText variant="secondary" size="large" style={styles.chapterSubtitle}>
              মোট {sortedFavorites.length}টি প্রিয় শ্লোক
            </ThemedBengaliText>
          )}
        </ThemedView>
        
        {sortedFavorites.length > 0 && (
          <TouchableOpacity
            onPress={handleRemoveAllFavorites}
            style={styles.clearAllButton}
          >
            <Ionicons name="trash-outline" size={SIZES.icon.lg} color={theme.icon.error} />
          </TouchableOpacity>
        )}
      </ThemedView>

      {/* Favorites List */}
      {sortedFavorites.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={theme.icon.tertiary} />
          <ThemedBengaliText 
            variant="primary" 
            size="xl" 
            fontFamily="begumZia"
            style={styles.emptyTitle}
          >
            কোন প্রিয় শ্লোক নেই
          </ThemedBengaliText>
          <ThemedBengaliText 
            variant="secondary" 
            size="medium" 
            fontFamily="mahinSameya"
            style={styles.emptySubtitle}
          >
            অধ্যায় পড়ার সময় শ্লোক প্রিয় করুন
          </ThemedBengaliText>
        </ThemedView>
      ) : (
        <ScrollView 
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContent}
        >
          {sortedFavorites.map((favorite, index) => renderFavorite(favorite, index))}
        </ScrollView>
      )}
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
  clearAllButton: {
    padding: SIZES.spacing.sm,
    borderRadius: SIZES.radius.lg,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.lg,
  },
  chatContent: {
    paddingBottom: SIZES.spacing.xl,
  },
  favoriteCardContainer: {
    marginBottom: SIZES.spacing.md,
  },
  chatMessage: {
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.md,
  },
  speakerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  speakerAvatar: {
    width: SIZES.avatar.lg,
    height: SIZES.avatar.lg,
    borderRadius: SIZES.radius.round,
    marginRight: SIZES.spacing.md,
  },
  speakerDetails: {
    flex: 1,
  },
  speakerName: {
    fontWeight: '600',
    marginBottom: SIZES.spacing.xs,
  },
  favoriteDate: {
    opacity: 0.7,
  },
  messageContent: {
    paddingLeft: SIZES.spacing.xl + SIZES.spacing.md,
  },
  translationText: {
    lineHeight: 24,
    textAlign: 'justify',
  },
  removeButton: {
    padding: SIZES.spacing.sm,
    borderRadius: SIZES.radius.round,
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.xl,
  },
  emptyTitle: {
    marginTop: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: SIZES.spacing.xl,
  },
});
