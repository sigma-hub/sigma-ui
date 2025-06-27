<script setup lang="ts">
import { MenubarTrigger, type MenubarTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<MenubarTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarTrigger
    v-bind="forwardedProps"
    class="sigma-ui-menubar-trigger"
  >
    <slot />
  </MenubarTrigger>
</template>

<style>
.sigma-ui-menubar-trigger {
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sigma-ui-menubar-trigger:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-trigger:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-trigger[data-state="open"] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
</style>
