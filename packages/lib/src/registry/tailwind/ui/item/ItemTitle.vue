<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Primary text of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-title"
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
