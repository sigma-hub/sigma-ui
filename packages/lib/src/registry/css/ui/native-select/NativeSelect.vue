<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ChevronDownIcon } from 'lucide-vue-next';
import { useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<AcceptableValue | AcceptableValue[]>({
  default: '',
});

const attrs = useAttrs();
const selectAttrs = reactiveOmit(attrs, 'class');

defineSlots<{
  /**
   * `NativeSelectOption` and `NativeSelectOptGroup` children.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="native-select-wrapper"
    class="sigma-ui-native-select"
    :class="[attrs.class]"
  >
    <select
      v-bind="selectAttrs"
      v-model="model"
      data-slot="native-select"
      class="sigma-ui-native-select__control"
    >
      <slot />
    </select>
    <ChevronDownIcon
      class="sigma-ui-native-select__icon"
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>

<style>
.sigma-ui-native-select {
  position: relative;
  width: fit-content;
}

.sigma-ui-native-select:has(select:disabled) {
  opacity: 0.5;
}

.sigma-ui-native-select__control {
  display: flex;
  width: 100%;
  height: 2.5rem;
  min-width: 0;
  appearance: none;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  background-color: hsl(var(--input));
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-native-select__control:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.sigma-ui-native-select__control:disabled {
  cursor: not-allowed;
}

.sigma-ui-native-select__control[aria-invalid="true"] {
  border-color: hsl(var(--destructive));
}

.sigma-ui-native-select__icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
