<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<TabsTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    class="sigma-ui-tabs-trigger"
  >
    <slot />
  </TabsTrigger>
</template>

<style>
.sigma-ui-tabs-trigger {
  display: inline-flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--radius-sm);
  padding-inline: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-tabs-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}

.sigma-ui-tabs-trigger:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-tabs-trigger[data-state="active"] {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
