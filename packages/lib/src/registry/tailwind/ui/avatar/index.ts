import { type VariantProps, cva } from 'class-variance-authority';

export { default as Avatar } from './Avatar.vue';

export const avatarVariants = cva(
  'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-10 w-10 text-xs',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl',
      },
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
