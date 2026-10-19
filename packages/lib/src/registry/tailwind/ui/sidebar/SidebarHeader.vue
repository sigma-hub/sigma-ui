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
   * Header content, such as a team switcher or a search input.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-header"
    v-bind="delegatedAttrs()"
    data-sidebar="header"
    :class="cn('flex flex-col gap-2 p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
