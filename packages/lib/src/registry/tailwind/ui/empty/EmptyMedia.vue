<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
import { type EmptyMediaVariants, emptyMediaVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
