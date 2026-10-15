<script setup lang="ts">
import { cn } from '@ui/utils';

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
    data-sidebar="header"
    :class="cn('flex flex-col gap-2 p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
