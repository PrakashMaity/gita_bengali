import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { WavePattern } from '@/illustration/cardBackground';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';


const Home = () => {
  const theme = useThemeColors();
  const { width, height } = Dimensions.get('window');

 
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
      
      <ThemedCard variant='primary' >
        <Image source={require('@/assets/images/Home/hero.png')} resizeMode='cover' style={styles.heroImage} />
      </ThemedCard>
      <ThemedCard style={{flexDirection:'row',gap:SIZES.spacing.md,alignItems:'center',justifyContent:'space-between'}}>
        <ThemedButton
          title="গীতার সারাংশ"
          onPress={() => console.log('গীতার সারাংশ pressed')}
          variant="primary"
          size="lg"
          fullWidth
          icon={<FontAwesome6 name="book-bookmark" size={SIZES.icon.xl} color={theme.button.primary.text} />}
        />
        <ThemedButton
          title="গীতা-মাহাত্ম্য"
          onPress={() => console.log('গীতা-মাহাত্ম্য pressed')}
          variant="primary"
          size="lg"
          fullWidth
          icon={<FontAwesome5 name="book" size={SIZES.icon.xl} color={theme.button.primary.text} />}
        />
      </ThemedCard>
    
     
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
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  textCard: {
    margin: 16,
    marginTop: 8,
    padding: 16,
  },
  bengaliText: {
    fontFamily: 'BenSenHandwriting',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
  },
});

export default Home;