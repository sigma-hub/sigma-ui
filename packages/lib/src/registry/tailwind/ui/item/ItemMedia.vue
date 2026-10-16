<script setup lang="ts">
import { cn } from '@ui/utils';
import { type ItemMediaVariants, itemMediaVariants } from '.';

interface ItemMediaProps {
  /**
   * `icon` draws a bordered tile, `image` frames a picture, and `default` leaves the content unstyled.
   */
  variant?: ItemMediaVariants['variant'];
}

const props = defineProps<ItemMediaProps>();

defineSlots<{
  /**
   * Icon or image.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-media"
    :data-variant="props.variant"
    :class="cn(itemMediaVariants({ variant: props.variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
