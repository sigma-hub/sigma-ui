<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<AcceptableValue | AcceptableValue[]>({
  default: '',
});

const attrs = useAttrs();
const selectAttrs = () => Object.fromEntries(
  Object.entries(attrs).filter(([key]) => key !== 'class'),
);

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
      v-model="model"
      data-slot="native-select"
      v-bind="selectAttrs()"
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
  min-width: 0;
  height: calc(var(--spacing) * 9);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 9) calc(var(--spacing) * 2) calc(var(--spacing) * 3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  appearance: none;
  background-color: var(--input);
  font-size: 0.875rem;
  outline: none;
}

.sigma-ui-native-select__control:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-native-select__control:disabled {
  cursor: not-allowed;
}

.sigma-ui-native-select__control[aria-invalid="true"] {
  border-color: var(--destructive);
}

.sigma-ui-native-select__icon {
  position: absolute;
  top: 50%;
  right: calc(var(--spacing) * 3);
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  color: var(--muted-foreground);
  opacity: 0.5;
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
