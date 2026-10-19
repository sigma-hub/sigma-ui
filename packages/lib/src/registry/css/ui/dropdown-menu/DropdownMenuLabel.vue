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
    data-slot="dropdown-menu-label"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-label"
    :class="[{ 'sigma-ui-dropdown-menu-label--inset': inset }, $attrs.class]"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-dropdown-menu-label {
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    color: var(--foreground);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  .sigma-ui-dropdown-menu-label--inset {
    padding-left: calc(var(--spacing) * 8);
  }
}
</style>
