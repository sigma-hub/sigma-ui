<script setup lang="ts">
import {
  MenubarContent,
  type MenubarContentProps,
  MenubarPortal,
  useForwardProps,
} from 'reka-ui';

const props = withDefaults(
  defineProps<MenubarContentProps>(),
  {
    align: 'start',
    alignOffset: -4,
    sideOffset: 8,
  },
);

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      v-bind="forwardedProps"
      class="sigma-ui-menubar-content"
      :class="[$attrs.class]"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>

<style>
.sigma-ui-menubar-content {
  z-index: 50;
  overflow: hidden;
  min-width: 12rem;
  padding: 0.25rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  opacity: 0;
  pointer-events: none;
  transform: scale(0.96) translateY(-2px);
  transform-origin: var(--reka-menubar-content-transform-origin);
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}

.sigma-ui-menubar-content[data-state="open"] {
  animation: content-show 150ms ease-out;
  opacity: 1;
  pointer-events: auto;
  transform: scale(1) translateY(0);
}

.sigma-ui-menubar-content[data-state="closed"] {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.96) translateY(-2px);
  transition: transform 100ms ease-in, opacity 100ms ease-in;
}

@keyframes content-show {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(-2px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
