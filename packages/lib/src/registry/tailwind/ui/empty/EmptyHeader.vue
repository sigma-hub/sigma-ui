<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `EmptyMedia`, `EmptyTitle`, and `EmptyDescription`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-header"
    :class="cn('flex max-w-sm flex-col items-center gap-2 text-center', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
