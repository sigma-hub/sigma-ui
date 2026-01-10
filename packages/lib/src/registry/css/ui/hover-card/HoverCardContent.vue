<script setup lang="ts">
import {
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardPortal,
  useForwardProps,
} from 'reka-ui';

const props = withDefaults(
  defineProps<HoverCardContentProps>(),
  {
    sideOffset: 4,
  },
);

const forwardedProps = useForwardProps(props);
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="forwardedProps"
      class="sigma-ui-hover-card-content"
      :class="$attrs.class"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>

<style>
.sigma-ui-hover-card-content {
  z-index: 50;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  outline: none;
  transform-origin: var(--reka-popper-transform-origin);
}

.sigma-ui-hover-card-content[data-state="open"] {
  animation: sigma-ui-fade-in-scale 200ms ease-out;
}
</style>
