<script setup lang="ts">
import { useAttrs } from 'vue';

import { type ButtonGroupVariants, buttonGroupVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface ButtonGroupProps {
  /**
   * Direction in which the buttons are joined.
   */
  orientation?: ButtonGroupVariants['orientation'];
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
});

defineSlots<{
  /**
   * Buttons, inputs, `ButtonGroupText`, `ButtonGroupSeparator`, or nested `ButtonGroup` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="[buttonGroupVariants({ orientation: props.orientation }), $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-button-group {
  display: flex;
  width: fit-content;
  align-items: stretch;
}

.sigma-ui-button-group > :focus-visible {
  position: relative;
  z-index: 10;
}

.sigma-ui-button-group > input {
  flex: 1;
}

.sigma-ui-button-group:has(> .sigma-ui-button-group) {
  gap: 0.5rem;
}

.sigma-ui-button-group--horizontal > :not(:first-child) {
  border-left-width: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.sigma-ui-button-group--horizontal > :not(:last-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.sigma-ui-button-group--vertical {
  flex-direction: column;
}

.sigma-ui-button-group--vertical > :not(:first-child) {
  border-top-width: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.sigma-ui-button-group--vertical > :not(:last-child) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
