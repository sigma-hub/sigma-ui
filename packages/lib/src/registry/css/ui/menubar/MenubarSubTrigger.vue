<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
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
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-menubar-subtrigger"
    :class="[{ 'sigma-ui-menubar-subtrigger--inset': inset }, $attrs.class]"
    data-slot="menubar-sub-trigger"
  >
    <slot />
    <ChevronRightIcon class="sigma-ui-menubar-subtrigger__icon" />
  </MenubarSubTrigger>
</template>

<style>
.sigma-ui-menubar-subtrigger {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
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
  padding-left: 2rem;
}

.sigma-ui-menubar-subtrigger__icon {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
}
</style>
