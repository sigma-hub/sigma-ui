<script setup lang="ts">
import { type EmptyMediaVariants, emptyMediaVariants } from '.';

interface EmptyMediaProps {
  /**
   * `icon` draws a muted tile behind the icon. `default` leaves the content unstyled.
   */
  variant?: EmptyMediaVariants['variant'];
}

const props = defineProps<EmptyMediaProps>();

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
    :data-variant="props.variant"
    :class="[emptyMediaVariants({ variant: props.variant }), $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-media {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.sigma-ui-empty-media svg {
  flex-shrink: 0;
  pointer-events: none;
}

.sigma-ui-empty-media--icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-lg);
  background-color: var(--muted);
  color: var(--foreground);
}

.sigma-ui-empty-media--icon svg {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
