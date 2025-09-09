import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedButton } from '@/components/ui/ThemedButton/ThemedButton';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { DailySloka } from '@/store/notificationStore';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface DailySlokaNotificationProps {
  visible: boolean;
  sloka: DailySloka | null;
  onClose: () => void;
  onReadMore: () => void;
}

const { width, height } = Dimensions.get('window');

export const DailySlokaNotification: React.FC<DailySlokaNotificationProps> = ({
  visible,
  sloka,
  onClose,
  onReadMore,
}) => {
  const theme = useThemeColors();

  if (!sloka) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <ThemedCard variant="primary" style={styles.modalCard}>
            <ThemedView style={styles.header}>
              <ThemedView style={styles.iconContainer}>
                <FontAwesome5 
                  name="om" 
                  size={SIZES.icon.lg} 
                  color={theme.icon.primary} 
                />
              </ThemedView>
              <ThemedBengaliText
                variant="primary"
                size="lg"
                fontFamily="benSen"
                style={styles.title}
              >
                আজকের শ্লোক
              </ThemedBengaliText>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <FontAwesome5 
                  name="times" 
                  size={SIZES.icon.sm} 
                  color={theme.icon.secondary} 
                />
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.content}>
              <ThemedView style={styles.chapterInfo}>
                <ThemedBengaliText
                  variant="secondary"
                  size="sm"
                  fontFamily="mahinSameya"
                >
                  {sloka.chapterNumber} অধ্যায়
                </ThemedBengaliText>
                <ThemedBengaliText
                  variant="secondary"
                  size="sm"
                  fontFamily="mahinSameya"
                >
                  শ্লোক {sloka.verseNumber}
                </ThemedBengaliText>
              </ThemedView>

              <ThemedView style={styles.slokaContainer}>
                <ThemedBengaliText
                  variant="primary"
                  size="md"
                  fontFamily="mahinSameya"
                  style={styles.slokaText}
                >
                  {sloka.bengali}
                </ThemedBengaliText>
              </ThemedView>

              <ThemedView style={styles.translationContainer}>
                <ThemedBengaliText
                  variant="secondary"
                  size="sm"
                  fontFamily="benSen"
                  style={styles.translationText}
                >
                  {sloka.translation}
                </ThemedBengaliText>
              </ThemedView>

              {sloka.speaker && (
                <ThemedView style={styles.speakerContainer}>
                  <ThemedBengaliText
                    variant="accent"
                    size="xs"
                    fontFamily="benSen"
                    style={styles.speakerText}
                  >
                    - {sloka.speaker}
                  </ThemedBengaliText>
                </ThemedView>
              )}
            </ThemedView>

            <ThemedView style={styles.actions}>
              <ThemedButton
                title="আরও পড়ুন"
                onPress={onReadMore}
                variant="primary"
                size="sm"
                style={styles.readMoreButton}
                icon={<FontAwesome5 name="book-open" size={SIZES.icon.sm} color={theme.button.primary.text} />}
              />
              <ThemedButton
                title="বন্ধ করুন"
                onPress={onClose}
                variant="secondary"
                size="sm"
                style={styles.closeButtonAction}
              />
            </ThemedView>
          </ThemedCard>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
  },
  modalCard: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    borderRadius: SIZES.radius.xl,
    padding: SIZES.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.lg,
  },
  iconContainer: {
    padding: SIZES.spacing.sm,
    borderRadius: SIZES.radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SIZES.spacing.md,
  },
  closeButton: {
    padding: SIZES.spacing.sm,
  },
  content: {
    marginBottom: SIZES.spacing.lg,
  },
  chapterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.spacing.md,
    paddingBottom: SIZES.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  slokaContainer: {
    marginBottom: SIZES.spacing.md,
    padding: SIZES.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: SIZES.radius.md,
  },
  slokaText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  translationContainer: {
    marginBottom: SIZES.spacing.sm,
    padding: SIZES.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: SIZES.radius.md,
  },
  translationText: {
    textAlign: 'left',
    lineHeight: 20,
  },
  speakerContainer: {
    alignItems: 'flex-end',
  },
  speakerText: {
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: SIZES.spacing.md,
  },
  readMoreButton: {
    flex: 1,
  },
  closeButtonAction: {
    flex: 1,
  },
});

export default DailySlokaNotification;
