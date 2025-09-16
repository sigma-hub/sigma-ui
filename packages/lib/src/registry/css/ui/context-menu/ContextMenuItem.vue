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
  align-items: center;
  padding: 0.375rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
}

.sigma-ui-context-menu-item--inset {
  padding-left: 2rem;
}

.sigma-ui-context-menu-item:focus {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-context-menu-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
