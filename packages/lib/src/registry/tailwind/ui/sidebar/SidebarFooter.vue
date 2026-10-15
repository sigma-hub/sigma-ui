<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Footer content, such as a user menu.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    :class="cn('flex flex-col gap-2 p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
