import { ErrorBoundary } from '@/components/ErrorBoundary';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { useChapterStore } from '@/store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../hooks/useTheme';


export default function RootLayout() {
  const isOnboardingComplete = true;
  const { loadAllChapters } = useChapterStore();
  const [loaded, error] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'BenSenHandwriting': require('../assets/fonts/BenSenHandwriting.ttf'),
    'MahinDhakaItalic': require('../assets/fonts/MahinDhakaItalic.ttf'),
    'BegumZiaRegulaCurve': require('../assets/fonts/BegumZiaRegulaCurve.ttf'),
    'FNMahinSameyaANSI': require('../assets/fonts/FNMahinSameyaANSI.ttf'),
  });

  // Initialize chapter data when app starts
  useEffect(() => {
    loadAllChapters();
  }, [loadAllChapters]);


  if (error) {
    console.error('Font loading error:', error);
  }

  if (!loaded) {
    return null;
  }
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <ThemedSafeAreaView>
            <ThemedView variant='secondary' style={{ flex: 1 }}>
             
              <Stack screenOptions={{
                headerShown: false,
              }}>
                <Stack.Protected guard={!isOnboardingComplete} >
                  <Stack.Screen name="index" />
                </Stack.Protected>
                <Stack.Protected guard={isOnboardingComplete} >
                  <Stack.Screen name="(tabs)" />
                </Stack.Protected>
              </Stack>
            </ThemedView>
          </ThemedSafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
