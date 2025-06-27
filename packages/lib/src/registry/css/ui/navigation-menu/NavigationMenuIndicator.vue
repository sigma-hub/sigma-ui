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
  top: 100%;
  z-index: 1;
  display: flex;
  height: 0.375rem;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.sigma-ui-navigation-menu-indicator[data-state="visible"] {
  animation: navigationMenuIndicatorIn 0.2s ease;
}

.sigma-ui-navigation-menu-indicator[data-state="hidden"] {
  animation: navigationMenuIndicatorOut 0.2s ease;
}

.sigma-ui-navigation-menu-indicator__pointer {
  position: relative;
  top: 60%;
  height: 0.5rem;
  width: 0.5rem;
  transform: rotate(45deg);
  border-top-left-radius: 0.125rem;
  background-color: hsl(var(--border));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

@keyframes navigationMenuIndicatorIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes navigationMenuIndicatorOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
