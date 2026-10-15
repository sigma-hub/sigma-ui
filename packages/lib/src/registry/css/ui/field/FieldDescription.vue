<script setup lang="ts">
defineSlots<{
  /**
   * Helper text. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    data-slot="field-description"
    class="sigma-ui-field-description"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-field-description {
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.sigma-ui-field-description:nth-last-child(2) {
  margin-top: -0.25rem;
}

.sigma-ui-field-description:last-child {
  margin-top: 0;
}

[data-variant="legend"] + .sigma-ui-field-description {
  margin-top: -0.375rem;
}

.sigma-ui-field--horizontal .sigma-ui-field-description {
  text-wrap: balance;
}

.sigma-ui-field-description > a {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.sigma-ui-field-description > a:hover {
  color: hsl(var(--primary));
}
</style>
