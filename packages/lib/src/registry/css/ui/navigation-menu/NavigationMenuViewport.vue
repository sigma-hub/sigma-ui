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
  top: 100%;
  left: 0;
  display: flex;
  justify-content: center;
}

.sigma-ui-navigation-menu-viewport {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: var(--reka-navigation-menu-viewport-height);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  margin-top: 0.375rem;
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: hsl(var(--popover));
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  color: hsl(var(--popover-foreground));
  transform-origin: top center;
}

@media (width >= 768px) {
  .sigma-ui-navigation-menu-viewport {
    width: var(--reka-navigation-menu-viewport-width);
  }
}

.sigma-ui-navigation-menu-viewport[data-state="open"] {
  animation: navigation-menu-viewport-in 0.2s ease;
}

.sigma-ui-navigation-menu-viewport[data-state="closed"] {
  animation: navigation-menu-viewport-out 0.2s ease;
}

@keyframes navigation-menu-viewport-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes navigation-menu-viewport-out {
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
