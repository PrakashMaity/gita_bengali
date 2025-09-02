import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  iconName: string;
  iconFamily: 'FontAwesome5' | 'FontAwesome6' | 'MaterialIcons' | 'Ionicons';
  description?: string;
  route?: string;
  action?: () => void;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    id: 'prayers',
    title: 'প্রার্থনা ও স্তোত্র',
    items: [
      {
        id: 'mangalacharan',
        title: 'মঙ্গলাচরণ',
        icon: MaterialIcons,
        iconName: 'favorite',
        iconFamily: 'MaterialIcons',
        description: 'গীতা পাঠের পূর্বে মঙ্গলাচরণ',
        action: () => console.log('মঙ্গলাচরণ pressed'),
      },
      {
        id: 'dhyana',
        title: 'ধ্যান',
        icon: MaterialIcons,
        iconName: 'self-improvement',
        iconFamily: 'MaterialIcons',
        description: 'ধ্যান ও চিন্তন',
        action: () => console.log('ধ্যান pressed'),
      },
    
    ],
  },
  {
    id: 'chapters',
    title: 'অধ্যায়সমূহ',
    items: [
      {
        id: 'all-chapters',
        title: 'সকল অধ্যায়',
        icon: FontAwesome6,
        iconName: 'book-bookmark',
        iconFamily: 'FontAwesome6',
        description: 'সমস্ত ১৮টি অধ্যায়',
        action: () => console.log('সকল অধ্যায় pressed'),
      },
     
    ],
  },
  {
    id: 'features',
    title: 'বিশেষ বৈশিষ্ট্য',
    items: [
      {
        id: 'bookmarks',
        title: 'বুকমার্ক',
        icon: MaterialIcons,
        iconName: 'bookmark',
        iconFamily: 'MaterialIcons',
        description: 'সংরক্ষিত শ্লোক ও অধ্যায়',
        action: () => console.log('বুকমার্ক pressed'),
      },
      {
        id: 'favorites',
        title: 'প্রিয় শ্লোক',
        icon: MaterialIcons,
        iconName: 'favorite',
        iconFamily: 'MaterialIcons',
        description: 'আপনার প্রিয় শ্লোকসমূহ',
        action: () => console.log('প্রিয় শ্লোক pressed'),
      },
      
    ],
  },
  
];
