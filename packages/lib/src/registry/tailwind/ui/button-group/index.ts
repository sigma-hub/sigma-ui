import { type VariantProps, cva } from 'class-variance-authority';

export { default as ButtonGroup } from './ButtonGroup.vue';
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue';
export { default as ButtonGroupText } from './ButtonGroupText.vue';

export const buttonGroupVariants = cva(
  'flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>input]:flex-1 has-[>[data-slot=button-group]]:gap-2',
  {
    variants: {
      orientation: {
        horizontal: '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical: 'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
