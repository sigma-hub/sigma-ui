<script setup lang="ts">
import { cn } from '@ui/utils';
import { type ButtonGroupVariants, buttonGroupVariants } from '.';

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
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
