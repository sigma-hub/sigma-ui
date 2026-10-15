<script setup lang="ts">
import { cn } from '@ui/utils';
import { type EmptyMediaVariants, emptyMediaVariants } from '.';

interface EmptyMediaProps {
  /**
   * `icon` draws a muted tile behind the icon. `default` leaves the content unstyled.
   */
  variant?: EmptyMediaVariants['variant'];
}

defineProps<EmptyMediaProps>();

defineSlots<{
  /**
   * Icon or illustration.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-icon"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
