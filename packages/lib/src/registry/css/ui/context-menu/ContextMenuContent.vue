<script setup lang="ts">
import {
  ContextMenuContent,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
  ContextMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ContextMenuContentProps>();
const emits = defineEmits<ContextMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="sigma-ui-context-menu-content"
      :class="$attrs.class"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>

<style>
.sigma-ui-context-menu-content {
  z-index: 50;
  min-width: 8rem;
  padding: 0.25rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  transform-origin: var(--reka-context-menu-content-transform-origin);
}

.sigma-ui-context-menu-content[data-state="open"] {
  animation: fade-in 200ms ease-out;
}

.sigma-ui-context-menu-content[data-state="closed"] {
  animation: fade-out 100ms ease-in forwards;
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
