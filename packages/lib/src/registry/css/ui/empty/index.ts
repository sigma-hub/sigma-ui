import { type VariantProps, cva } from 'class-variance-authority';

export { default as Empty } from './Empty.vue';
export { default as EmptyContent } from './EmptyContent.vue';
export { default as EmptyDescription } from './EmptyDescription.vue';
export { default as EmptyHeader } from './EmptyHeader.vue';
export { default as EmptyMedia } from './EmptyMedia.vue';
export { default as EmptyTitle } from './EmptyTitle.vue';

export const emptyMediaVariants = cva(
  'sigma-ui-empty-media',
  {
    variants: {
      variant: {
        default: 'sigma-ui-empty-media--default',
        icon: 'sigma-ui-empty-media--icon',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;
