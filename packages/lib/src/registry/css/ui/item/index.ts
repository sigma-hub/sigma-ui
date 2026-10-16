import { type VariantProps, cva } from 'class-variance-authority';

export { default as Item } from './Item.vue';
export { default as ItemActions } from './ItemActions.vue';
export { default as ItemContent } from './ItemContent.vue';
export { default as ItemDescription } from './ItemDescription.vue';
export { default as ItemFooter } from './ItemFooter.vue';
export { default as ItemGroup } from './ItemGroup.vue';
export { default as ItemHeader } from './ItemHeader.vue';
export { default as ItemMedia } from './ItemMedia.vue';
export { default as ItemSeparator } from './ItemSeparator.vue';
export { default as ItemTitle } from './ItemTitle.vue';

export const itemVariants = cva(
  'sigma-ui-item',
  {
    variants: {
      variant: {
        default: 'sigma-ui-item--default',
        outline: 'sigma-ui-item--outline',
        muted: 'sigma-ui-item--muted',
      },
      size: {
        default: 'sigma-ui-item--size-default',
        sm: 'sigma-ui-item--size-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const itemMediaVariants = cva(
  'sigma-ui-item-media',
  {
    variants: {
      variant: {
        default: 'sigma-ui-item-media--default',
        icon: 'sigma-ui-item-media--icon',
        image: 'sigma-ui-item-media--image',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
