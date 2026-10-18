<script setup lang="ts">
import { useAttrs } from 'vue';

import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-label"
    :class="[{ 'sigma-ui-context-menu-label--inset': inset }, $attrs.class]"
  >
    <slot />
  </ContextMenuLabel>
</template>

<style>
.sigma-ui-context-menu-label {
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  color: var(--foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.sigma-ui-context-menu-label--inset {
  padding-left: calc(var(--spacing) * 8);
}
</style>
