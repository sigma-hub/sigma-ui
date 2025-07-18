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
  animation: fadeOut 100ms ease-in forwards;
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  outline: none;
  transform-origin: var(--reka-popper-transform-origin);
}

.sigma-ui-hover-card-content[data-state="open"] {
  animation: fade-in 200ms ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
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
