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
  min-width: 12rem;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow: var(--shadow-md);
  transform-origin: var(--reka-menubar-content-transform-origin);
  opacity: 0;
  transform: scale(0.96) translateY(-2px);
  transition: transform 150ms ease-out, opacity 150ms ease-out;
  pointer-events: none;
}

.sigma-ui-menubar-content[data-state="open"] {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: auto;
  animation: contentShow 150ms ease-out;
}

.sigma-ui-menubar-content[data-state="closed"] {
  opacity: 0;
  transform: scale(0.96) translateY(-2px);
  transition: transform 100ms ease-in, opacity 100ms ease-in;
  pointer-events: none;
}

@keyframes contentShow {
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
