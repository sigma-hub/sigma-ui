<script setup lang="ts">

const props = defineProps<{
  modelValue?: string | number;
}>();

const model = defineModel<string | number>();
</script>

<template>
  <textarea
    v-model="model"
    class="sigma-ui-textarea"
    :class="[$attrs.class]"
    autocomplete="off"
  />
</template>

<style>
.sigma-ui-textarea {
  display: flex;
  min-height: 5rem;
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.sigma-ui-textarea::placeholder {
  color: hsl(var(--muted-foreground));
}

.sigma-ui-textarea:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}

.sigma-ui-textarea:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
