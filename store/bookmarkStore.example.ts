/**
 * Bookmark Store Usage Examples
 * 
 * This file demonstrates how to use the global bookmark store in your components.
 * The store provides a centralized way to manage bookmarks with secure storage.
 */

import { useBookmarkStore } from './bookmarkStore';

// Example 1: Basic usage in a component
export function ExampleBookmarkComponent() {
  const { 
    bookmarks, 
    addBookmark, 
    removeBookmark, 
    isBookmarked,
    isLoading 
  } = useBookmarkStore();

  // Check if a specific verse is bookmarked
  const handleCheckBookmark = (verseId: string) => {
    return isBookmarked(verseId);
  };

  // Add a bookmark
  const handleAddBookmark = async (verseId: string, chapterNumber: number, verseNumber: number, verseText: string) => {
    try {
      await addBookmark(verseId, chapterNumber, verseNumber, verseText);
      console.log('Bookmark added successfully');
    } catch (error) {
      console.error('Failed to add bookmark:', error);
    }
  };

  // Remove a bookmark
  const handleRemoveBookmark = async (verseId: string) => {
    try {
      await removeBookmark(verseId);
      console.log('Bookmark removed successfully');
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  return {
    bookmarks,
    isLoading,
    handleCheckBookmark,
    handleAddBookmark,
    handleRemoveBookmark,
  };
}

// Example 2: Using utility functions
export function ExampleBookmarkUtilities() {
  const { 
    getBookmarkCount, 
    getBookmarksByChapter, 
    getBookmarksSortedByDate,
    clearAllBookmarks 
  } = useBookmarkStore();

  // Get total bookmark count
  const totalBookmarks = getBookmarkCount();

  // Get bookmarks for a specific chapter
  const chapter1Bookmarks = getBookmarksByChapter(1);

  // Get all bookmarks sorted by date (newest first)
  const recentBookmarks = getBookmarksSortedByDate();

  // Clear all bookmarks (use with caution!)
  const handleClearAll = async () => {
    try {
      await clearAllBookmarks();
      console.log('All bookmarks cleared');
    } catch (error) {
      console.error('Failed to clear bookmarks:', error);
    }
  };

  return {
    totalBookmarks,
    chapter1Bookmarks,
    recentBookmarks,
    handleClearAll,
  };
}

// Example 3: React component using the store
export function BookmarkCounter() {
  const { getBookmarkCount } = useBookmarkStore();
  const count = getBookmarkCount();

  return (
    <div>
      <p>Total Bookmarks: {count}</p>
    </div>
  );
}

/**
 * Key Features of the Bookmark Store:
 * 
 * 1. Secure Storage: Uses Expo Secure Store for encrypted storage
 * 2. Global State: Accessible from any component using useBookmarkStore()
 * 3. Automatic Persistence: Bookmarks are automatically saved and restored
 * 4. Type Safety: Full TypeScript support with proper interfaces
 * 5. Loading States: Built-in loading state management
 * 6. Utility Functions: Helper functions for common operations
 * 
 * Available Actions:
 * - addBookmark(verseId, chapterNumber, verseNumber, verseText)
 * - removeBookmark(verseId)
 * - isBookmarked(verseId)
 * - getBookmarksByChapter(chapterNumber)
 * - clearAllBookmarks()
 * - getBookmarkCount()
 * - getBookmarksSortedByDate()
 * 
 * State:
 * - bookmarks: Array of all bookmarks
 * - isLoading: Boolean indicating if an operation is in progress
 */
