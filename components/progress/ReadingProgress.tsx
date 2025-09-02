import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface ReadingProgress {
  chapterNumber: number;
  lastReadVerse: number;
  totalVerses: number;
  lastReadDate: number;
  isCompleted: boolean;
}

interface ReadingProgressProps {
  chapterNumber: number;
  currentVerse: number;
  totalVerses: number;
  onProgressUpdate?: (progress: ReadingProgress) => void;
}

const PROGRESS_KEY = 'gita_reading_progress';

export default function ReadingProgress({
  chapterNumber,
  currentVerse,
  totalVerses,
  onProgressUpdate,
}: ReadingProgressProps) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [chapterNumber]);

  useEffect(() => {
    if (currentVerse > 0) {
      updateProgress();
    }
  }, [currentVerse]);

  const loadProgress = async () => {
    try {
      const progressJson = await AsyncStorage.getItem(PROGRESS_KEY);
      const allProgress = progressJson ? JSON.parse(progressJson) : {};
      const chapterProgress = allProgress[chapterNumber] || null;
      setProgress(chapterProgress);
    } catch (error) {
      console.error('Error loading reading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress: ReadingProgress) => {
    try {
      const progressJson = await AsyncStorage.getItem(PROGRESS_KEY);
      const allProgress = progressJson ? JSON.parse(progressJson) : {};
      allProgress[chapterNumber] = newProgress;
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
      setProgress(newProgress);
      onProgressUpdate?.(newProgress);
    } catch (error) {
      console.error('Error saving reading progress:', error);
    }
  };

  const updateProgress = async () => {
    const isCompleted = currentVerse >= totalVerses;
    const newProgress: ReadingProgress = {
      chapterNumber,
      lastReadVerse: currentVerse,
      totalVerses,
      lastReadDate: Date.now(),
      isCompleted,
    };

    await saveProgress(newProgress);
  };

  const resetProgress = async () => {
    try {
      const progressJson = await AsyncStorage.getItem(PROGRESS_KEY);
      const allProgress = progressJson ? JSON.parse(progressJson) : {};
      delete allProgress[chapterNumber];
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
      setProgress(null);
      onProgressUpdate?.(null as unknown as ReadingProgress);
      Alert.alert('প্রগতি রিসেট', 'এই অধ্যায়ের পড়ার প্রগতি রিসেট করা হয়েছে');
    } catch (error) {
      console.error('Error resetting progress:', error);
      Alert.alert('ত্রুটি', 'প্রগতি রিসেট করতে সমস্যা হয়েছে');
    }
  };

  const getProgressPercentage = () => {
    if (!progress) return 0;
    return Math.round((progress.lastReadVerse / progress.totalVerses) * 100);
  };



  const formatLastReadDate = () => {
    if (!progress) return '';
    const date = new Date(progress.lastReadDate);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedBengaliText variant="secondary" size="small">
          লোড হচ্ছে...
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  if (!progress) {
    return (
      <ThemedView style={styles.container}>
        <ThemedBengaliText variant="tertiary" size="small">
          এখনও পড়া শুরু হয়নি
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  return (
    <ThemedCard variant="card" style={styles.container}>
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
        <ThemedView style={[styles.progressBar, { backgroundColor: theme.background.secondary }]}>
          <ThemedView style={[
            styles.progressFill,
            { 
              backgroundColor: theme.button.primary.background,
              width: `${getProgressPercentage()}%` 
            }
          ]} />
        </ThemedView>
        
        <ThemedBengaliText variant="primary" size="small" style={styles.progressText}>
          {progress.lastReadVerse}/{progress.totalVerses} ({getProgressPercentage()}%)
        </ThemedBengaliText>
      </ThemedView>

      {progress.isCompleted && (
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
