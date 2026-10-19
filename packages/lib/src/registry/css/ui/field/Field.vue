<script setup lang="ts">
import { useAttrs } from 'vue';

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
    :class="[fieldVariants({ orientation: props.orientation }), $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-field {
    display: flex;
    width: 100%;
    gap: calc(var(--spacing) * 3);
  }

  .sigma-ui-field[data-invalid="true"] {
    color: var(--destructive);
  }

  .sigma-ui-field--vertical,
  .sigma-ui-field--responsive {
    flex-direction: column;
  }

  .sigma-ui-field--vertical > *,
  .sigma-ui-field--responsive > * {
    width: 100%;
  }

  .sigma-ui-field--horizontal {
    flex-direction: row;
    align-items: center;
  }

  .sigma-ui-field--horizontal > [data-slot="field-label"] {
    flex: auto;
  }

  .sigma-ui-field--horizontal:has(> [data-slot="field-content"]) {
    align-items: flex-start;
  }

  .sigma-ui-field--horizontal:has(> [data-slot="field-content"]) > :is([role="checkbox"], [role="radio"], .sigma-ui-checkbox-wrapper) {
    margin-top: 1px;
  }

  @container field-group (width >= 28rem) {
    .sigma-ui-field.sigma-ui-field--responsive {
      flex-direction: row;
      align-items: center;
    }

    .sigma-ui-field.sigma-ui-field--responsive > * {
      width: auto;
    }

    .sigma-ui-field.sigma-ui-field--responsive > [data-slot="field-label"] {
      flex: auto;
    }

    .sigma-ui-field.sigma-ui-field--responsive:has(> [data-slot="field-content"]) {
      align-items: flex-start;
    }

    .sigma-ui-field.sigma-ui-field--responsive:has(> [data-slot="field-content"]) > :is([role="checkbox"], [role="radio"], .sigma-ui-checkbox-wrapper) {
      margin-top: 1px;
    }
  }
}
</style>
