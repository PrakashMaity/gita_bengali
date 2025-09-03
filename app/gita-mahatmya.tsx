import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function GitaMahatmyaScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');

  const mahatmyaText = `গীতাসুপনিষৎসু ব্রহ্মবিদ্যায়াং যোগশাস্ত্রে শ্রীকৃষ্ণার্জুনসংবাদে।
অর্জুনবিষাদযোগো নাম প্রথমোহধ্যায়ঃ॥

গীতাশাস্ত্রমিদং পুণ্যং যঃ পঠেত্তং নরোত্তমঃ।
জ্ঞানবৈরাগ্যসিদ্ধার্থং ভক্তিং কুর্বন্ গোবিন্দে॥

গীতায়াঃ শ্রবণেনৈব স্মরণেনৈব বা নরঃ।
মুচ্যতে সর্বপাপেভ্যো বিষ্ণুলোকং স গচ্ছতি॥`;

  const benefits = [
    'পাপমুক্তি ও পুণ্যলাভ',
    'জ্ঞান ও বুদ্ধির উন্নতি',
    'মন শান্ত ও স্থির হয়',
    'আধ্যাত্মিক উন্নতি ঘটে',
    'জীবনের সকল সমস্যার সমাধান',
    'মোক্ষলাভের পথ সুগম হয়'
  ];

  return (
    <ThemedView variant="primary" style={styles.container}>
      <WavePattern width={width} height={height} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.lg} color={theme.icon.primary} />
        </TouchableOpacity>
        <ThemedBengaliText variant="primary" size="title" fontFamily="begumZia" style={styles.title}>
          গীতা-মাহাত্ম্য
        </ThemedBengaliText>
        <ThemedView style={styles.placeholder} />
      </ThemedView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedCard style={styles.introCard}>
          <ThemedBengaliText variant="primary" size="large" fontFamily="begumZia" style={styles.introTitle}>
            গীতার মাহাত্ম্য
          </ThemedBengaliText>
          <ThemedBengaliText variant="secondary" size="medium" fontFamily="mahinSameya" style={styles.introText}>
            গীতা হল সমস্ত বেদের সার। এটি জীবনের সকল সমস্যার সমাধান এবং আধ্যাত্মিক উন্নতির পথ প্রদর্শন করে।
          </ThemedBengaliText>
        </ThemedCard>

        <ThemedCard style={styles.mahatmyaCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText variant="primary" size="xl" fontFamily="benSen" style={styles.sectionTitle}>
              গীতার মহিমা
            </ThemedBengaliText>
          </ThemedView>
          <ThemedBengaliText variant="primary" size="large" fontFamily="benSen" style={styles.mahatmyaText}>
            {mahatmyaText}
          </ThemedBengaliText>
        </ThemedCard>

        <ThemedCard style={styles.benefitsCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText variant="primary" size="xl" fontFamily="benSen" style={styles.sectionTitle}>
              গীতা পাঠের উপকারিতা
            </ThemedBengaliText>
          </ThemedView>
          <ThemedView style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <ThemedView key={index} style={styles.benefitItem}>
                <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
                <ThemedBengaliText variant="secondary" size="medium" fontFamily="mahinSameya" style={styles.benefitText}>
                  {benefit}
                </ThemedBengaliText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.spacing.xl, paddingTop: SIZES.spacing.lg, paddingBottom: SIZES.spacing.sm },
  backButton: { padding: SIZES.spacing.sm },
  title: { flex: 1, textAlign: 'center' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.spacing.lg, paddingBottom: SIZES.spacing.xl },
  introCard: { marginBottom: SIZES.spacing.lg, padding: SIZES.spacing.xl },
  introTitle: { textAlign: 'center', marginBottom: SIZES.spacing.md },
  introText: { textAlign: 'center', lineHeight: SIZES.spacing.xl },
  mahatmyaCard: { marginBottom: SIZES.spacing.lg, padding: SIZES.spacing.xl },
  benefitsCard: { marginBottom: SIZES.spacing.lg, padding: SIZES.spacing.xl },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.spacing.lg },
  sectionIndicator: { width: SIZES.borderSize.xxl, height: SIZES.spacing.xxxl, borderRadius: SIZES.radius.sm, marginRight: SIZES.spacing.md },
  sectionTitle: { flex: 1 },
  mahatmyaText: { textAlign: 'center', lineHeight: SIZES.spacing.xl, fontStyle: 'italic' },
  benefitsList: { gap: SIZES.spacing.md },
  benefitItem: { flexDirection: 'row', alignItems: 'flex-start', gap: SIZES.spacing.md },
  bulletPoint: { width: 8, height: 8, borderRadius: SIZES.radius.round, marginTop: SIZES.spacing.sm },
  benefitText: { flex: 1, lineHeight: SIZES.spacing.lg },
});
