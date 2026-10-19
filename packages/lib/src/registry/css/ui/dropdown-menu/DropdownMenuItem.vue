<script setup lang="ts">
import { useAttrs } from 'vue';

import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuItemProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-item"
    :class="[{ 'sigma-ui-dropdown-menu-item--inset': inset }, $attrs.class]"
  >
    <slot />
  </DropdownMenuItem>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-dropdown-menu-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
    cursor: default;
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    transition: background-color 150ms ease, color 150ms ease;
    user-select: none;
  }

  .sigma-ui-dropdown-menu-item--inset {
    padding-left: calc(var(--spacing) * 8);
  }

  .sigma-ui-dropdown-menu-item:focus {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-dropdown-menu-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
