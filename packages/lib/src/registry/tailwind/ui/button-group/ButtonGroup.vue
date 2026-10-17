<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
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
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
