<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Content that spans the full width under the row body.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-footer"
    :class="cn('flex basis-full items-center justify-between gap-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
