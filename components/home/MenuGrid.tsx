import { ThemedCard } from '@/components/ui/ThemedCard/ThemedCard';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { MenuItem, menuSections } from '@/constants/menuData';
import { SIZES } from '@/constants/sizes';
import { useThemeColors } from '@/hooks/useTheme';
import { FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface MenuGridProps {
  onMenuItemPress?: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ onMenuItemPress }) => {
  const theme = useThemeColors();

  const renderIcon = (item: MenuItem) => {
    const iconProps = {
      name: item.iconName as any,
      size: SIZES.icon.lg,
      color: theme.icon.primary,
    };

    switch (item.iconFamily) {
      case 'FontAwesome5':
        return <FontAwesome5 {...iconProps} />;
      case 'FontAwesome6':
        return <FontAwesome6 {...iconProps} />;
      case 'MaterialIcons':
        return <MaterialIcons {...iconProps} />;
      case 'Ionicons':
        return <Ionicons {...iconProps} />;
      default:
        return <MaterialIcons {...iconProps} />;
    }
  };

  const handleItemPress = (item: MenuItem) => {
    if (onMenuItemPress) {
      onMenuItemPress(item);
    } else if (item.action) {
      item.action();
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      style={styles.menuItemContainer}
      activeOpacity={0.8}
    >
      <ThemedCard style={[styles.menuItem, { 
        borderColor: theme.border.primary,
        backgroundColor: theme.background.card,
        shadowColor: theme.text.primary,
      }]}>
        <ThemedView style={[styles.iconContainer, { 
          backgroundColor: theme.background.tertiary,
          shadowColor: theme.text.primary,
        }]}>
          {renderIcon(item)}
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText 
            style={{...styles.menuItemTitle, color: theme.text.primary}}
          >
            {item.title}
          </ThemedText>
          {item.description && (
            <ThemedText 
              style={{...styles.menuItemDescription, color: theme.text.secondary}}
            >
              {item.description}
            </ThemedText>
          )}
        </ThemedView>
        <ThemedView style={[styles.arrowContainer, { backgroundColor: theme.background.quaternary }]}>
          <MaterialIcons 
            name="arrow-forward-ios" 
            size={SIZES.icon.sm} 
            color={theme.icon.quaternary} 
          />
        </ThemedView>
      </ThemedCard>
    </TouchableOpacity>
  );

  const renderSection = (section: typeof menuSections[0]) => (
    <ThemedView key={section.id} style={styles.section}>
      <ThemedView style={styles.sectionHeader}>
        <ThemedView style={[styles.sectionIndicator, { backgroundColor: theme.background.quaternary }]} />
        <ThemedText 
          style={{...styles.sectionTitle, color: theme.text.primary}}
        >
          {section.title}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.menuContainer}>
        {section.items.map(renderMenuItem)}
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {menuSections.map(renderSection)}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.lg,
  },
  section: {
    marginBottom: SIZES.spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
    paddingHorizontal: SIZES.spacing.sm,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    borderRadius: SIZES.radius.sm,
    marginRight: SIZES.spacing.md,
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontFamily: 'BenSenHandwriting',
    flex: 1,
  },
  menuContainer: {
    // gap: SIZES.spacing.md,
  },
  menuItemContainer: {
    // marginBottom: SIZES.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
    borderRadius: SIZES.radius.xl,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.spacing.lg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    fontFamily: 'BenSenHandwriting',
    marginBottom: SIZES.spacing.xs,
    lineHeight: 22,
  },
  menuItemDescription: {
    fontSize: SIZES.sm,
    lineHeight: 18,
    opacity: 0.8,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.spacing.sm,
  },
});

export default MenuGrid;
