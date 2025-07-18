<script setup lang="ts">
import { NavigationMenuIndicator, type NavigationMenuIndicatorProps, useForwardProps } from 'reka-ui';

const props = defineProps<NavigationMenuIndicatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuIndicator
    v-bind="forwardedProps"
    class="sigma-ui-navigation-menu-indicator"
  >
    <div class="sigma-ui-navigation-menu-indicator__pointer" />
  </NavigationMenuIndicator>
</template>

<style>
.sigma-ui-navigation-menu-indicator {
  position: relative;
  z-index: 1;
  top: 100%;
  display: flex;
  overflow: hidden;
  height: 0.375rem;
  align-items: flex-end;
  justify-content: center;
}

.sigma-ui-navigation-menu-indicator[data-state="visible"] {
  animation: navigation-menu-indicator-in 0.2s ease;
}

.sigma-ui-navigation-menu-indicator[data-state="hidden"] {
  animation: navigation-menu-indicator-out 0.2s ease;
}

.sigma-ui-navigation-menu-indicator__pointer {
  position: relative;
  top: 60%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: hsl(var(--border));
  border-top-left-radius: 0.125rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%);
  transform: rotate(45deg);
}

@keyframes navigation-menu-indicator-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes navigation-menu-indicator-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
