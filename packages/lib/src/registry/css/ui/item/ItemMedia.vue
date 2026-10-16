<script setup lang="ts">
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
  gap: 0.5rem;
}

.sigma-ui-item-media svg {
  pointer-events: none;
}

.sigma-ui-item:has([data-slot="item-description"]) .sigma-ui-item-media {
  align-self: flex-start;
  transform: translateY(0.125rem);
}

.sigma-ui-item-media--icon {
  width: 2rem;
  height: 2rem;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 4px);
  background-color: hsl(var(--muted));
}

.sigma-ui-item-media--icon svg {
  width: 1rem;
  height: 1rem;
}

.sigma-ui-item-media--image {
  overflow: hidden;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: calc(var(--radius) - 4px);
}

.sigma-ui-item-media--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
