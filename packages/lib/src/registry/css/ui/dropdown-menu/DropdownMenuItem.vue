<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui';

const props = defineProps<DropdownMenuItemProps & { inset?: boolean }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    class="sigma-ui-dropdown-menu-item"
    :class="[{ 'sigma-ui-dropdown-menu-item--inset': inset }]"
  >
    <slot />
  </DropdownMenuItem>
</template>

<style>
.sigma-ui-dropdown-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;
  user-select: none;
}

.sigma-ui-dropdown-menu-item--inset {
  padding-left: 2rem;
}

.sigma-ui-dropdown-menu-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-dropdown-menu-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
