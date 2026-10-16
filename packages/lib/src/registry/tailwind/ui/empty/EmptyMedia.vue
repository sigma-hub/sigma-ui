<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
import { type EmptyMediaVariants, emptyMediaVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    data-slot="empty-icon"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
