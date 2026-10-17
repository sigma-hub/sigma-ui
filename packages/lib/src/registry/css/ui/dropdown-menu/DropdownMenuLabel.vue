<script setup lang="ts">
import { useAttrs } from 'vue';

import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-label"
    :class="[{ 'sigma-ui-dropdown-menu-label--inset': inset }, $attrs.class]"
    data-slot="dropdown-menu-label"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<style>
.sigma-ui-dropdown-menu-label {
  padding: 0.375rem 0.5rem;
  color: var(--foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.sigma-ui-dropdown-menu-label--inset {
  padding-left: 2rem;
}
</style>
