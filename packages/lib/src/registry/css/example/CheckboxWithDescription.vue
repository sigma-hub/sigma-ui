<script setup lang="ts">
import { Checkbox } from '@ui/registry/css/ui/checkbox';
</script>

<template>
  <div class="example-sigma-ui-checkbox-custom__container">
    <div class="example-sigma-ui-checkbox-custom">
      <Checkbox id="checkbox-custom-1" />
      <div class="example-sigma-ui-checkbox-custom__content">
        <label
          for="checkbox-custom-1"
          class="example-sigma-ui-checkbox-custom__label"
        >
          Accept terms and conditions
        </label>
        <p class="example-sigma-ui-checkbox-custom__description">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>

    <div class="example-sigma-ui-checkbox-custom">
      <Checkbox
        id="checkbox-custom-disabled-2"
        disabled
      />
      <div class="example-sigma-ui-checkbox-custom__content">
        <label
          for="checkbox-custom-disabled-2"
          class="example-sigma-ui-checkbox-custom__label"
        >
          Accept terms and conditions
        </label>
        <p class="example-sigma-ui-checkbox-custom__description">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.example-sigma-ui-checkbox-custom__container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-sigma-ui-checkbox-custom {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.example-sigma-ui-checkbox-custom__content {
  display: grid;
  gap: 0.375rem;
  line-height: 1;
}

.example-sigma-ui-checkbox-custom__label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-checkbox-custom:has([data-disabled]) .example-sigma-ui-checkbox-custom__label,
.example-sigma-ui-checkbox-custom:has([data-disabled]) .example-sigma-ui-checkbox-custom__description {
  cursor: not-allowed;
  opacity: 0.7;
}

.example-sigma-ui-checkbox-custom__description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}
</style>
