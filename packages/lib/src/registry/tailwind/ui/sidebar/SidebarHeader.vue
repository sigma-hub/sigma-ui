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
   * Header content, such as a team switcher or a search input.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="sidebar-header"
    data-sidebar="header"
    :class="cn('flex flex-col gap-2 p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
