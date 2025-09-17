<script setup lang="ts">
import {
  ContextMenuCheckboxItem,
  type ContextMenuCheckboxItemEmits,
  type ContextMenuCheckboxItemProps,
  ContextMenuItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';

const props = defineProps<ContextMenuCheckboxItemProps>();
const emits = defineEmits<ContextMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuCheckboxItem
    v-bind="forwarded"
    class="sigma-ui-context-menu-checkbox-item"
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
.sigma-ui-context-menu-checkbox-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
}

.sigma-ui-context-menu-checkbox-item:focus {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-context-menu-checkbox-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-context-menu-checkbox-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-context-menu-checkbox-item__icon {
  width: 1rem;
  height: 1rem;
}
</style>
