<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type ItemVariants, itemVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface ItemProps extends PrimitiveProps {
  /**
   * Surface of the row.
   */
  variant?: ItemVariants['variant'];
  /**
   * Padding and gap of the row.
   */
  size?: ItemVariants['size'];
}

const props = withDefaults(defineProps<ItemProps>(), {
  as: 'div',
  variant: 'default',
  size: 'default',
});

defineSlots<{
  /**
   * Media, content, and actions for one row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    data-slot="item"
    :data-variant="props.variant"
    :data-size="props.size"
    :as="as"
    :as-child="asChild"
    :class="[itemVariants({ variant: props.variant, size: props.size }), $attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  outline: none;
  transition: background-color 0.1s, color 0.1s;
}

.sigma-ui-item:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-item a:hover {
  background-color: color-mix(in oklch, var(--accent) 50%, transparent);
}

.sigma-ui-item--outline {
  border-color: var(--border);
}

.sigma-ui-item--muted {
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}

.sigma-ui-item--size-default {
  padding: 1rem;
  gap: 1rem;
}

.sigma-ui-item--size-sm {
  padding: 0.75rem 1rem;
  gap: 0.625rem;
}
</style>
