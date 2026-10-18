<script setup lang="ts">
import { useAttrs } from 'vue';

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
    v-bind="delegatedAttrs()"
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
  margin-bottom: calc(var(--spacing) * 2);
}

.sigma-ui-empty-media svg {
  flex-shrink: 0;
  pointer-events: none;
}

.sigma-ui-empty-media--icon {
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  border-radius: var(--radius-lg);
  background-color: var(--muted);
  color: var(--foreground);
}

.sigma-ui-empty-media--icon svg {
  width: calc(var(--spacing) * 6);
  height: calc(var(--spacing) * 6);
}
</style>
