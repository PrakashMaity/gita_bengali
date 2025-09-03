import { FavoriteButton } from '@/components/favorite';
import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Verse {
  verseNumber: string;
  bengali: string;
  translation: string;
  speaker: string;
  id: string;
}

interface VerseReaderProps {
  verse: Verse;
  showBengali: boolean;
  showTranslation: boolean;
  onToggleBengali: () => void;
  onToggleTranslation: () => void;
  chapterId?: string;
  chapterNumber?: string;
}

export default function VerseReader({
  verse,
  showBengali,
  showTranslation,
  onToggleBengali,
  onToggleTranslation,
  chapterId,
  chapterNumber,
}: VerseReaderProps) {
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      {/* Verse Display */}
      <ThemedCard variant="card" style={styles.verseCard}>
        <ThemedView style={styles.verseHeader}>
          <ThemedView style={[styles.verseNumberContainer, { backgroundColor: theme.button.primary.background }]}>
            <ThemedBengaliText style={{color: theme.button.primary.text}} size="title">
              {verse.verseNumber}
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedView style={styles.speakerContainer}>
            <Ionicons name="person-outline" size={SIZES.icon.md} color={theme.icon.secondary} />
            <ThemedBengaliText fontFamily='mahinSameya' variant="primary" size="medium" style={styles.speaker}>
              {verse.speaker}
            </ThemedBengaliText>
          </ThemedView>
        </ThemedView>

        {showBengali && (
          <ThemedView style={styles.verseSection}>
            <ThemedView style={styles.bengaliContainer}>
              <ThemedBengaliText fontFamily='benSen' variant="primary" size="xxl" style={styles.bengaliText}>
                {verse.bengali}
              </ThemedBengaliText>
              
              {/* Favorite Button for Bengali verse */}
              {chapterId && chapterNumber && (
                <ThemedView style={styles.favoriteContainer}>
                  <FavoriteButton
                    verseId={verse.id}
                    chapterId={chapterId}
                    chapterNumber={chapterNumber}
                    verseNumber={verse.verseNumber}
                    verseText={verse.bengali}
                  />
                </ThemedView>
              )}
            </ThemedView>
            
            {/* Audio Button */}
        
          </ThemedView>
        )}

        {showTranslation && (
          <ThemedView style={styles.verseSection}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedBengaliText variant="primary" size="title" style={styles.sectionTitle}>
                অনুবাদ
              </ThemedBengaliText>
            </ThemedView>
            <ThemedBengaliText fontFamily='benSen' variant="primary" size="large" style={styles.translationText}>
              {verse.translation}
            </ThemedBengaliText>
          </ThemedView>
        )}
      </ThemedCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verseCard: {
    marginBottom: SIZES.spacing.xl,
    padding: SIZES.spacing.xl,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xl,
  },
  verseNumberContainer: {
    width: SIZES.icon.huge,
    height: SIZES.icon.huge,
    borderRadius: SIZES.radius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.lg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  verseNumber: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  speaker: {
    marginLeft: SIZES.spacing.sm,
    opacity: 0.9,
  },
  verseSection: {
    marginBottom: SIZES.spacing.xl,
  },
  sectionHeader: {
    marginBottom: SIZES.spacing.md,
  },
  sectionTitle: {
   textAlign: 'center',
  },
  bengaliContainer: {
    alignItems: 'center',
  },
  bengaliText: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.lg,
    lineHeight: 36,
    alignItems: 'center',
    alignSelf: 'center',
  },
  favoriteContainer: {
    marginTop: SIZES.spacing.sm,
  },
  translationText: {
    textAlign: 'center',
    lineHeight: 28,
    marginTop: SIZES.spacing.sm,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.sm,
    paddingHorizontal: SIZES.spacing.lg,
    borderRadius: SIZES.radius.md,
    alignSelf: 'flex-start',
  },
});
