import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { useTranslationStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface TranslationVerse {
  verseNumber: string;
  translation: string;
  speaker: string;
  id: string;
}

export default function TranslationDetailScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTranslationById, isLoading } = useTranslationStore();
  
  const translationData = id ? getTranslationById(id) : null;





  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedBengaliText variant="secondary" size="medium">
          অনুবাদ লোড হচ্ছে...
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  if (!translationData) {
    return (
      <ThemedView variant="primary" style={styles.errorContainer}>
        <ThemedBengaliText variant="error" size="medium">
          অনুবাদ পাওয়া যায়নি
        </ThemedBengaliText>
      </ThemedView>
    );
  }

  const { chapter, verses } = translationData;

  // Get speaker avatar based on speaker name
  const getSpeakerAvatar = (speaker: string) => {
    // You can add more speaker avatars here
    switch (speaker) {
      case 'শ্রীকৃষ্ণ':
        return require('@/assets/images/speaker/shreekrishna.png');
      case 'অর্জুন':
        return require('@/assets/images/speaker/arjuna.png');
      case 'ধৃতরাষ্ট্র':
        return require('@/assets/images/speaker/dhritarystra.png');
      case 'সঞ্জয়':
        return require('@/assets/images/speaker/sanjay.png');
      case 'দুর্যোধন':
        return require('@/assets/images/speaker/duryadhona.png');
      default:
        return require('@/assets/images/speaker/shreekrishna.png');
    }
  };

  const renderChatMessage = (verse: TranslationVerse, index: number) => {
    
    return (
      <ThemedCard 
        key={verse.id} 
        style={[
          styles.chatMessage,
        ]}
      >
        <ThemedView style={styles.messageHeader}>
          <ThemedView style={styles.speakerInfo}>
            <Image 
              source={getSpeakerAvatar(verse.speaker)} 
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
                {verse.speaker} || শ্লোক {verse.verseNumber}
              </ThemedBengaliText>
           
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.messageContent}>
          <ThemedBengaliText
            variant="primary"
            size="medium"
            fontFamily="mahinSameya"
            style={styles.translationText}
          >
            {verse.translation}
          </ThemedBengaliText>
        </ThemedView>
      </ThemedCard>
    );
  };

  return (
    <ThemedView variant="primary" style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.xl} color={theme.icon.primary} />
        </TouchableOpacity>

        <ThemedView style={styles.headerContent}>
          <ThemedBengaliText variant="primary" size="title" style={styles.chapterTitle}>
            {chapter.title}
          </ThemedBengaliText>
          {chapter.subtitle && chapter.subtitle !== chapter.title && (
            <ThemedBengaliText variant="secondary" size="large" style={styles.chapterSubtitle}>
              {chapter.subtitle}
            </ThemedBengaliText>
          )}
        </ThemedView>
      </ThemedView>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.chatContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatContent}
      >
        {verses?.map((verse, index) => renderChatMessage(verse, index))}
      </ScrollView>

   
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
  errorContainer: {
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
  chatContainer: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.lg,
  },
  chatContent: {
    paddingBottom: SIZES.spacing.xl,
  },
  chatMessage: {
   
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.radius.xl,
    borderWidth: SIZES.borderSize.sm,
   
  },
  currentMessage: {
    borderWidth: SIZES.borderSize.md,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  messageHeader: {
    marginBottom: SIZES.spacing.md,
  },
  speakerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  verseNumber: {
    opacity: 0.7,
  },
  messageContent: {
    paddingLeft: SIZES.spacing.xl + SIZES.spacing.md,
  },
  translationText: {
    lineHeight: 24,
    textAlign: 'justify',
  },
  bottomNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.xl,
    paddingVertical: SIZES.spacing.lg,
    gap: SIZES.spacing.md,
  },
  verseNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    gap: SIZES.spacing.sm,
    minHeight: 44,
  },
  verseCounter: {
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: SIZES.radius.md,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
