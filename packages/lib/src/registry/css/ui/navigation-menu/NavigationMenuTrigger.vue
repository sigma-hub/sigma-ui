<script setup lang="ts">
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { navigationMenuTriggerStyle } from '.';

const props = defineProps<NavigationMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    class="sigma-ui-navigation-menu-trigger"
    :class="[navigationMenuTriggerStyle()]"
  >
    <slot />
    <ChevronDownIcon
      class="sigma-ui-navigation-menu-trigger__icon"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>

<style>
.sigma-ui-navigation-menu-trigger {
  position: relative;
}

.sigma-ui-navigation-menu-trigger__base {
  display: inline-flex;
  height: 2.5rem;
  width: max-content;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background-color: hsl(var(--background));
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-navigation-menu-trigger__base:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-navigation-menu-trigger__base:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  outline: none;
}

.sigma-ui-navigation-menu-trigger__base:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-navigation-menu-trigger__base[data-active] {
  background-color: hsl(var(--accent) / 0.5);
}

.sigma-ui-navigation-menu-trigger__base[data-state="open"] {
  background-color: hsl(var(--accent) / 0.5);
}

.sigma-ui-navigation-menu-trigger__icon {
  position: relative;
  top: 1px;
  margin-left: 0.25rem;
  height: 0.75rem;
  width: 0.75rem;
  transition: transform 0.2s;
}

.sigma-ui-navigation-menu-trigger__icon[data-state="open"] {
  transform: rotate(180deg);
}
</style>
