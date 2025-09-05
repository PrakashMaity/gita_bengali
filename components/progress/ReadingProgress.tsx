import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { useProgressStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface ReadingProgressProps {
  chapterId: string;
  currentVerseIndex: number;
  totalVerses: number;
  onProgressUpdate?: (progress: any) => void;
}

export default function ReadingProgress({
  chapterId,
  currentVerseIndex,
  totalVerses,
  onProgressUpdate,
}: ReadingProgressProps) {
  const { theme } = useTheme();
  const { 
    progress, 
    isLoading, 
    loadProgress, 
    resetChapterProgress, 
    getProgressPercentage 
  } = useProgressStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const chapterProgress = progress[chapterId];

  const resetProgress = async () => {
    try {
      await resetChapterProgress(chapterId);
      onProgressUpdate?.(null);
      Alert.alert('প্রগতি রিসেট', 'এই অধ্যায়ের পড়ার প্রগতি রিসেট করা হয়েছে');
    } catch (error) {
      console.error('Error resetting progress:', error);
      Alert.alert('ত্রুটি', 'প্রগতি রিসেট করতে সমস্যা হয়েছে');
    }
  };

  const getProgressPercentageValue = () => {
    return getProgressPercentage(chapterId, currentVerseIndex, totalVerses);
  };



  const formatLastReadDate = () => {
    if (!chapterProgress) return '';
    const date = new Date(chapterProgress.lastReadDate);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedBengaliText variant="secondary" size="small">
          লোড হচ্ছে...
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  if (!chapterProgress) {
    return (
      <ThemedView style={styles.container}>
        <ThemedBengaliText variant="tertiary" size="small">
          এখনও পড়া শুরু হয়নি
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  return (
    <ThemedCard variant="primary" style={styles.container}>
      <ThemedView style={styles.progressHeader}>
        <ThemedBengaliText fontFamily='mahinSameya' variant="primary" size="xl" style={styles.progressTitle}>
          পড়ার প্রগতি
        </ThemedBengaliText>
        <TouchableOpacity onPress={resetProgress} style={styles.resetButton}>
          <Ionicons name="refresh-outline" size={SIZES.icon.md} color={theme.icon.primary} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedBengaliText variant="secondary" size="medium" style={styles.progressSubtitle}>
        শেষ পড়া: {formatLastReadDate()}
      </ThemedBengaliText>

      <ThemedView style={styles.progressBarContainer}>
        <ThemedView style={[styles.progressBar, { backgroundColor: theme.background.tertiary }]}>
          <ThemedView style={[
            styles.progressFill,
            { 
              backgroundColor: theme.button.primary.background,
              width: `${getProgressPercentageValue()}%` 
            }
          ]} />
        </ThemedView>
        
        <ThemedBengaliText variant="primary" size="small" style={styles.progressText}>
          {currentVerseIndex + 1}/{totalVerses} ({getProgressPercentageValue()}%)
        </ThemedBengaliText>
      </ThemedView>

      {chapterProgress.isCompleted && (
        <ThemedView style={styles.completionBadge}>
          <Ionicons name="checkmark-circle" size={SIZES.icon.sm} color={theme.icon.success} />
          <ThemedBengaliText variant="success" size="small" style={styles.completionText}>
            অধ্যায় সম্পূর্ণ
          </ThemedBengaliText>
        </ThemedView>
      )}
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.spacing.lg,
  },
  loadingText: {
    fontSize: SIZES.sm,
    textAlign: 'center',
  },
  noProgressText: {
    fontSize: SIZES.sm,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.sm,
  },
  progressTitle: {
  
  },
  progressSubtitle: {
    fontSize: SIZES.md,
    marginBottom: SIZES.spacing.md,
  },
  resetButton: {
    padding: SIZES.spacing.xs,
  },
  progressBarContainer: {
    marginBottom: SIZES.spacing.sm,
  },
  progressBar: {
    height: SIZES.spacing.xs,
    borderRadius: SIZES.radius.xs,
    overflow: 'hidden',
    marginBottom: SIZES.spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: SIZES.radius.xs,
  },
  progressText: {
    fontSize: SIZES.sm,
    textAlign: 'right',
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.spacing.sm,
  },
  completionText: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    marginLeft: SIZES.spacing.sm,
  },
});
