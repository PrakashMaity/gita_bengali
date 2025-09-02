import { ThemedBengaliText } from '@/components/ui/ThemedBengaliText/ThemedBengaliText';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { MenuItem } from '@/constants/menuData';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { ThemedButton } from '../ui/ThemedButton';
import MenuGrid from './MenuGrid';


const Home = () => {
  const theme = useThemeColors();
  const { width, height } = Dimensions.get('window');

  const handleMenuItemPress = (item: MenuItem) => {
    console.log(`${item.title} pressed`);
    // Add navigation logic here
    if (item.action) {
      item.action();
    }
  };

  return (
    <ThemedView variant='primary' style={styles.container}>
      <WavePattern 
        width={width} 
        height={height} 
      />
      
      <ThemedCard style={styles.headerCard}>
        <Image source={require('@/assets/images/Home/logo.png')} style={styles.logo} />
        <ThemedView style={styles.headerActions}>
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <Feather name="volume-2" size={24} color={theme.icon.primary} />
          </ThemedView>
          <ThemedView style={[styles.actionButton, { borderColor: theme.border.primary }]}>
            <FontAwesome name="bell-o" size={24} color={theme.icon.primary} />
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
              size="large" 
              fontFamily="begumZia"
              style={styles.overlayText}
            >
              &ldquo;কর্মণ্যেবাধিকারের্তে মা ফলেষু কদাচন।
            </ThemedBengaliText>
            <ThemedBengaliText 
              variant="primary" 
              size="large" 
              fontFamily="begumZia"
              style={styles.overlayText}
            >
              মা কর্মফলহেতুর্ভূর্মা তে সংঘোস্ত্বকর্মণি॥&rdquo;
            </ThemedBengaliText>
          </ThemedView>
        </ThemedView>
      </ThemedCard>

     
         <ThemedCard style={{flexDirection:'row',gap:SIZES.spacing.md,alignItems:'center',justifyContent:'space-between'}}>
        <ThemedButton
          title="গীতার সারাংশ"
          onPress={() => console.log('গীতার সারাংশ pressed')}
          variant="primary"
          size="md"
          fullWidth
          icon={<FontAwesome6 name="book-bookmark" size={SIZES.icon.xl} color={theme.button.primary.text} />}
        />
        <ThemedButton
          title="গীতা-মাহাত্ম্য"
          onPress={() => console.log('গীতা-মাহাত্ম্য pressed')}
          variant="primary"
          size="md"
          fullWidth
          icon={<FontAwesome5 name="book" size={SIZES.icon.xl} color={theme.button.primary.text} />}
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
    margin: 16,
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
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
    height: 200,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayText: {
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.spacing.xl,
  },
});

export default Home;