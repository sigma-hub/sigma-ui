import { type VariantProps, cva } from 'class-variance-authority';

export { default as ButtonGroup } from './ButtonGroup.vue';

export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue';

export { default as ButtonGroupText } from './ButtonGroupText.vue';

export const buttonGroupVariants = cva(
  'sigma-ui-button-group',
  {
    variants: {
      orientation: {
        horizontal: 'sigma-ui-button-group--horizontal',
        vertical: 'sigma-ui-button-group--vertical',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
