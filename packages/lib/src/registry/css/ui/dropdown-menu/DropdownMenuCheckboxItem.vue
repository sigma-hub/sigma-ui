<script setup lang="ts">
import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';

const props = defineProps<DropdownMenuCheckboxItemProps>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    class="sigma-ui-dropdown-menu-checkbox-item"
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
.sigma-ui-dropdown-menu-checkbox-item {
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

.sigma-ui-dropdown-menu-checkbox-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-dropdown-menu-checkbox-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-dropdown-menu-checkbox-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-dropdown-menu-checkbox-item__icon {
  height: 1rem;
  width: 1rem;
}
</style>
