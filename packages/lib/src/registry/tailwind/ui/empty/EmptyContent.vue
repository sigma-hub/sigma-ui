<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-content"
    :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
