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
  align-items: center;
  padding: 0.375rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
}

.sigma-ui-menubar-item:focus {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-menubar-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-menubar-item--inset {
  padding-left: 2rem;
}
</style>
