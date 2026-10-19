<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicator,
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

const props = defineProps<DropdownMenuCheckboxItemProps>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-checkbox-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-dropdown-menu-checkbox-item__indicator">
      <DropdownMenuItemIndicator>

        <CheckIcon class="sigma-ui-dropdown-menu-checkbox-item__icon" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-dropdown-menu-checkbox-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2) calc(var(--spacing) * 1.5) calc(var(--spacing) * 8);
    border-radius: var(--radius-sm);
    cursor: default;
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    transition: background-color 150ms ease, color 150ms ease;
    user-select: none;
  }

  .sigma-ui-dropdown-menu-checkbox-item:focus {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-dropdown-menu-checkbox-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  .sigma-ui-dropdown-menu-checkbox-item__indicator {
    position: absolute;
    left: calc(var(--spacing) * 2);
    display: flex;
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
    align-items: center;
    justify-content: center;
  }

  .sigma-ui-dropdown-menu-checkbox-item__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
