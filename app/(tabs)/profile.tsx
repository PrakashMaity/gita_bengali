import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText style={{ ...styles.title, color: theme.icon.primary }}>
          প্রোফাইল (Profile)
        </ThemedText>
        <ThemedText style={{ ...styles.subtitle, color: theme.text.secondary }}>
          Your account and settings
        </ThemedText>
        {/* Profile content will be implemented here */}
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
