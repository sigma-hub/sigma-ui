import { type VariantProps, cva } from 'class-variance-authority';

export { default as Field } from './Field.vue';
export { default as FieldContent } from './FieldContent.vue';
export { default as FieldDescription } from './FieldDescription.vue';
export { default as FieldError } from './FieldError.vue';
export { default as FieldGroup } from './FieldGroup.vue';
export { default as FieldLabel } from './FieldLabel.vue';
export { default as FieldLegend } from './FieldLegend.vue';
export { default as FieldSeparator } from './FieldSeparator.vue';
export { default as FieldSet } from './FieldSet.vue';
export { default as FieldTitle } from './FieldTitle.vue';

export const fieldVariants = cva(
  'sigma-ui-field',
  {
    variants: {
      orientation: {
        vertical: 'sigma-ui-field--vertical',
        horizontal: 'sigma-ui-field--horizontal',
        responsive: 'sigma-ui-field--responsive',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);

export type FieldVariants = VariantProps<typeof fieldVariants>;

export type FieldErrorItem = string | { message?: string } | undefined;
