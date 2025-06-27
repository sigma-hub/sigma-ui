import { type VariantProps, cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'sigma-ui-badge',
  {
    variants: {
      variant: {
        default: 'sigma-ui-badge--default',
        secondary: 'sigma-ui-badge--secondary',
        destructive: 'sigma-ui-badge--destructive',
        outline: 'sigma-ui-badge--outline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
