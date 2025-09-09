import { BookmarkIcon } from '@/components/ui/BookmarkIcon';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { createConfirmAlert, createErrorAlert, createSuccessAlert, useCustomAlert } from '@/hooks/useCustomAlert';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { Bookmark, useBookmarkStore } from '@/store';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function BookmarksScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');
  const { removeBookmark, clearAllBookmarks, isLoading, getBookmarksSortedByDate } = useBookmarkStore();
  const { showAlert, AlertComponent } = useCustomAlert();
  
  // Get bookmarks sorted by date (newest first)
  const sortedBookmarks = getBookmarksSortedByDate();

  const handleRemoveBookmark = async (verseId: string) => {
    try {
      await removeBookmark(verseId);
      showAlert(createSuccessAlert('বুকমার্ক সরানো হয়েছে', 'এই শ্লোকটি বুকমার্ক থেকে সরানো হয়েছে'));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      showAlert(createErrorAlert('ত্রুটি', 'বুকমার্ক সরাতে সমস্যা হয়েছে'));
    }
  };

  const handleBookmarkPress = (chapterId: string, verseNumber: string) => {
    // Convert Bengali numerals to English for verse parameter
    const convertBengaliToEnglish = (bengaliNum: string) => {
      return bengaliNum.replace(/[০-৯]/g, (match) => 
        String.fromCharCode(match.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0))
      );
    };
    
    const englishVerse = convertBengaliToEnglish(verseNumber);
    router.push(`/chapter/${chapterId}?verse=${englishVerse}`);
  };

  const handleRemoveAllBookmarks = () => {
    showAlert(createConfirmAlert(
      'সব বুকমার্ক সরান',
      'আপনি কি নিশ্চিত যে আপনি সব বুকমার্ক সরাতে চান?',
      async () => {
        try {
          await clearAllBookmarks();
          showAlert(createSuccessAlert('সফল', 'সব বুকমার্ক সরানো হয়েছে'));
        } catch (error) {
          console.error('Error clearing all bookmarks:', error);
          showAlert(createErrorAlert('ত্রুটি', 'বুকমার্ক সরাতে সমস্যা হয়েছে'));
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

  const renderBookmark = (bookmark: Bookmark, index: number) => (
    <TouchableOpacity
      key={`${bookmark.verseId}-${index}`}
      onPress={() => handleBookmarkPress(bookmark.chapterId, bookmark.verseNumber)}
      style={styles.bookmarkCardContainer}
      
    >
      <ThemedCard style={[styles.bookmarkCard, { 
       
        
      }]}>
        {/* Delete Button - Top Right */}
        <TouchableOpacity
          onPress={() => handleRemoveBookmark(bookmark.verseId)}
          style={[styles.deleteButton, { backgroundColor: theme.background.quaternary }]}
        >
          <Ionicons name="trash-outline" size={SIZES.icon.md} color={theme.icon.error} />
        </TouchableOpacity>

        <ThemedView style={[styles.iconContainer, { 
          backgroundColor: theme.background.tertiary,
         
        }]}>
          <ThemedBengaliText 
            variant="primary" 
            size="large" 
            fontFamily="begumZia"
            style={styles.chapterNumber}
          >
            {bookmark.chapterNumber}
          </ThemedBengaliText>
        </ThemedView>

        {/* Text Content */}
        <ThemedView style={styles.textContainer}>
          <ThemedBengaliText
            variant="primary"
            size="large"
            fontFamily="begumZia"
            style={styles.bookmarkTitle}
            numberOfLines={2}
          >
            অধ্যায় {bookmark.chapterNumber} • শ্লোক {bookmark.verseNumber}
          </ThemedBengaliText>

          <ThemedView style={styles.bookmarkInfo}>
            <ThemedBengaliText 
              variant="secondary" 
              size="small" 
              fontFamily="mahinSameya"
              style={styles.bookmarkDate}
            >
              {formatDate(bookmark.timestamp)}
            </ThemedBengaliText>
          </ThemedView>

          <ThemedBengaliText 
            variant="secondary"
            size="small"
            fontFamily="mahinSameya"
            style={styles.verseText}
            numberOfLines={3}
          >
            {bookmark.verseText}
          </ThemedBengaliText>
        </ThemedView>

        {/* Arrow Button - Bottom Right */}
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

  if (isLoading) {
    return (
      <ThemedSafeAreaView>
        <ThemedView style={styles.loadingContainer}>
          <WavePattern width={200} height={200} opacity={0.1} />
          <ThemedBengaliText 
            variant="secondary" 
            size="large" 
            fontFamily="begumZia"
            style={styles.loadingText}
          >
            বুকমার্ক লোড হচ্ছে...
          </ThemedBengaliText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedView variant="primary" style={styles.container}>
      {AlertComponent}
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
          বুকমার্ক
        </ThemedBengaliText>
        <ThemedView style={styles.headerActions}>
          {sortedBookmarks.length > 0 && (
            <TouchableOpacity
              onPress={handleRemoveAllBookmarks}
              style={[styles.actionButton, { borderColor: theme.border.error }]}
            >
              <Ionicons name="trash-outline" size={SIZES.icon.xl} color={theme.icon.error} />
            </TouchableOpacity>
          )}
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

      {/* Bookmarks List */}
      {sortedBookmarks.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color={theme.icon.tertiary} />
          <ThemedBengaliText 
            variant="primary" 
            size="xl" 
            fontFamily="begumZia"
            style={styles.emptyTitle}
          >
            কোন বুকমার্ক নেই
          </ThemedBengaliText>
          <ThemedBengaliText 
            variant="secondary" 
            size="medium" 
            fontFamily="mahinSameya"
            style={styles.emptySubtitle}
          >
            অধ্যায় পড়ার সময় শ্লোক বুকমার্ক করুন
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
                size="xxl" 
                fontFamily="benSen"
                style={styles.sectionTitle}
              >
                সংরক্ষিত শ্লোকসমূহ
              </ThemedBengaliText>
            </ThemedView>
            <ThemedView style={styles.bookmarksContainer}>
              {sortedBookmarks.map(renderBookmark)}
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
              মোট {sortedBookmarks.length || 0}টি বুকমার্ক
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
  bookmarksContainer: {
    paddingHorizontal: SIZES.spacing.lg,
    gap: SIZES.spacing.sm,
  },
  bookmarkCardContainer: {
    marginBottom: SIZES.spacing.md,
  },
  bookmarkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.xl,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
    marginBottom: SIZES.spacing.sm,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.md,
    },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.shadow.lg,
    elevation: 4,
    position: 'relative',
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
  chapterNumber: {
    // Font styling handled by ThemedBengaliText component
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bookmarkTitle: {
    marginBottom: SIZES.spacing.xs,
  },
  bookmarkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.spacing.md,
    marginBottom: SIZES.spacing.sm,
  },
  bookmarkDate: {
    opacity: 0.9,
  },
  verseText: {
    lineHeight: 22,
    opacity: 0.85,
  },
  deleteButton: {
    position: 'absolute',
    top: SIZES.spacing.sm,
    right: SIZES.spacing.sm,
    width: SIZES.avatar.md,
    height: SIZES.avatar.md,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: SIZES.shadow.md,
    },
    shadowOpacity: 0.25,
    shadowRadius: SIZES.shadow.md,
    elevation: 4,
  },
  arrowContainer: {
    width: SIZES.avatar.md,
    height: SIZES.avatar.md,
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
