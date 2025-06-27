<script setup lang="ts">

const model = defineModel<string | number>();
</script>

<template>
  <input
    v-model="model"
    class="sigma-ui-input"
    :class="[$attrs.class]"
    autocomplete="off"
  >
</template>

<style>
.sigma-ui-input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding-inline: 0.75rem;
  padding-block: 0.5rem;
  font-size: 0.875rem;
}

.sigma-ui-input::file-selector-button {
  border: 0;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 500;
}

.sigma-ui-input::placeholder {
  color: hsl(var(--muted-foreground));
}

.sigma-ui-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)),
              0 0 0 4px hsl(var(--ring));
}

.sigma-ui-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
