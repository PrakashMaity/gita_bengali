// Interface for letter configuration
interface LetterConfig {
  letterSvg?: string;
  fullSvg?: string;
  fallbackPath: () => any;
}

// Simplified letter configurations without Skia dependencies
export const CapitalLetters: Record<string, LetterConfig> = {
  A: {
    fullSvg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 150 400 L 200 200 L 250 400 M 170 320 L 230 320" 
            stroke="black" stroke-width="20" fill="none"/>
    </svg>`,
    letterSvg: "M 150 400 L 200 200 L 250 400 M 170 320 L 230 320",
    fallbackPath: () => ({ type: 'letter', letter: 'A' })
  },
  B: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 220 200 220 220 Q 220 240 200 240 L 150 240 M 150 240 L 200 240 Q 220 240 220 260 Q 220 280 200 280 L 150 280 M 150 280 L 200 280 Q 220 280 220 300 Q 220 320 200 320 L 150 320",
    fallbackPath: () => ({ type: 'letter', letter: 'B' })
  },
  C: {
    letterSvg: "M 250 200 A 80 80 0 0 0 250 360 A 80 80 0 0 0 250 200",
    fallbackPath: () => ({ type: 'letter', letter: 'C' })
  },
  D: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'D' })
  },
  E: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 250 200 M 150 300 L 220 300 M 150 400 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'E' })
  },
  F: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 250 200 M 150 300 L 220 300",
    fallbackPath: () => ({ type: 'letter', letter: 'F' })
  },
  G: {
    letterSvg: "M 250 200 A 80 80 0 0 0 250 360 A 80 80 0 0 0 250 200 M 250 300 L 330 300",
    fallbackPath: () => ({ type: 'letter', letter: 'G' })
  },
  H: {
    letterSvg: "M 150 200 L 150 400 M 250 200 L 250 400 M 150 300 L 250 300",
    fallbackPath: () => ({ type: 'letter', letter: 'H' })
  },
  I: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 400 L 220 400",
    fallbackPath: () => ({ type: 'letter', letter: 'I' })
  },
  J: {
    letterSvg: "M 250 200 L 250 350 A 50 50 0 0 1 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'J' })
  },
  K: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 250 200 M 150 300 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'K' })
  },
  L: {
    letterSvg: "M 150 200 L 150 400 M 150 400 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'L' })
  },
  M: {
    letterSvg: "M 150 400 L 150 200 L 200 300 L 250 200 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'M' })
  },
  N: {
    letterSvg: "M 150 400 L 150 200 L 250 400 L 250 200",
    fallbackPath: () => ({ type: 'letter', letter: 'N' })
  },
  O: {
    fullSvg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="280" r="80" stroke="black" stroke-width="20" fill="none"/>
    </svg>`,
    letterSvg: "M 200 200 A 80 80 0 0 1 200 360 A 80 80 0 0 1 200 200",
    fallbackPath: () => ({ type: 'letter', letter: 'O' })
  },
  P: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'P' })
  },
  Q: {
    letterSvg: "M 200 200 A 80 80 0 0 1 200 360 A 80 80 0 0 1 200 200 M 250 350 L 280 380",
    fallbackPath: () => ({ type: 'letter', letter: 'Q' })
  },
  R: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400 M 200 300 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'R' })
  },
  S: {
    letterSvg: "M 250 200 A 60 60 0 0 0 190 200 A 60 60 0 0 1 250 300 A 60 60 0 0 0 190 300 A 60 60 0 0 1 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'S' })
  },
  T: {
    letterSvg: "M 150 200 L 350 200 M 250 200 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'T' })
  },
  U: {
    letterSvg: "M 150 200 L 150 350 A 50 50 0 0 0 200 400 L 250 400 A 50 50 0 0 0 300 350 L 300 200",
    fallbackPath: () => ({ type: 'letter', letter: 'U' })
  },
  V: {
    letterSvg: "M 150 200 L 225 400 L 300 200",
    fallbackPath: () => ({ type: 'letter', letter: 'V' })
  },
  W: {
    letterSvg: "M 150 200 L 200 350 L 250 250 L 300 350 L 350 200",
    fallbackPath: () => ({ type: 'letter', letter: 'W' })
  },
  X: {
    letterSvg: "M 150 200 L 300 400 M 150 400 L 300 200",
    fallbackPath: () => ({ type: 'letter', letter: 'X' })
  },
  Y: {
    letterSvg: "M 150 200 L 225 300 L 300 200 M 225 300 L 225 400",
    fallbackPath: () => ({ type: 'letter', letter: 'Y' })
  },
  Z: {
    letterSvg: "M 150 200 L 300 200 M 300 200 L 150 400 M 150 400 L 300 400",
    fallbackPath: () => ({ type: 'letter', letter: 'Z' })
  }
};

// All lowercase letters a-z
export const LowercaseLetters: Record<string, LetterConfig> = {
  a: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 200 360 L 260 360",
    fallbackPath: () => ({ type: 'letter', letter: 'a' })
  },
  b: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'b' })
  },
  c: {
    letterSvg: "M 250 300 A 60 60 0 0 0 190 300 A 60 60 0 0 0 250 360",
    fallbackPath: () => ({ type: 'letter', letter: 'c' })
  },
  d: {
    letterSvg: "M 250 200 L 250 400 M 200 300 L 250 300 Q 300 300 300 350 Q 300 400 250 400 L 200 400",
    fallbackPath: () => ({ type: 'letter', letter: 'd' })
  },
  e: {
    letterSvg: "M 190 300 A 60 60 0 0 1 250 300 A 60 60 0 0 1 190 360 M 190 330 L 250 330",
    fallbackPath: () => ({ type: 'letter', letter: 'e' })
  },
  f: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 300 L 220 300",
    fallbackPath: () => ({ type: 'letter', letter: 'f' })
  },
  g: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 200 360 L 260 360 M 200 420 L 200 450",
    fallbackPath: () => ({ type: 'letter', letter: 'g' })
  },
  h: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'h' })
  },
  i: {
    letterSvg: "M 200 200 L 200 350 M 200 180 L 200 190",
    fallbackPath: () => ({ type: 'letter', letter: 'i' })
  },
  j: {
    letterSvg: "M 200 200 L 200 350 A 30 30 0 0 1 170 380 L 150 380",
    fallbackPath: () => ({ type: 'letter', letter: 'j' })
  },
  k: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 250 M 150 300 L 200 350",
    fallbackPath: () => ({ type: 'letter', letter: 'k' })
  },
  l: {
    letterSvg: "M 200 200 L 200 400 M 200 400 L 220 400",
    fallbackPath: () => ({ type: 'letter', letter: 'l' })
  },
  m: {
    letterSvg: "M 150 400 L 150 300 L 200 350 L 250 300 L 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 'm' })
  },
  n: {
    letterSvg: "M 150 400 L 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'n' })
  },
  o: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300",
    fallbackPath: () => ({ type: 'letter', letter: 'o' })
  },
  p: {
    letterSvg: "M 150 300 L 150 450 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => ({ type: 'letter', letter: 'p' })
  },
  q: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 250 350 L 280 380",
    fallbackPath: () => ({ type: 'letter', letter: 'q' })
  },
  r: {
    letterSvg: "M 150 300 L 150 400 M 150 300 L 200 300 Q 220 300 220 320 Q 220 340 200 340 L 150 340",
    fallbackPath: () => ({ type: 'letter', letter: 'r' })
  },
  s: {
    letterSvg: "M 250 300 A 50 50 0 0 0 200 300 A 50 50 0 0 1 250 350 A 50 50 0 0 0 200 350 A 50 50 0 0 1 250 400",
    fallbackPath: () => ({ type: 'letter', letter: 's' })
  },
  t: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 300 L 220 300",
    fallbackPath: () => ({ type: 'letter', letter: 't' })
  },
  u: {
    letterSvg: "M 150 300 L 150 400 A 50 50 0 0 0 200 450 L 250 450 A 50 50 0 0 0 300 400 L 300 300",
    fallbackPath: () => ({ type: 'letter', letter: 'u' })
  },
  v: {
    letterSvg: "M 150 300 L 225 400 L 300 300",
    fallbackPath: () => ({ type: 'letter', letter: 'v' })
  },
  w: {
    letterSvg: "M 150 300 L 200 400 L 250 350 L 300 400 L 350 300",
    fallbackPath: () => ({ type: 'letter', letter: 'w' })
  },
  x: {
    letterSvg: "M 150 300 L 300 400 M 150 400 L 300 300",
    fallbackPath: () => ({ type: 'letter', letter: 'x' })
  },
  y: {
    letterSvg: "M 150 300 L 225 400 L 300 300 M 225 400 L 225 450",
    fallbackPath: () => ({ type: 'letter', letter: 'y' })
  },
  z: {
    letterSvg: "M 150 300 L 300 300 M 300 300 L 150 400 M 150 400 L 300 400",
    fallbackPath: () => ({ type: 'letter', letter: 'z' })
  }
};

// Combined object with all letters
export const AllLetters = {
  ...CapitalLetters,
  ...LowercaseLetters
};

// Helper function to get letter config
export const getLetterConfig = (letter: string): LetterConfig | null => {
  const config = AllLetters[letter];
  return config || null;
};

// Helper function to get available letters
export const getAvailableLetters = (): string[] => {
  return Object.keys(AllLetters);
};