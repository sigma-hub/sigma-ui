<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { navigationMenuTriggerStyle } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NavigationMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-navigation-menu-trigger"
    :class="[navigationMenuTriggerStyle(), $attrs.class]"
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
  height: calc(var(--spacing) * 10);
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  border-radius: var(--radius);
  background-color: var(--background);
  font-size: 0.875rem;
  font-weight: 500;
  transition-duration: 150ms;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-navigation-menu-trigger__base:hover {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-navigation-menu-trigger__base:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  outline: none;
}

.sigma-ui-navigation-menu-trigger__base:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-navigation-menu-trigger__base[data-active] {
  background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
}

.sigma-ui-navigation-menu-trigger__base[data-state="open"] {
  background-color: color-mix(in oklch, var(--secondary) 50%, transparent);
}

.sigma-ui-navigation-menu-trigger__icon {
  position: relative;
  top: 1px;
  width: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 3);
  margin-left: calc(var(--spacing) * 1);
  transition: transform 0.2s;
}

.sigma-ui-navigation-menu-trigger__icon[data-state="open"] {
  transform: rotate(180deg);
}
</style>
