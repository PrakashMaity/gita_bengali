import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { FavoriteVerse, useFavoriteStore } from '@/store';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');
  const { removeFavorite, clearAllFavorites, isLoading, getFavoritesSortedByDate } = useFavoriteStore();
  
  // Get favorites sorted by date (newest first)
  const sortedFavorites = getFavoritesSortedByDate();

  const handleRemoveFavorite = async (verseId: string) => {
    try {
      await removeFavorite(verseId);
      Alert.alert('প্রিয় শ্লোক সরানো হয়েছে', 'এই শ্লোকটি প্রিয় শ্লোক থেকে সরানো হয়েছে');
    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert('ত্রুটি', 'প্রিয় শ্লোক সরাতে সমস্যা হয়েছে');
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
    Alert.alert(
      'সব প্রিয় শ্লোক সরান',
      'আপনি কি নিশ্চিত যে আপনি সব প্রিয় শ্লোক সরাতে চান?',
      [
        {
          text: 'বাতিল',
          style: 'cancel',
        },
        {
          text: 'সরান',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllFavorites();
              Alert.alert('সফল', 'সব প্রিয় শ্লোক সরানো হয়েছে');
            } catch (error) {
              console.error('Error clearing all favorites:', error);
              Alert.alert('ত্রুটি', 'প্রিয় শ্লোক সরাতে সমস্যা হয়েছে');
            }
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderFavorite = (favorite: FavoriteVerse, index: number) => (
    <TouchableOpacity
      key={`${favorite.verseId}-${index}`}
      onPress={() => handleFavoritePress(favorite.chapterId, favorite.verseNumber)}
      style={styles.favoriteCardContainer}
      activeOpacity={0.8}
    >
      <ThemedCard style={[styles.favoriteCard, { 
        backgroundColor: theme.background.card,
        shadowColor: theme.text.primary,
      }]}>
        <ThemedView style={[styles.iconContainer, { 
          backgroundColor: theme.background.tertiary,
          shadowColor: theme.text.primary,
        }]}>
          <ThemedBengaliText 
            variant="primary" 
            size="large" 
            fontFamily="begumZia"
            style={styles.chapterNumber}
          >
            {favorite.chapterNumber}
          </ThemedBengaliText>
        </ThemedView>

        {/* Text Content */}
        <ThemedView style={styles.textContainer}>
          <ThemedBengaliText
            variant="primary"
            size="large"
            fontFamily="begumZia"
            style={styles.favoriteTitle}
            numberOfLines={2}
          >
            অধ্যায় {favorite.chapterNumber} • শ্লোক {favorite.verseNumber}
          </ThemedBengaliText>

          <ThemedView style={styles.favoriteInfo}>
            <ThemedBengaliText 
              variant="secondary" 
              size="xs" 
              fontFamily="mahinSameya"
              style={styles.favoriteDate}
            >
              {formatDate(favorite.timestamp)}
            </ThemedBengaliText>
          </ThemedView>

          <ThemedBengaliText 
            variant="secondary"
            size="small"
            fontFamily="mahinSameya"
            style={styles.verseText}
            numberOfLines={3}
          >
            {favorite.verseText}
          </ThemedBengaliText>
        </ThemedView>

        {/* Action Buttons Container */}
        <ThemedView style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => handleRemoveFavorite(favorite.verseId)}
            style={[styles.removeButton, { backgroundColor: theme.background.quaternary }]}
          >
            <Ionicons name="heart-dislike-outline" size={SIZES.icon.sm} color={theme.icon.error} />
          </TouchableOpacity>
          
          <ThemedView style={[styles.arrowContainer, { backgroundColor: theme.background.quaternary }]}>
            <MaterialIcons 
              name="arrow-forward-ios" 
              size={SIZES.icon.sm} 
              color={theme.icon.quaternary} 
            />
          </ThemedView>
        </ThemedView>
      </ThemedCard>
    </TouchableOpacity>
  );

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
            প্রিয় শ্লোক লোড হচ্ছে...
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
      <ThemedCard style={styles.headerCard}>
        <ThemedBengaliText 
          variant="primary" 
          size="title" 
          fontFamily="begumZia"
          style={styles.title}
        >
          প্রিয় শ্লোক
        </ThemedBengaliText>
        <ThemedView style={styles.headerActions}>
          {sortedFavorites.length > 0 && (
            <TouchableOpacity
              onPress={handleRemoveAllFavorites}
              style={[styles.actionButton, { borderColor: theme.border.error }]}
            >
              <Ionicons name="heart-dislike-outline" size={SIZES.icon.lg} color={theme.icon.error} />
            </TouchableOpacity>
          )}
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <Ionicons 
              name="heart" 
              size={SIZES.icon.lg} 
              color="#FF6B6B" 
            />
          </ThemedView>
        </ThemedView>
      </ThemedCard>

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
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="primary" 
                size="xl" 
                fontFamily="benSen"
                style={styles.sectionTitle}
              >
                প্রিয় শ্লোকসমূহ
              </ThemedBengaliText>
            </ThemedView>
            <ThemedView style={styles.favoritesContainer}>
              {sortedFavorites.map(renderFavorite)}
            </ThemedView>
          </ThemedView>
          
          {/* Footer Info */}
          <ThemedView style={styles.footer}>
            <ThemedBengaliText 
              variant="tertiary" 
              size="small" 
              fontFamily="spaceMono"
              style={styles.footerText}
            >
              মোট {sortedFavorites.length || 0}টি প্রিয় শ্লোক
            </ThemedBengaliText>
          </ThemedView>
        </ScrollView>
      )}
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
    marginBottom: SIZES.spacing.sm,
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
    padding: SIZES.spacing.sm,
    borderRadius: SIZES.radius.md,
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
    width: SIZES.borderSize.xxl,
    height: SIZES.spacing.xxxl,
    borderRadius: SIZES.radius.sm,
    marginRight: SIZES.spacing.md,
  },
  sectionTitle: {
    flex: 1,
  },
  favoritesContainer: {
    paddingHorizontal: SIZES.spacing.lg,
  },
  favoriteCardContainer: {
    marginBottom: SIZES.spacing.md,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.sm,
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.shadow.md,
    elevation: 3,
  },
  iconContainer: {
    width: SIZES.avatar.lg,
    height: SIZES.avatar.lg,
    borderRadius: SIZES.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.spacing.lg,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.sm,
    },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.shadow.sm,
    elevation: 2,
  },
  chapterNumber: {
    // Font styling handled by ThemedBengaliText component
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteTitle: {
    marginBottom: SIZES.spacing.xs,
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.spacing.md,
    marginBottom: SIZES.spacing.sm,
  },
  favoriteDate: {
    // Font styling handled by ThemedBengaliText component
  },
  verseText: {
    lineHeight: SIZES.spacing.lg,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.spacing.sm,
  },
  removeButton: {
    width: SIZES.avatar.sm,
    height: SIZES.avatar.sm,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    width: SIZES.avatar.sm,
    height: SIZES.avatar.sm,
    borderRadius: SIZES.radius.round,
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
  footer: {
    alignItems: 'center',
    marginTop: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
  },
  footerText: {
    textAlign: 'center',
  },
});
