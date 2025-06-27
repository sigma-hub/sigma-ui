import { type VariantProps, cva } from 'class-variance-authority';

export { default as Image } from './Image.vue';

export const imageVariants = cva(
  'w-full h-full animate-fade-in flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary/30',
  {
    variants: {
      shape: {
        rounded: 'rounded-md [&_img]:rounded-md',
        circle: 'rounded-full [&_img]:rounded-full',
      },
    },
    defaultVariants: {
      shape: 'rounded',
    },
  },
);

export type ImageVariants = VariantProps<typeof imageVariants>;
