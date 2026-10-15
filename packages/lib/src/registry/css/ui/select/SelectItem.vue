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
    data-slot="select-item"
    v-bind="forwardedProps"
    class="sigma-ui-select-item"
   data-slot="select-item">
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
  align-items: center;
  padding: 0.375rem 2rem 0.375rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  gap: 0.5rem;
  outline: none;
  user-select: none;
}

.sigma-ui-select-item:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-select-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-select-item__indicator-wrapper {
  position: absolute;
  right: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-select-item__check-icon {
  width: 1rem;
  height: 1rem;
}
</style>
