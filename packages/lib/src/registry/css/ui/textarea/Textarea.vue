<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<{
  /** Current value of the textarea; use with `v-model`. */
  modelValue?: string | number;
}>();

/** Current value of the textarea; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <textarea
    v-bind="delegatedAttrs()"
    v-model="model"
    class="sigma-ui-textarea"
    :class="[$attrs.class]"
    autocomplete="off"
    data-slot="textarea"
  />
</template>

<style>
.sigma-ui-textarea {
  display: flex;
  width: 100%;
  min-height: 5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 0.875rem;
}

.sigma-ui-textarea::placeholder {
  color: var(--muted-foreground);
}

.sigma-ui-textarea:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-textarea:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
