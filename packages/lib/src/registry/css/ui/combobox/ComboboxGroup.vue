<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';

const props = defineProps<ComboboxGroupProps & {
  heading?: string;
}>();
</script>

<template>
  <ComboboxGroup
    v-bind="{ ...props, ...$attrs }"
    :class="['sigma-ui-combobox-group', $attrs.class]"
  >
    <ComboboxLabel
      v-if="heading"
      class="sigma-ui-combobox-group__heading"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style>
.sigma-ui-combobox-group {
  overflow: hidden;
  padding: 0.25rem;
  color: hsl(var(--foreground));
}

.sigma-ui-combobox-group [cmdk-group-heading] {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.sigma-ui-combobox-group__heading {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}
</style>
