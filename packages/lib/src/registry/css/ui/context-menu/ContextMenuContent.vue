<script setup lang="ts">
import {
  ContextMenuContent,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
  ContextMenuPortal,
  useForwardPropsEmits,

} from 'reka-ui';

const props = defineProps<ContextMenuContentProps>();
const emits = defineEmits<ContextMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="forwarded"
      class="sigma-ui-context-menu-content"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>

<style>
.sigma-ui-context-menu-content {
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 0.25rem;
  color: hsl(var(--popover-foreground));
  box-shadow: var(--shadow-md);
  transform-origin: var(--reka-context-menu-content-transform-origin);
  animation: fadeOut 100ms ease-in forwards;
}

.sigma-ui-context-menu-content[data-state="open"] {
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
