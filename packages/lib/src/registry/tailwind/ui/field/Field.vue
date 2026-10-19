<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
import { type FieldVariants, fieldVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    data-slot="field"
    v-bind="delegatedAttrs()"
    role="group"
    :data-orientation="props.orientation"
    :data-invalid="props.invalid || undefined"
    :data-disabled="props.disabled || undefined"
    :class="cn(fieldVariants({ orientation: props.orientation }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
