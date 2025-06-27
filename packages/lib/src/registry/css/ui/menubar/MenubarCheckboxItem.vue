<script setup lang="ts">
import {
  MenubarCheckboxItem,
  type MenubarCheckboxItemEmits,
  type MenubarCheckboxItemProps,
  MenubarItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';

const props = defineProps<MenubarCheckboxItemProps>();
const emits = defineEmits<MenubarCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarCheckboxItem
    v-bind="forwarded"
    class="sigma-ui-menubar-checkbox-item"
  >
    <span class="sigma-ui-menubar-checkbox-item__indicator">
      <MenubarItemIndicator>
        <CheckIcon class="sigma-ui-menubar-checkbox-item__icon" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>

<style>
.sigma-ui-menubar-checkbox-item {
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-menubar-checkbox-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-menubar-checkbox-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-menubar-checkbox-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-menubar-checkbox-item__icon {
  width: 1rem;
  height: 1rem;
}
</style>
