import { Skia } from "@shopify/react-native-skia";

// Interface for letter configuration
interface LetterConfig {
  letterSvg?: string;
  fullSvg?: string;
  fallbackPath: () => any;
}

// All capital letters A-Z
export const CapitalLetters: Record<string, LetterConfig> = {
  A: {
    fullSvg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M 150 400 L 200 200 L 250 400 M 170 320 L 230 320" 
            stroke="black" stroke-width="20" fill="none"/>
    </svg>`,
    letterSvg: "M 150 400 L 200 200 L 250 400 M 170 320 L 230 320",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 400);
      path.lineTo(200, 200);
      path.lineTo(250, 400);
      path.moveTo(170, 320);
      path.lineTo(230, 320);
      return path;
    }
  },
  B: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 220 200 220 220 Q 220 240 200 240 L 150 240 M 150 240 L 200 240 Q 220 240 220 260 Q 220 280 200 280 L 150 280 M 150 280 L 200 280 Q 220 280 220 300 Q 220 320 200 320 L 150 320",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(200, 200);
      path.quadTo(220, 200, 220, 220);
      path.quadTo(220, 240, 200, 240);
      path.lineTo(150, 240);
      path.moveTo(150, 240);
      path.lineTo(200, 240);
      path.quadTo(220, 240, 220, 260);
      path.quadTo(220, 280, 200, 280);
      path.lineTo(150, 280);
      path.moveTo(150, 280);
      path.lineTo(200, 280);
      path.quadTo(220, 280, 220, 300);
      path.quadTo(220, 320, 200, 320);
      path.lineTo(150, 320);
      return path;
    }
  },
  C: {
    letterSvg: "M 250 200 A 80 80 0 0 0 250 360 A 80 80 0 0 0 250 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addArc(Skia.XYWHRect(170, 200, 160, 160), 0, 180);
      return path;
    }
  },
  D: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(200, 200);
      path.quadTo(250, 200, 250, 300);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  E: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 250 200 M 150 300 L 220 300 M 150 400 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(250, 200);
      path.moveTo(150, 300);
      path.lineTo(220, 300);
      path.moveTo(150, 400);
      path.lineTo(250, 400);
      return path;
    }
  },
  F: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 250 200 M 150 300 L 220 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(250, 200);
      path.moveTo(150, 300);
      path.lineTo(220, 300);
      return path;
    }
  },
  G: {
    letterSvg: "M 250 200 A 80 80 0 0 0 250 360 A 80 80 0 0 0 250 200 M 250 300 L 330 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addArc(Skia.XYWHRect(170, 200, 160, 160), 0, 180);
      path.moveTo(250, 300);
      path.lineTo(330, 300);
      return path;
    }
  },
  H: {
    letterSvg: "M 150 200 L 150 400 M 250 200 L 250 400 M 150 300 L 250 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(250, 200);
      path.lineTo(250, 400);
      path.moveTo(150, 300);
      path.lineTo(250, 300);
      return path;
    }
  },
  I: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 400 L 220 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 400);
      path.moveTo(180, 200);
      path.lineTo(220, 200);
      path.moveTo(180, 400);
      path.lineTo(220, 400);
      return path;
    }
  },
  J: {
    letterSvg: "M 250 200 L 250 350 A 50 50 0 0 1 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(250, 200);
      path.lineTo(250, 350);
      path.addArc(Skia.XYWHRect(150, 350, 100, 100), 0, 90);
      return path;
    }
  },
  K: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 250 200 M 150 300 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 300);
      path.lineTo(250, 200);
      path.moveTo(150, 300);
      path.lineTo(250, 400);
      return path;
    }
  },
  L: {
    letterSvg: "M 150 200 L 150 400 M 150 400 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 400);
      path.lineTo(250, 400);
      return path;
    }
  },
  M: {
    letterSvg: "M 150 400 L 150 200 L 200 300 L 250 200 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 400);
      path.lineTo(150, 200);
      path.lineTo(200, 300);
      path.lineTo(250, 200);
      path.lineTo(250, 400);
      return path;
    }
  },
  N: {
    letterSvg: "M 150 400 L 150 200 L 250 400 L 250 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 400);
      path.lineTo(150, 200);
      path.lineTo(250, 400);
      path.lineTo(250, 200);
      return path;
    }
  },
  O: {
    fullSvg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="280" r="80" stroke="black" stroke-width="20" fill="none"/>
    </svg>`,
    letterSvg: "M 200 200 A 80 80 0 0 1 200 360 A 80 80 0 0 1 200 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(120, 200, 160, 160));
      return path;
    }
  },
  P: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(200, 200);
      path.quadTo(250, 200, 250, 300);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  Q: {
    letterSvg: "M 200 200 A 80 80 0 0 1 200 360 A 80 80 0 0 1 200 200 M 250 350 L 280 380",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(120, 200, 160, 160));
      path.moveTo(250, 350);
      path.lineTo(280, 380);
      return path;
    }
  },
  R: {
    letterSvg: "M 150 200 L 150 400 M 150 200 L 200 200 Q 250 200 250 300 Q 250 400 200 400 L 150 400 M 200 300 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 200);
      path.lineTo(200, 200);
      path.quadTo(250, 200, 250, 300);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      path.moveTo(200, 300);
      path.lineTo(250, 400);
      return path;
    }
  },
  S: {
    letterSvg: "M 250 200 A 60 60 0 0 0 190 200 A 60 60 0 0 1 250 300 A 60 60 0 0 0 190 300 A 60 60 0 0 1 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addArc(Skia.XYWHRect(190, 200, 120, 120), 0, 180);
      path.addArc(Skia.XYWHRect(190, 300, 120, 120), 180, 180);
      return path;
    }
  },
  T: {
    letterSvg: "M 150 200 L 350 200 M 250 200 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(350, 200);
      path.moveTo(250, 200);
      path.lineTo(250, 400);
      return path;
    }
  },
  U: {
    letterSvg: "M 150 200 L 150 350 A 50 50 0 0 0 200 400 L 250 400 A 50 50 0 0 0 300 350 L 300 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 350);
      path.addArc(Skia.XYWHRect(200, 350, 100, 100), 180, 180);
      path.lineTo(300, 200);
      return path;
    }
  },
  V: {
    letterSvg: "M 150 200 L 225 400 L 300 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(225, 400);
      path.lineTo(300, 200);
      return path;
    }
  },
  W: {
    letterSvg: "M 150 200 L 200 350 L 250 250 L 300 350 L 350 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(200, 350);
      path.lineTo(250, 250);
      path.lineTo(300, 350);
      path.lineTo(350, 200);
      return path;
    }
  },
  X: {
    letterSvg: "M 150 200 L 300 400 M 150 400 L 300 200",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(300, 400);
      path.moveTo(150, 400);
      path.lineTo(300, 200);
      return path;
    }
  },
  Y: {
    letterSvg: "M 150 200 L 225 300 L 300 200 M 225 300 L 225 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(225, 300);
      path.lineTo(300, 200);
      path.moveTo(225, 300);
      path.lineTo(225, 400);
      return path;
    }
  },
  Z: {
    letterSvg: "M 150 200 L 300 200 M 300 200 L 150 400 M 150 400 L 300 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(300, 200);
      path.moveTo(300, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 400);
      path.lineTo(300, 400);
      return path;
    }
  }
};

// All lowercase letters a-z
export const LowercaseLetters: Record<string, LetterConfig> = {
  a: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 200 360 L 260 360",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(140, 300, 120, 120));
      path.moveTo(200, 360);
      path.lineTo(260, 360);
      return path;
    }
  },
  b: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 300);
      path.lineTo(200, 300);
      path.quadTo(250, 300, 250, 350);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  c: {
    letterSvg: "M 250 300 A 60 60 0 0 0 190 300 A 60 60 0 0 0 250 360",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addArc(Skia.XYWHRect(190, 300, 120, 120), 0, 180);
      return path;
    }
  },
  d: {
    letterSvg: "M 250 200 L 250 400 M 200 300 L 250 300 Q 300 300 300 350 Q 300 400 250 400 L 200 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(250, 200);
      path.lineTo(250, 400);
      path.moveTo(200, 300);
      path.lineTo(250, 300);
      path.quadTo(300, 300, 300, 350);
      path.quadTo(300, 400, 250, 400);
      path.lineTo(200, 400);
      return path;
    }
  },
  e: {
    letterSvg: "M 190 300 A 60 60 0 0 1 250 300 A 60 60 0 0 1 190 360 M 190 330 L 250 330",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(190, 300, 120, 120));
      path.moveTo(190, 330);
      path.lineTo(250, 330);
      return path;
    }
  },
  f: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 300 L 220 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 400);
      path.moveTo(180, 200);
      path.lineTo(220, 200);
      path.moveTo(180, 300);
      path.lineTo(220, 300);
      return path;
    }
  },
  g: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 200 360 L 260 360 M 200 420 L 200 450",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(140, 300, 120, 120));
      path.moveTo(200, 360);
      path.lineTo(260, 360);
      path.moveTo(200, 420);
      path.lineTo(200, 450);
      return path;
    }
  },
  h: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 300);
      path.lineTo(200, 300);
      path.quadTo(250, 300, 250, 350);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  i: {
    letterSvg: "M 200 200 L 200 350 M 200 180 L 200 190",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 350);
      path.moveTo(200, 180);
      path.lineTo(200, 190);
      return path;
    }
  },
  j: {
    letterSvg: "M 200 200 L 200 350 A 30 30 0 0 1 170 380 L 150 380",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 350);
      path.addArc(Skia.XYWHRect(170, 350, 60, 60), 0, 90);
      return path;
    }
  },
  k: {
    letterSvg: "M 150 200 L 150 400 M 150 300 L 200 250 M 150 300 L 200 350",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 200);
      path.lineTo(150, 400);
      path.moveTo(150, 300);
      path.lineTo(200, 250);
      path.moveTo(150, 300);
      path.lineTo(200, 350);
      return path;
    }
  },
  l: {
    letterSvg: "M 200 200 L 200 400 M 200 400 L 220 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 400);
      path.moveTo(200, 400);
      path.lineTo(220, 400);
      return path;
    }
  },
  m: {
    letterSvg: "M 150 400 L 150 300 L 200 350 L 250 300 L 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 400);
      path.lineTo(150, 300);
      path.lineTo(200, 350);
      path.lineTo(250, 300);
      path.lineTo(250, 400);
      return path;
    }
  },
  n: {
    letterSvg: "M 150 400 L 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 400);
      path.lineTo(150, 300);
      path.lineTo(200, 300);
      path.quadTo(250, 300, 250, 350);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  o: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(140, 300, 120, 120));
      return path;
    }
  },
  p: {
    letterSvg: "M 150 300 L 150 450 M 150 300 L 200 300 Q 250 300 250 350 Q 250 400 200 400 L 150 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(150, 450);
      path.moveTo(150, 300);
      path.lineTo(200, 300);
      path.quadTo(250, 300, 250, 350);
      path.quadTo(250, 400, 200, 400);
      path.lineTo(150, 400);
      return path;
    }
  },
  q: {
    letterSvg: "M 200 300 A 60 60 0 0 1 200 420 A 60 60 0 0 1 200 300 M 250 350 L 280 380",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addOval(Skia.XYWHRect(140, 300, 120, 120));
      path.moveTo(250, 350);
      path.lineTo(280, 380);
      return path;
    }
  },
  r: {
    letterSvg: "M 150 300 L 150 400 M 150 300 L 200 300 Q 220 300 220 320 Q 220 340 200 340 L 150 340",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(150, 400);
      path.moveTo(150, 300);
      path.lineTo(200, 300);
      path.quadTo(220, 300, 220, 320);
      path.quadTo(220, 340, 200, 340);
      path.lineTo(150, 340);
      return path;
    }
  },
  s: {
    letterSvg: "M 250 300 A 50 50 0 0 0 200 300 A 50 50 0 0 1 250 350 A 50 50 0 0 0 200 350 A 50 50 0 0 1 250 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.addArc(Skia.XYWHRect(200, 300, 100, 100), 0, 180);
      path.addArc(Skia.XYWHRect(200, 350, 100, 100), 180, 180);
      return path;
    }
  },
  t: {
    letterSvg: "M 200 200 L 200 400 M 180 200 L 220 200 M 180 300 L 220 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(200, 200);
      path.lineTo(200, 400);
      path.moveTo(180, 200);
      path.lineTo(220, 200);
      path.moveTo(180, 300);
      path.lineTo(220, 300);
      return path;
    }
  },
  u: {
    letterSvg: "M 150 300 L 150 400 A 50 50 0 0 0 200 450 L 250 450 A 50 50 0 0 0 300 400 L 300 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(150, 400);
      path.addArc(Skia.XYWHRect(200, 400, 100, 100), 180, 180);
      path.lineTo(300, 300);
      return path;
    }
  },
  v: {
    letterSvg: "M 150 300 L 225 400 L 300 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(225, 400);
      path.lineTo(300, 300);
      return path;
    }
  },
  w: {
    letterSvg: "M 150 300 L 200 400 L 250 350 L 300 400 L 350 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(200, 400);
      path.lineTo(250, 350);
      path.lineTo(300, 400);
      path.lineTo(350, 300);
      return path;
    }
  },
  x: {
    letterSvg: "M 150 300 L 300 400 M 150 400 L 300 300",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(300, 400);
      path.moveTo(150, 400);
      path.lineTo(300, 300);
      return path;
    }
  },
  y: {
    letterSvg: "M 150 300 L 225 400 L 300 300 M 225 400 L 225 450",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(225, 400);
      path.lineTo(300, 300);
      path.moveTo(225, 400);
      path.lineTo(225, 450);
      return path;
    }
  },
  z: {
    letterSvg: "M 150 300 L 300 300 M 300 300 L 150 400 M 150 400 L 300 400",
    fallbackPath: () => {
      const path = Skia.Path.Make();
      path.moveTo(150, 300);
      path.lineTo(300, 300);
      path.moveTo(300, 300);
      path.lineTo(150, 400);
      path.moveTo(150, 400);
      path.lineTo(300, 400);
      return path;
    }
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
