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
  width: max-content;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  background-color: hsl(var(--background));
  font-size: 0.875rem;
  font-weight: 500;
  transition-duration: 150ms;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-navigation-menu-trigger__base[data-active] {
  background-color: hsl(var(--accent) / 50%);
}

.sigma-ui-navigation-menu-trigger__base[data-state="open"] {
  background-color: hsl(var(--accent) / 50%);
}

.sigma-ui-navigation-menu-trigger__icon {
  position: relative;
  top: 1px;
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.25rem;
  transition: transform 0.2s;
}

.sigma-ui-navigation-menu-trigger__icon[data-state="open"] {
  transform: rotate(180deg);
}
</style>
