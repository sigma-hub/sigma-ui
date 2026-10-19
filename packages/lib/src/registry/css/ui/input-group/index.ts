import { type VariantProps, cva } from 'class-variance-authority';

export { default as InputGroup } from './InputGroup.vue';
export { default as InputGroupAddon } from './InputGroupAddon.vue';
export { default as InputGroupButton } from './InputGroupButton.vue';
export { default as InputGroupInput } from './InputGroupInput.vue';
export { default as InputGroupText } from './InputGroupText.vue';
export { default as InputGroupTextarea } from './InputGroupTextarea.vue';

export const inputGroupAddonVariants = cva(
  'sigma-ui-input-group-addon',
  {
    variants: {
      align: {
        'inline-start': 'sigma-ui-input-group-addon--inline-start',
        'inline-end': 'sigma-ui-input-group-addon--inline-end',
        'block-start': 'sigma-ui-input-group-addon--block-start',
        'block-end': 'sigma-ui-input-group-addon--block-end',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>;

export const inputGroupButtonVariants = cva(
  'sigma-ui-input-group-button',
  {
    variants: {
      size: {
        'xs': 'sigma-ui-input-group-button--xs',
        'sm': 'sigma-ui-input-group-button--sm',
        'icon-xs': 'sigma-ui-input-group-button--icon-xs',
        'icon-sm': 'sigma-ui-input-group-button--icon-sm',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>;
