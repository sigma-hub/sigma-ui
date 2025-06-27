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
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 1rem;
  color: hsl(var(--popover-foreground));
  box-shadow: var(--shadow-md);
  outline: none;
  transform-origin: var(--reka-popper-transform-origin);
  animation: fadeOut 100ms ease-in forwards;
}

.sigma-ui-hover-card-content[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
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
