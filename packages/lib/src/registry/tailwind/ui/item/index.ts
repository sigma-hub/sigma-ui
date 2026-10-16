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
  'group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [a]:transition-colors [a]:hover:bg-secondary/50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        default: 'gap-4 p-4',
        sm: 'gap-2.5 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: 'size-8 rounded-sm border border-border bg-muted [&_svg:not([class*=size-])]:size-4',
        image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
