import { MenuItem } from '@/constants/menuData';
import { router } from 'expo-router';

// Navigation handlers for different menu items
export const navigationHandlers = {
  // Prayer and Stotra handlers
  mangalacharan: () => {
    console.log('Navigating to মঙ্গলাচরণ screen');
    router.push('/mangalacharan');
  },
  
  dhyana: () => {
    console.log('Navigating to ধ্যান screen');
    router.push('/dhyana');
  },
  
  stotra: () => {
    console.log('Navigating to স্তোত্র screen');
    // Add navigation logic here
  },
  
  // Chapter handlers
  allChapters: () => {
    console.log('Navigating to সকল অধ্যায় screen');
    router.push('/(tabs)/chapters');
  },
  
  // Translation handlers
  allTranslations: () => {
    console.log('Navigating to বাংলা অনুবাদ screen');
    router.push('/translations');
  },
  
  chapterList: () => {
    console.log('Navigating to অধ্যায় তালিকা screen');
    // Add navigation logic here
  },
  
  randomChapter: () => {
    console.log('Navigating to এলোমেলো অধ্যায় screen');
    // Add navigation logic here
  },
  
  // Feature handlers
  bookmarks: () => {
    console.log('Navigating to বুকমার্ক screen');
    router.push('/(tabs)/bookmarks');
  },
  
  favorites: () => {
    console.log('Navigating to প্রিয় শ্লোক screen');
    router.push('/favorites');
  },
  
  notes: () => {
    console.log('Navigating to নোট screen');
    // Add navigation logic here
  },
  
  search: () => {
    console.log('Navigating to অনুসন্ধান screen');
    // Add navigation logic here
  },
  
  // Study handlers
  dailyReading: () => {
    console.log('Navigating to দৈনিক পাঠ screen');
    // Add navigation logic here
  },
  
  progress: () => {
    console.log('Navigating to অগ্রগতি screen');
    // Add navigation logic here
  },
  
  quiz: () => {
    console.log('Navigating to কুইজ screen');
    // Add navigation logic here
  },
  
  // Settings handlers
  fontSettings: () => {
    console.log('Navigating to ফন্ট সেটিংস screen');
    // Add navigation logic here
  },
  
  audioSettings: () => {
    console.log('Navigating to অডিও সেটিংস screen');
    // Add navigation logic here
  },
  
  help: () => {
    console.log('Navigating to সহায়তা screen');
    // Add navigation logic here
  },
  
  about: () => {
    console.log('Navigating to আমাদের সম্পর্কে screen');
    // Add navigation logic here
  },
  
  // New handlers for home page buttons
  gitaSummary: () => {
    console.log('Navigating to গীতার সারাংশ screen');
    router.push('/gita-summary');
  },
  
  gitaMahatmya: () => {
    console.log('Navigating to গীতা-মাহাত্ম্য screen');
    router.push('/gita-mahatmya');
  },
};

// Helper function to get the appropriate handler for a menu item
export const getNavigationHandler = (item: MenuItem) => {
  const handlerMap: Record<string, () => void> = {
    'mangalacharan': navigationHandlers.mangalacharan,
    'dhyana': navigationHandlers.dhyana,
    'stotra': navigationHandlers.stotra,
    'all-chapters': navigationHandlers.allChapters,
    'all-translations': navigationHandlers.allTranslations,
    'chapter-list': navigationHandlers.chapterList,
    'random-chapter': navigationHandlers.randomChapter,
    'bookmarks': navigationHandlers.bookmarks,
    'favorites': navigationHandlers.favorites,
    'notes': navigationHandlers.notes,
    'search': navigationHandlers.search,
    'daily-reading': navigationHandlers.dailyReading,
    'progress': navigationHandlers.progress,
    'quiz': navigationHandlers.quiz,
    'font-settings': navigationHandlers.fontSettings,
    'audio-settings': navigationHandlers.audioSettings,
    'help': navigationHandlers.help,
    'about': navigationHandlers.about,
    'gita-summary': navigationHandlers.gitaSummary,
    'gita-mahatmya': navigationHandlers.gitaMahatmya,
  };
  
  return handlerMap[item.id] || (() => console.log(`No handler found for ${item.id}`));
};
