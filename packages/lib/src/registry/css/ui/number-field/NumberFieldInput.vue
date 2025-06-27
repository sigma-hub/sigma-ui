<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui';
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    class="sigma-ui-number-field-input"
  />
</template>

<style>
.sigma-ui-number-field-input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
}

.sigma-ui-number-field-input::placeholder {
  color: hsl(var(--muted-foreground));
}

.sigma-ui-number-field-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}

.sigma-ui-number-field-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
