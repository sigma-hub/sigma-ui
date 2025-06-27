<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,

} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';

const props = defineProps<SelectItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    class="sigma-ui-select-item"
  >
    <span class="sigma-ui-select-item__indicator-wrapper">
      <SelectItemIndicator>
        <CheckIcon class="sigma-ui-select-item__check-icon" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<style>
.sigma-ui-select-item {
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-select-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-select-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-select-item__indicator-wrapper {
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-select-item__check-icon {
  height: 1rem;
  width: 1rem;
}
</style>
