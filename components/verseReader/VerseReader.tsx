import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Image, StyleSheet } from 'react-native';
import { FavoriteButton } from '../favorite';

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
  const speakerImageMapper = (speaker: string) => {
    switch (speaker) {
      case 'ধৃতরাষ্ট্র': return require('@/assets/images/speaker/dhritarystra.png');
      case 'সঞ্জয়': return require('@/assets/images/speaker/sanjay.png');
      case 'অর্জুন': return require('@/assets/images/speaker/arjuna.png');
      case 'পরমেশ্বর': return require('@/assets/images/speaker/shreekrishna.png');
      case 'দুর্যোধন': return require('@/assets/images/speaker/duryadhona.png');
    }
  }

  return (
    <ThemedView style={styles.container}>
      {/* Verse Display */}
      <ThemedCard variant="primary" style={styles.verseCard}>
        <ThemedView style={styles.verseHeader}>
         

          <ThemedView style={styles.speakerContainer}>
            <ThemedView style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={speakerImageMapper(verse.speaker)} style={{width: 80, height: 80, borderRadius: 40,borderWidth: 3,borderColor: theme.border.primary}} />
            </ThemedView>
            <ThemedBengaliText fontFamily='mahinSameya' variant="primary" size="medium" style={styles.speaker}>
              {verse.speaker}
            </ThemedBengaliText>
          </ThemedView>

          <ThemedView style={[styles.verseNumberContainer, ]}>
            <ThemedBengaliText style={{ color: theme.button.primary.text }} size="xl">
            শ্লোক - {verse.verseNumber}
            </ThemedBengaliText>
          
          </ThemedView>

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

        {showBengali && (
          <ThemedView style={styles.verseSection}>
            <ThemedView style={styles.bengaliContainer}>
              <ThemedBengaliText fontFamily='benSen' variant="primary" size="xxl" style={styles.bengaliText}>
                {verse.bengali}
              </ThemedBengaliText>

             
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
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.xl,
  },
  verseNumberContainer: {
   
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  verseNumber: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  speakerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
