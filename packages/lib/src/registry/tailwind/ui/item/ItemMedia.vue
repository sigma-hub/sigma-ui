<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
import { type ItemMediaVariants, itemMediaVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    data-slot="item-media"
    :data-variant="props.variant"
    :class="cn(itemMediaVariants({ variant: props.variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
