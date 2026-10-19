<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    data-slot="kbd-group"
    v-bind="delegatedAttrs()"
    :class="cn('inline-flex items-center gap-1', $attrs.class ?? '')"
  >
    <slot />
  </kbd>
</template>
