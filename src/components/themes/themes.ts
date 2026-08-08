export const KEY = 'Portfolio.SD';

export const themes = [
  ['null', 'dark null'],
  // ['cartUnI', 'cartUnI dark'],
  'Résumé',
  'Neon',
  'Matrix',
] as const;
export const moreThemes = ['undefined', 'lighter', 'darker', 'Normal', 'Barrel Roll', 'The roof is lava'] as const;

type Flatten<T extends string | readonly string[]> = T extends string ? T : T[number];
export type Theme = Flatten<(typeof themes)[number]> | (typeof moreThemes)[number];
