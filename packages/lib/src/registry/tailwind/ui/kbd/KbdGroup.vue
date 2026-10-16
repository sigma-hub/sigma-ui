<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    v-bind="delegatedAttrs"
    data-slot="kbd-group"
    :class="cn('inline-flex items-center gap-1', $attrs.class ?? '')"
  >
    <slot />
  </kbd>
</template>
