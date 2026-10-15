<script setup lang="ts">
import {
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';

const props = defineProps<ContextMenuSubTriggerProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwardedProps"
    class="sigma-ui-context-menu-sub-trigger"
    :class="[{ 'sigma-ui-context-menu-sub-trigger--inset': inset }]"
   data-slot="context-menu-sub-trigger">
    <slot />
    <ChevronRightIcon class="sigma-ui-context-menu-sub-trigger__icon" />
  </ContextMenuSubTrigger>
</template>

<style>
.sigma-ui-context-menu-sub-trigger {
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

.sigma-ui-context-menu-sub-trigger:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-context-menu-sub-trigger[data-state="open"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-context-menu-sub-trigger--inset {
  padding-left: 2rem;
}

.sigma-ui-context-menu-sub-trigger__icon {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
}
</style>
