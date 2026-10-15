<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `EmptyHeader`, `EmptyMedia`, and `EmptyContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty"
    :class="cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-border p-6 text-center text-balance md:p-12', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
