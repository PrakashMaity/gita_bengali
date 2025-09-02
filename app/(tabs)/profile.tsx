import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <ThemedView variant="primary" style={styles.container}>  
      <ScrollView style={styles.scrollContainer}>
        <ThemedView variant="primary" style={styles.container}>
          <ThemedText style={{ ...styles.title, color: theme.icon.primary }}>
            প্রোফাইল (Profile)
          </ThemedText>
          <ThemedText style={{ ...styles.subtitle, color: theme.text.secondary }}>
            Your account and settings
          </ThemedText>
          
          {/* Settings Section */}
          <ThemedView style={styles.settingsSection}>
            <ThemedText style={{ ...styles.sectionTitle, color: theme.text.primary }}>
              সেটিংস (Settings)
            </ThemedText>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* More settings can be added here */}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  settingsSection: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle background for settings
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});
