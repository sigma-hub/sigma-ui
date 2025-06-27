<script setup lang="ts">
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'reka-ui';

const props = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div class="sigma-ui-navigation-menu-viewport-wrapper">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      class="sigma-ui-navigation-menu-viewport"
      :class="$attrs.class"
    />
  </div>
</template>

<style>
.sigma-ui-navigation-menu-viewport-wrapper {
  position: absolute;
  left: 0;
  top: 100%;
  display: flex;
  justify-content: center;
}

.sigma-ui-navigation-menu-viewport {
  position: relative;
  margin-top: 0.375rem;
  height: var(--reka-navigation-menu-viewport-height);
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transform-origin: top center;
}

@media (min-width: 768px) {
  .sigma-ui-navigation-menu-viewport {
    width: var(--reka-navigation-menu-viewport-width);
  }
}

.sigma-ui-navigation-menu-viewport[data-state="open"] {
  animation: navigationMenuViewportIn 0.2s ease;
}

.sigma-ui-navigation-menu-viewport[data-state="closed"] {
  animation: navigationMenuViewportOut 0.2s ease;
}

@keyframes navigationMenuViewportIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes navigationMenuViewportOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>
