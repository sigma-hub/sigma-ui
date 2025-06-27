import { type VariantProps, cva } from 'class-variance-authority';

export { default as Avatar } from './Avatar.vue';

export const avatarVariants = cva(
  'sigma-ui-avatar',
  {
    variants: {
      size: {
        xs: 'sigma-ui-avatar--xs',
        sm: 'sigma-ui-avatar--sm',
        base: 'sigma-ui-avatar--base',
        lg: 'sigma-ui-avatar--lg',
      },
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
