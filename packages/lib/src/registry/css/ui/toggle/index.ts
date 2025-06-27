import { type VariantProps, cva } from 'class-variance-authority';

export { default as Toggle } from './Toggle.vue';

export const toggleVariants = cva(
  'sigma-ui-toggle',
  {
    variants: {
      variant: {
        default: 'sigma-ui-toggle--default',
        outline: 'sigma-ui-toggle--outline',
      },
      size: {
        default: 'sigma-ui-toggle--size-default',
        sm: 'sigma-ui-toggle--size-sm',
        lg: 'sigma-ui-toggle--size-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
