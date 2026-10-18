<script setup lang="ts">
import { useAttrs } from 'vue';

import { type ItemMediaVariants, itemMediaVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :data-variant="props.variant"
    :class="[itemMediaVariants({ variant: props.variant }), $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-media {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-item-media svg {
  pointer-events: none;
}

.sigma-ui-item:has([data-slot="item-description"]) .sigma-ui-item-media {
  align-self: flex-start;
  transform: translateY(0.125rem);
}

.sigma-ui-item-media--icon {
  width: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 8);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) - 4px);
  background-color: var(--muted);
}

.sigma-ui-item-media--icon svg {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.sigma-ui-item-media--image {
  overflow: hidden;
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  border-radius: calc(var(--radius) - 4px);
}

.sigma-ui-item-media--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
