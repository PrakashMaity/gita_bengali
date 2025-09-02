import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
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
      onProgressUpdate?.(null);
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

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return theme.icon.success;
    if (percentage >= 50) return theme.icon.warning;
    return theme.icon.primary;
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
        <ThemedText style={{ ...styles.loadingText, color: theme.text.secondary }}>
          লোড হচ্ছে...
        </ThemedText>
      </ThemedView>
    );
  }

  if (!progress) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ ...styles.noProgressText, color: theme.text.tertiary }}>
          এখনও পড়া শুরু হয়নি
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.progressHeader}>
        <ThemedText style={styles.progressTitle}>
          পড়ার প্রগতি
        </ThemedText>
        <TouchableOpacity onPress={resetProgress} style={styles.resetButton}>
          <Ionicons name="refresh-outline" size={20} color="#8B4513" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.progressSubtitle}>
        শেষ পড়া: {formatLastReadDate()}
      </ThemedText>

      <ThemedView style={styles.progressBarContainer}>
        <ThemedView style={styles.progressBar}>
          <ThemedView style={[
            styles.progressFill,
            { width: `${getProgressPercentage()}%` }
          ]} />
        </ThemedView>
        
        <ThemedText style={styles.progressText}>
          {progress.lastReadVerse}/{progress.totalVerses} ({getProgressPercentage()}%)
        </ThemedText>
      </ThemedView>

      {progress.isCompleted && (
        <ThemedView style={styles.completionBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#059669" />
          <ThemedText style={styles.completionText}>
            অধ্যায় সম্পূর্ণ
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
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
  loadingText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#8B4513',
  },
  noProgressText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#A0522D',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#A0522D',
    marginBottom: 12,
  },
  resetButton: {
    padding: 4,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F5E6D3',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#8B4513',
    textAlign: 'right',
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  completionText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#059669',
  },
});
