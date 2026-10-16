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
   * Main page content rendered next to the sidebar.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <main
    v-bind="delegatedAttrs"
    data-slot="sidebar-inset"
    :class="cn(
      'relative flex w-full flex-1 flex-col bg-background',
      'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </main>
</template>
