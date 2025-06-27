<script setup lang="ts">
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';

const props = defineProps<DropdownMenuRadioItemProps>();
const emits = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    class="sigma-ui-dropdown-menu-radio-item"
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
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;
}

.sigma-ui-dropdown-menu-radio-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-dropdown-menu-radio-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-dropdown-menu-radio-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-dropdown-menu-radio-item__icon {
  height: 0.5rem;
  width: 0.5rem;
  fill: currentColor;
}
</style>
