<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuSubTriggerProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-sub-trigger"
    :class="[{ 'sigma-ui-dropdown-menu-sub-trigger--inset': inset }, $attrs.class]"
  >
    <slot />
    <ChevronRightIcon class="sigma-ui-dropdown-menu-sub-trigger__icon" />
  </DropdownMenuSubTrigger>
</template>

<style>
.sigma-ui-dropdown-menu-sub-trigger {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;
  user-select: none;
}

.sigma-ui-dropdown-menu-sub-trigger:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-dropdown-menu-sub-trigger[data-state="open"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-dropdown-menu-sub-trigger--inset {
  padding-left: calc(var(--spacing) * 8);
}

.sigma-ui-dropdown-menu-sub-trigger__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: auto;
}
</style>
