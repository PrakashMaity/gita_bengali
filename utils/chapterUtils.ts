// Chapter ID mapping for navigation
export const CHAPTER_IDS = {
  'sb7f0K9D': 1,  // Chapter 1
  'CN4CamSP': 2,  // Chapter 2
  'ZyxsCQ8y': 3,  // Chapter 3
  'FZhzKF2r': 4,  // Chapter 4
  'iMRUJjoy': 5,  // Chapter 5
  'U9PFZzMc': 6,  // Chapter 6
  '7TBDS2pV': 7,  // Chapter 7
  'DOpqjvYE': 8,  // Chapter 8
  'vyC0zjx3': 9,  // Chapter 9
  'u6f4oOoR': 10, // Chapter 10
  'IpasB0Y8': 11, // Chapter 11
} as const;

// Reverse mapping: chapter number to ID
export const CHAPTER_NUMBERS_TO_IDS = {
  1: 'sb7f0K9D',
  2: 'CN4CamSP',
  3: 'ZyxsCQ8y',
  4: 'FZhzKF2r',
  5: 'iMRUJjoy',
  6: 'U9PFZzMc',
  7: '7TBDS2pV',
  8: 'DOpqjvYE',
  9: 'vyC0zjx3',
  10: 'u6f4oOoR',
  11: 'IpasB0Y8',
} as const;

export type ChapterId = keyof typeof CHAPTER_IDS;
export type ChapterNumber = keyof typeof CHAPTER_NUMBERS_TO_IDS;

/**
 * Get chapter number from chapter ID
 */
export function getChapterNumberFromId(chapterId: string): number | null {
  return CHAPTER_IDS[chapterId as ChapterId] || null;
}

/**
 * Get chapter ID from chapter number
 */
export function getChapterIdFromNumber(chapterNumber: number): string | null {
  return CHAPTER_NUMBERS_TO_IDS[chapterNumber as ChapterNumber] || null;
}

/**
 * Check if a chapter ID is valid
 */
export function isValidChapterId(chapterId: string): boolean {
  return chapterId in CHAPTER_IDS;
}

/**
 * Get all chapter IDs
 */
export function getAllChapterIds(): string[] {
  return Object.keys(CHAPTER_IDS);
}

/**
 * Get all chapter numbers
 */
export function getAllChapterNumbers(): number[] {
  return Object.values(CHAPTER_IDS);
}

/**
 * Get next chapter ID
 */
export function getNextChapterId(currentChapterId: string): string | null {
  const currentNumber = getChapterNumberFromId(currentChapterId);
  if (currentNumber === null || currentNumber >= 11) {
    return null;
  }
  return getChapterIdFromNumber(currentNumber + 1);
}

/**
 * Get previous chapter ID
 */
export function getPreviousChapterId(currentChapterId: string): string | null {
  const currentNumber = getChapterNumberFromId(currentChapterId);
  if (currentNumber === null || currentNumber <= 1) {
    return null;
  }
  return getChapterIdFromNumber(currentNumber - 1);
}
