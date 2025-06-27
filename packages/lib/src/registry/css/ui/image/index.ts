import { type VariantProps, cva } from 'class-variance-authority';

export { default as Image } from './Image.vue';

export const imageVariants = cva(
  'sigma-ui-image',
  {
    variants: {
      shape: {
        rounded: 'sigma-ui-image-rounded',
        circle: 'sigma-ui-image-circle',
      },
    },
  },
);

export type ImageVariants = VariantProps<typeof imageVariants>;
