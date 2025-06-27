<script setup lang="ts">
import { MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';

const props = defineProps<MenubarSubTriggerProps & { inset?: boolean }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSubTrigger
    v-bind="forwardedProps"
    class="sigma-ui-menubar-subtrigger"
    :class="[{ 'sigma-ui-menubar-subtrigger--inset': inset }]"
  >
    <slot />
    <ChevronRightIcon class="sigma-ui-menubar-subtrigger__icon" />
  </MenubarSubTrigger>
</template>

<style>
.sigma-ui-menubar-subtrigger {
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-menubar-subtrigger:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-subtrigger[data-state="open"] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-subtrigger--inset {
  padding-left: 2rem;
}

.sigma-ui-menubar-subtrigger__icon {
  margin-left: auto;
  height: 1rem;
  width: 1rem;
}
</style>
