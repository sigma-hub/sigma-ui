<script setup lang="ts">
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<ContextMenuItemProps & { inset?: boolean }>();
const emits = defineEmits<ContextMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    class="sigma-ui-context-menu-item"
    :class="[{ 'sigma-ui-context-menu-item--inset': inset }]"
  >
    <slot />
  </ContextMenuItem>
</template>

<style>
.sigma-ui-context-menu-item {
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.sigma-ui-context-menu-item--inset {
  padding-left: 2rem;
}

.sigma-ui-context-menu-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-context-menu-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}
</style>
