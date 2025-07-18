<script setup lang="ts">
import {
  ContextMenuSubContent,
  type ContextMenuSubContentEmits,
  type ContextMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<ContextMenuSubContentProps>();
const emits = defineEmits<ContextMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuSubContent
    v-bind="forwarded"
    class="sigma-ui-context-menu-sub-content"
  >
    <slot />
  </ContextMenuSubContent>
</template>

<style>
.sigma-ui-context-menu-sub-content {
  z-index: 50;
  overflow: hidden;
  min-width: 8rem;
  padding: 0.25rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  animation: fadeOut 100ms ease-in forwards;
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  transform-origin: var(--reka-context-menu-content-transform-origin);
}

.sigma-ui-context-menu-sub-content[data-state="open"] {
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
