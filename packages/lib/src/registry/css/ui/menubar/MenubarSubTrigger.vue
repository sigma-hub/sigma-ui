<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarSubTriggerProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-menubar-subtrigger"
    :class="[{ 'sigma-ui-menubar-subtrigger--inset': inset }, $attrs.class]"
  >
    <slot />
    <ChevronRightIcon class="sigma-ui-menubar-subtrigger__icon" />
  </MenubarSubTrigger>
</template>

<style>
.sigma-ui-menubar-subtrigger {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
}

.sigma-ui-menubar-subtrigger:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-subtrigger[data-state="open"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-subtrigger--inset {
  padding-left: calc(var(--spacing) * 8);
}

.sigma-ui-menubar-subtrigger__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: auto;
}
</style>
