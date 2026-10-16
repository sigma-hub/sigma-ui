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
   * A `SidebarMenuSubButton`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    v-bind="delegatedAttrs"
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    :class="cn('group/menu-sub-item relative', $attrs.class ?? '')"
  >
    <slot />
  </li>
</template>
