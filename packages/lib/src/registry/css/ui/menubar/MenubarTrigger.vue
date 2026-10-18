<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarTrigger, type MenubarTriggerProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-menubar-trigger"
    :class="[$attrs.class]"
  >
    <slot />
  </MenubarTrigger>
</template>

<style>
.sigma-ui-menubar-trigger {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  user-select: none;
}

.sigma-ui-menubar-trigger:hover {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-trigger:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-trigger[data-state="open"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}
</style>
