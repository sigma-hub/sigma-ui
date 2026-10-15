<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Short title of the empty state.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-title"
    :class="cn('text-lg font-medium tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
