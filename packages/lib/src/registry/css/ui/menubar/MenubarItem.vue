<script setup lang="ts">
import {
  MenubarItem,
  type MenubarItemEmits,
  type MenubarItemProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<MenubarItemProps & { inset?: boolean }>();
const emits = defineEmits<MenubarItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarItem
    v-bind="forwarded"
    class="sigma-ui-menubar-item"
    :class="[{ 'sigma-ui-menubar-item--inset': inset }]"
  >
    <slot />
  </MenubarItem>
</template>

<style>
.sigma-ui-menubar-item {
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-menubar-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-menubar-item--inset {
  padding-left: 2rem;
}
</style>
