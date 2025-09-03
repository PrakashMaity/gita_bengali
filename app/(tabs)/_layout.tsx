  import { BookmarkIcon } from '@/components/ui/BookmarkIcon';
import { SIZES } from '@/constants/sizes';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.icon.primary,
        tabBarInactiveTintColor: theme.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.background.primary,
          borderTopColor: theme.border.primary,
          borderTopWidth: SIZES.borderSize.md,
          height: SIZES.header.md,
          paddingBottom: SIZES.spacing.sm,
          paddingTop: SIZES.spacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: SIZES.sm,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'হোম',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chapters"
        options={{
          title: 'অধ্যায়',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'list' : 'list-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          title: 'অডিও',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'headset' : 'headset-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'বুকমার্ক',
          tabBarIcon: ({ color, size, focused }) => (
            <BookmarkIcon 
              size={size} 
              color={color} 
              focused={focused}
              showBadge={true}
              badgeSize="small"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'প্রোফাইল',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
