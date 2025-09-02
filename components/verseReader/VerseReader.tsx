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
}

export default function VerseReader({
  verse,
  showBengali,
  showTranslation,
  onToggleBengali,
  onToggleTranslation,
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
            <Ionicons name="person-outline" size={SIZES.icon.sm} color={theme.icon.secondary} />
            <ThemedBengaliText fontFamily='mahinSameya' variant="primary" size="small" style={styles.speaker}>
              {verse.speaker}
            </ThemedBengaliText>
          </ThemedView>
        </ThemedView>

        {showBengali && (
          <ThemedView style={styles.verseSection}>
        
            <ThemedBengaliText fontFamily='benSen' variant="primary" size="xxl" style={styles.bengaliText}>
              {verse.bengali}
            </ThemedBengaliText>
            
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
    marginBottom: SIZES.spacing.lg,
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  verseNumberContainer: {
    width: SIZES.icon.xxl,
    height: SIZES.icon.xxl,
    borderRadius: SIZES.radius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.md,
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
    fontSize: SIZES.md,
    marginLeft: SIZES.spacing.sm,
  },
  verseSection: {
    marginBottom: SIZES.spacing.lg,
  },
  sectionHeader: {
    marginBottom: SIZES.spacing.sm,
  },
  sectionTitle: {
   textAlign: 'center',
  },
  bengaliText: {
   
    textAlign: 'center',
    marginBottom: SIZES.spacing.md,
    alignItems: 'center',
    alignSelf: 'center',
  },
  translationText: {
  
    textAlign: 'center',
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
