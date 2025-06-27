<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';

const props = defineProps<SelectTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    class="sigma-ui-select-trigger"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon class="sigma-ui-select-trigger__icon" />
    </SelectIcon>
  </SelectTrigger>
</template>

<style>
.sigma-ui-select-trigger {
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.sigma-ui-select-trigger:focus {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}

.sigma-ui-select-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-select-trigger > span {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sigma-ui-select-trigger__icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
}
</style>
