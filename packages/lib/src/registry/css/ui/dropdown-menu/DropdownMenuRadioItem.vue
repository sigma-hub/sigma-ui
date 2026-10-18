<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuRadioItemProps>();
const emits = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-radio-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-dropdown-menu-radio-item__indicator">
      <DropdownMenuItemIndicator>

        <CircleIcon class="sigma-ui-dropdown-menu-radio-item__icon" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>

<style>
.sigma-ui-dropdown-menu-radio-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;
  user-select: none;
}

.sigma-ui-dropdown-menu-radio-item:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-dropdown-menu-radio-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-dropdown-menu-radio-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-dropdown-menu-radio-item__icon {
  width: 0.5rem;
  height: 0.5rem;
  fill: currentcolor;
}
</style>
