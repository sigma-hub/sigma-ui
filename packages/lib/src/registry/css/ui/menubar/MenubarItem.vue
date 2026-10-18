<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarItem,
  type MenubarItemEmits,
  type MenubarItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarItemProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
const emits = defineEmits<MenubarItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarItem
    data-slot="menubar-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-menubar-item"
    :class="[{ 'sigma-ui-menubar-item--inset': inset }, $attrs.class]"
  >
    <slot />
  </MenubarItem>
</template>

<style>
.sigma-ui-menubar-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
}

.sigma-ui-menubar-item:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-menubar-item--inset {
  padding-left: calc(var(--spacing) * 8);
}
</style>
