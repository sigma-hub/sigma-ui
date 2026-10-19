<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuCheckboxItem,
  type ContextMenuCheckboxItemEmits,
  type ContextMenuCheckboxItemProps,
  ContextMenuItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuCheckboxItemProps>();
const emits = defineEmits<ContextMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-checkbox-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-context-menu-checkbox-item__indicator">
      <ContextMenuItemIndicator>
        <CheckIcon class="sigma-ui-context-menu-checkbox-item__icon" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>

<style>
@layer components {
  .sigma-ui-context-menu-checkbox-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2) calc(var(--spacing) * 1.5) calc(var(--spacing) * 8);
    border-radius: var(--radius-sm);
    cursor: default;
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    user-select: none;
  }

  .sigma-ui-context-menu-checkbox-item:focus {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-context-menu-checkbox-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  .sigma-ui-context-menu-checkbox-item__indicator {
    position: absolute;
    left: calc(var(--spacing) * 2);
    display: flex;
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
    align-items: center;
    justify-content: center;
  }

  .sigma-ui-context-menu-checkbox-item__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
