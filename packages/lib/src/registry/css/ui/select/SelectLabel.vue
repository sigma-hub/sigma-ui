<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'reka-ui';

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    class="sigma-ui-select-label"
    :class="[$attrs.class]"
  >
    <slot />
  </SelectLabel>
</template>

<style>
.sigma-ui-select-label {
  padding: 0.375rem 0.5rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
}
</style>
