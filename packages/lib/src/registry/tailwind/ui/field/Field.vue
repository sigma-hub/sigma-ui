<script setup lang="ts">
import { cn } from '@ui/utils';
import { type FieldVariants, fieldVariants } from '.';

interface FieldProps {
  /**
   * Layout of the label and the control. `responsive` switches from vertical to horizontal when the parent `FieldGroup` is wide enough.
   */
  orientation?: FieldVariants['orientation'];
  /**
   * Marks the field as invalid and colors its label and description.
   */
  invalid?: boolean;
  /**
   * Dims the label to match a disabled control.
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<FieldProps>(), {
  orientation: 'vertical',
  invalid: false,
  disabled: false,
});

defineSlots<{
  /**
   * Field parts: `FieldLabel`, the control, `FieldDescription`, and `FieldError`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :data-orientation="props.orientation"
    :data-invalid="props.invalid || undefined"
    :data-disabled="props.disabled || undefined"
    :class="cn(fieldVariants({ orientation: props.orientation }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
