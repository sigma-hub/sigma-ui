<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
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

const props = defineProps<ContextMenuSubTriggerProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-sub-trigger"
    :class="[{ 'sigma-ui-context-menu-sub-trigger--inset': inset }, $attrs.class]"
  >
    <slot />
    <ChevronRightIcon class="sigma-ui-context-menu-sub-trigger__icon" />
  </ContextMenuSubTrigger>
</template>

<style>
.sigma-ui-context-menu-sub-trigger {
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

.sigma-ui-context-menu-sub-trigger:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-context-menu-sub-trigger[data-state="open"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-context-menu-sub-trigger--inset {
  padding-left: calc(var(--spacing) * 8);
}

.sigma-ui-context-menu-sub-trigger__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  margin-left: auto;
}
</style>
