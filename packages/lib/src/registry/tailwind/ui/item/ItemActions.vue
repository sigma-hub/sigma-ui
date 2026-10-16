<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Buttons or other controls at the end of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-actions"
    :class="cn('flex items-center gap-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
