<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuItemProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
const emits = defineEmits<ContextMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-item"
    :class="[{ 'sigma-ui-context-menu-item--inset': inset }, $attrs.class]"
  >
    <slot />
  </ContextMenuItem>
</template>

<style>
@layer components {
  .sigma-ui-context-menu-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
    cursor: default;
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    user-select: none;
  }

  .sigma-ui-context-menu-item--inset {
    padding-left: calc(var(--spacing) * 8);
  }

  .sigma-ui-context-menu-item:focus {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-context-menu-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
