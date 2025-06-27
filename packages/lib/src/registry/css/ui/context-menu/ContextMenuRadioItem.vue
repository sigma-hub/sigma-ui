<script setup lang="ts">
import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
  type ContextMenuRadioItemEmits,
  type ContextMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';

const props = defineProps<ContextMenuRadioItemProps>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRadioItem
    v-bind="forwarded"
    class="sigma-ui-context-menu-radio-item"
  >
    <span class="sigma-ui-context-menu-radio-item__indicator">
      <ContextMenuItemIndicator>
        <CircleIcon class="sigma-ui-context-menu-radio-item__icon" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>

<style>
.sigma-ui-context-menu-radio-item {
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
}

.sigma-ui-context-menu-radio-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-context-menu-radio-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-context-menu-radio-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-context-menu-radio-item__icon {
  height: 0.5rem;
  width: 0.5rem;
  fill: currentColor;
}
</style>
