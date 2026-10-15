export const styleSystems = [
  {
    name: 'tailwind',
    label: 'Tailwind',
  },
  {
    name: 'css',
    label: 'CSS',
  },
] as const;

export type StyleSystem = typeof styleSystems[number]['name'];
