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
   * Group body, usually a `SidebarMenu`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    v-bind="delegatedAttrs()"
    data-sidebar="group-content"
    :class="cn('w-full text-sm', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
