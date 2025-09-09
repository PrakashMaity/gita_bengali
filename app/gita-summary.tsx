import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function GitaSummaryScreen() {
  const { theme } = useTheme();
  const { width, height } = Dimensions.get('window');

  const summaryData = [
    {
      chapter: '১ম অধ্যায়',
      title: 'অর্জুনবিষাদযোগ',
      summary: 'কুরুক্ষেত্র যুদ্ধের প্রাক্কালে অর্জুনের মনোবেদনা ও কৃষ্ণের উপদেশের সূচনা।'
    },
    {
      chapter: '২য় অধ্যায়',
      title: 'সাংখ্যযোগ',
      summary: 'কর্মযোগ, জ্ঞানযোগ ও আত্মার অমরত্ব সম্পর্কে মৌলিক শিক্ষা।'
    },
    {
      chapter: '৩য় অধ্যায়',
      title: 'কর্মযোগ',
      summary: 'নিষ্কাম কর্মের মাধ্যমে আধ্যাত্মিক উন্নতির পথ।'
    },
    {
      chapter: '৪র্থ অধ্যায়',
      title: 'জ্ঞানকর্মসন্ন্যাসযোগ',
      summary: 'জ্ঞান ও কর্মের সমন্বয় এবং যোগের বিভিন্ন পদ্ধতি।'
    },
    {
      chapter: '৫ম অধ্যায়',
      title: 'কর্মসন্ন্যাসযোগ',
      summary: 'কর্মত্যাগ ও কর্মযোগের মধ্যে পার্থক্য এবং সমন্বয়।'
    },
    {
      chapter: '৬ষ্ঠ অধ্যায়',
      title: 'ধ্যানযোগ',
      summary: 'ধ্যান ও যোগের মাধ্যমে আত্মসংযমের শিক্ষা।'
    },
    {
      chapter: '৭ম অধ্যায়',
      title: 'জ্ঞানবিজ্ঞানযোগ',
      summary: 'ঈশ্বরের প্রকৃতি ও ভক্তির মাধ্যমে ঈশ্বরলাভের পথ।'
    },
    {
      chapter: '৮ম অধ্যায়',
      title: 'অক্ষরব্রহ্মযোগ',
      summary: 'পরমাত্মার ধ্যান ও মৃত্যুকালে ঈশ্বরের স্মরণ।'
    },
    {
      chapter: '৯ম অধ্যায়',
      title: 'রাজবিদ্যারাজগুহ্যযোগ',
      summary: 'ঈশ্বরের সর্বব্যাপীতা ও ভক্তির মহিমা।'
    },
    {
      chapter: '১০ম অধ্যায়',
      title: 'বিভূতিযোগ',
      summary: 'ঈশ্বরের ঐশ্বর্য ও মহিমার বর্ণনা।'
    },
    {
      chapter: '১১শ অধ্যায়',
      title: 'বিশ্বরূপদর্শনযোগ',
      summary: 'কৃষ্ণের বিশ্বরূপ দর্শন ও অর্জুনের ভয়ভীতি।'
    },
    {
      chapter: '১২শ অধ্যায়',
      title: 'ভক্তিযোগ',
      summary: 'ভক্তিযোগের শ্রেষ্ঠত্ব ও ভক্তের গুণাবলী।'
    },
    {
      chapter: '১৩শ অধ্যায়',
      title: 'ক্ষেত্রক্ষেত্রজ্ঞবিভাগযোগ',
      summary: 'ক্ষেত্র ও ক্ষেত্রজ্ঞের পার্থক্য এবং প্রকৃতির গুণ।'
    },
    {
      chapter: '১৪শ অধ্যায়',
      title: 'গুণত্রয়বিভাগযোগ',
      summary: 'সত্ত্ব, রজঃ ও তমঃ গুণের বর্ণনা ও মুক্তির পথ।'
    },
    {
      chapter: '১৫শ অধ্যায়',
      title: 'পুরুষোত্তমযোগ',
      summary: 'অশ্বত্থ বৃক্ষের রূপক ও পরমাত্মার স্বরূপ।'
    },
    {
      chapter: '১৬শ অধ্যায়',
      title: 'দৈবাসুরসম্পদবিভাগযোগ',
      summary: 'দৈবী ও আসুরী প্রকৃতির পার্থক্য।'
    },
    {
      chapter: '১৭শ অধ্যায়',
      title: 'শ্রদ্ধাত্রয়বিভাগযোগ',
      summary: 'তিন প্রকার শ্রদ্ধা ও তপস্যার বর্ণনা।'
    },
    {
      chapter: '১৮শ অধ্যায়',
      title: 'মোক্ষসন্ন্যাসযোগ',
      summary: 'গীতার সারসংক্ষেপ ও মোক্ষলাভের উপায়।'
    }
  ];

  return (
    <ThemedView variant="primary" style={styles.container}>
      <WavePattern 
        width={width} 
        height={height} 
      />
      
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SIZES.icon.lg} color={theme.icon.primary} />
        </TouchableOpacity>
        <ThemedBengaliText 
          variant="primary" 
          size="title" 
          fontFamily="begumZia"
          style={styles.title}
        >
          গীতার সারাংশ
        </ThemedBengaliText>
        <ThemedView style={styles.placeholder} />
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction Card */}
        <ThemedCard style={styles.introCard}>
          <ThemedBengaliText 
            variant="primary" 
            size="large" 
            fontFamily="begumZia"
            style={styles.introTitle}
          >
            শ্রীমদ্ভগবদ্গীতার সারসংক্ষেপ
          </ThemedBengaliText>
          <ThemedBengaliText 
            variant="secondary" 
            size="medium" 
            fontFamily="mahinSameya"
            style={styles.introText}
          >
            গীতা হল ১৮টি অধ্যায়ে বিভক্ত একটি পবিত্র গ্রন্থ। প্রতিটি অধ্যায়ে রয়েছে জীবনের বিভিন্ন দিক সম্পর্কে গভীর শিক্ষা। এখানে প্রতিটি অধ্যায়ের মূল বিষয়বস্তুর সংক্ষিপ্ত বিবরণ দেওয়া হয়েছে।
          </ThemedBengaliText>
        </ThemedCard>

        {/* Summary Cards */}
        {summaryData.map((item, index) => (
          <ThemedCard key={index} style={styles.summaryCard}>
            <ThemedView style={styles.cardHeader}>
              <ThemedView style={[styles.chapterIndicator, { backgroundColor: theme.background.quaternary }]}>
                <ThemedBengaliText 
                  variant="primary"
                  size="small"
                  fontFamily="begumZia"
                  style={styles.chapterNumber}
                >
                  {item.chapter}
                </ThemedBengaliText>
              </ThemedView>
              <ThemedBengaliText 
                variant="primary" 
                size="large" 
                fontFamily="begumZia"
                style={styles.chapterTitle}
              >
                {item.title}
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedBengaliText 
              variant="secondary"
              size="medium"
              fontFamily="mahinSameya"
              style={styles.summaryText}
            >
              {item.summary}
            </ThemedBengaliText>
          </ThemedCard>
        ))}

        {/* Conclusion Card */}
        <ThemedCard style={styles.conclusionCard}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
            <ThemedBengaliText 
              variant="primary" 
              size="xl" 
              fontFamily="benSen"
              style={styles.sectionTitle}
            >
              গীতার মূল শিক্ষা
            </ThemedBengaliText>
          </ThemedView>
          
          <ThemedView style={styles.teachingsList}>
            <ThemedView style={styles.teachingItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.teachingText}
              >
                নিষ্কাম কর্মের মাধ্যমে আধ্যাত্মিক উন্নতি
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedView style={styles.teachingItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.teachingText}
              >
                ভক্তিযোগের মাধ্যমে ঈশ্বরলাভ
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedView style={styles.teachingItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.teachingText}
              >
                আত্মার অমরত্ব ও ঈশ্বরের সর্বব্যাপীতা
              </ThemedBengaliText>
            </ThemedView>
            
            <ThemedView style={styles.teachingItem}>
              <ThemedView style={[styles.bulletPoint, { backgroundColor: theme.background.quaternary }]} />
              <ThemedBengaliText 
                variant="secondary"
                size="medium"
                fontFamily="mahinSameya"
                style={styles.teachingText}
              >
                জীবনের সকল পরিস্থিতিতে ধর্ম পালন
              </ThemedBengaliText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.xl,
    paddingTop: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.sm,
  },
  backButton: {
    padding: SIZES.spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.spacing.lg,
    paddingBottom: SIZES.spacing.xl,
  },
  introCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  introTitle: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.md,
  },
  introText: {
    textAlign: 'center',
    lineHeight: SIZES.spacing.xl,
  },
  summaryCard: {
    marginBottom: SIZES.spacing.md,
    padding: SIZES.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
    gap: SIZES.spacing.md,
  },
  chapterIndicator: {
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: SIZES.spacing.xs,
    borderRadius: SIZES.radius.sm,
  },
  chapterNumber: {
    color: '#FFFFFF',
  },
  chapterTitle: {
    flex: 1,
  },
  summaryText: {
    lineHeight: SIZES.spacing.lg,
  },
  conclusionCard: {
    marginBottom: SIZES.spacing.lg,
    padding: SIZES.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  sectionIndicator: {
    width: SIZES.borderSize.xxl,
    height: SIZES.spacing.xxxl,
    borderRadius: SIZES.radius.sm,
    marginRight: SIZES.spacing.md,
  },
  sectionTitle: {
    flex: 1,
  },
  teachingsList: {
    gap: SIZES.spacing.md,
  },
  teachingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SIZES.spacing.md,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: SIZES.radius.round,
    marginTop: SIZES.spacing.sm,
  },
  teachingText: {
    flex: 1,
    lineHeight: SIZES.spacing.lg,
  },
});
