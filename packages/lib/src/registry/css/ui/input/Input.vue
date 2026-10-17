<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

/** Current value of the input; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <input
    v-bind="delegatedAttrs()"
    v-model="model"
    data-slot="input"
    class="sigma-ui-input"
    :class="[$attrs.class]"
    autocomplete="off"
  >
</template>

<style>
.sigma-ui-input {
  display: flex;
  width: 100%;
  min-width: 0;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 1rem;
  padding-block: 0.25rem;
  padding-inline: 0.75rem;
}

@media (width >= 48rem) {
  .sigma-ui-input {
    font-size: 0.875rem;
  }
}

.sigma-ui-input::file-selector-button {
  display: inline-flex;
  height: 1.75rem;
  border: 0;
  background-color: transparent;
  color: var(--foreground);
  font-size: 0.875rem;
  font-weight: 500;
}

.sigma-ui-input::selection {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-input[aria-invalid="true"] {
  border-color: var(--destructive);
}

.sigma-ui-input::placeholder {
  color: var(--muted-foreground);
}

.sigma-ui-input:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
</style>
