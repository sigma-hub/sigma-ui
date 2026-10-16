<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Title and description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-content"
    :class="cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
