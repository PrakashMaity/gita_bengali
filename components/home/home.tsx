import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { MenuItem } from '@/constants/menuData';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { ThemedButton } from '../ui/ThemedButton';
import MenuGrid from './MenuGrid';
import { getNavigationHandler } from './navigationHandlers';


const Home = () => {
  const theme = useThemeColors();
  const { width, height } = Dimensions.get('window');

  const handleMenuItemPress = (item: MenuItem) => {
    const handler = getNavigationHandler(item);
    handler();
  };

  return (
    <ThemedView variant='primary' style={styles.container}>
      <WavePattern 
        width={width} 
        height={height} 
      />
      
      <ThemedCard variant='transparent' style={styles.headerCard}>
        <Image source={require('@/assets/images/Home/logo.png')} style={styles.logo} />
        <ThemedBengaliText
          variant="primary"
          size="title"
          fontFamily="benSen"
        >
        শ্রীমদ্ভগবদ্গীতা
        </ThemedBengaliText>
       
        <ThemedView style={styles.headerActions}>
        
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <FontAwesome name="bell-o" size={SIZES.icon.lg} color={theme.icon.primary} />
          </ThemedView>
        </ThemedView>
      </ThemedCard>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
      <ThemedCard variant='primary' style={styles.heroCard}>
        <ThemedView style={styles.heroContainer}>
          <Image source={require('@/assets/images/Home/hero.png')} resizeMode='cover' style={styles.heroImage} />
          <ThemedView style={styles.textOverlay}>
            <ThemedBengaliText 
              variant="primary" 
              size="xxl" 
              fontFamily="mahinSameya"
              style={styles.overlayText}
            >
              &ldquo;কর্মণ্যেবাধিকারের্তে মা ফলেষু কদাচন।
            </ThemedBengaliText>
            <ThemedBengaliText 
              variant="primary" 
              size="xxl" 
              fontFamily="mahinSameya"
              style={styles.overlayText}
            >
              মা কর্মফলহেতুর্ভূর্মা তে সংঘোস্ত্বকর্মণি॥&rdquo;
            </ThemedBengaliText>
          </ThemedView>
        </ThemedView>
      </ThemedCard>

      <ThemedCard variant='transparent' style={styles.quickActionsCard}>
        <ThemedButton
          title="গীতার সারাংশ"
          onPress={() => getNavigationHandler({ id: 'gita-summary' } as MenuItem)()}
          variant="primary"
          size="md"
          fullWidth
          icon={<FontAwesome6 name="book-bookmark" size={SIZES.icon.lg} color={theme.button.primary.text} />}
        />
        <ThemedButton
          title="গীতার মাহাত্ম্য"
          onPress={() => getNavigationHandler({ id: 'gita-mahatmya' } as MenuItem)()}
          variant="secondary"
          size="md"
          fullWidth
          icon={<FontAwesome5 name="book" size={SIZES.icon.lg} color={theme.button.secondary.text} />}
        />
      </ThemedCard>
        <MenuGrid onMenuItemPress={handleMenuItemPress} />
      </ScrollView>
    </ThemedView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  
  },
  logo: {
    width: 64,
    height: 64,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    borderWidth: 1,
    padding: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    margin: 16,
    marginBottom: 8,
  },
  heroContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayText: {
    textAlign: 'center',
    marginBottom: SIZES.spacing.sm,

    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.spacing.xl,
  },
  quickActionsCard: {
    flexDirection: 'row',
    gap: SIZES.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: SIZES.spacing.lg,
    marginTop: SIZES.spacing.sm,
    marginBottom: SIZES.spacing.sm,
  },
});

export default Home;