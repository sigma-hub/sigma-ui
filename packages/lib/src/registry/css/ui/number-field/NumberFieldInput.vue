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
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: transparent;
  font-size: 0.875rem;
  text-align: center;
}

.sigma-ui-number-field-input::placeholder {
  color: hsl(var(--muted-foreground));
}

.sigma-ui-number-field-input:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.sigma-ui-number-field-input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
