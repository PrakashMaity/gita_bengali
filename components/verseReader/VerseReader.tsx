import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

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
      <ThemedView style={styles.verseCard}>
        <ThemedView style={styles.verseHeader}>
          <ThemedView style={styles.verseNumberContainer}>
            <ThemedText style={styles.verseNumber}>
              {verse.verseNumber}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.speakerContainer}>
            <Ionicons name="person-outline" size={16} color="#8B4513" />
            <ThemedText style={styles.speaker}>
              {verse.speaker}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {showBengali && (
          <ThemedView style={styles.verseSection}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                বাংলা
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.bengaliText}>
              {verse.bengali}
            </ThemedText>
            
            {/* Audio Button */}
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="play" size={20} color="#FF6B35" />
              <Ionicons name="play" size={20} color="#FF6B35" style={{ marginLeft: -8 }} />
            </TouchableOpacity>
          </ThemedView>
        )}

        {showTranslation && (
          <ThemedView style={styles.verseSection}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                অনুবাদ
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.translationText}>
              {verse.translation}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verseNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  speaker: {
    fontSize: 14,
    color: '#8B4513',
    marginLeft: 8,
  },
  verseSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  bengaliText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#8B4513',
    textAlign: 'left',
    marginBottom: 12,
  },
  translationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#A0522D',
    textAlign: 'left',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5E6D3',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
