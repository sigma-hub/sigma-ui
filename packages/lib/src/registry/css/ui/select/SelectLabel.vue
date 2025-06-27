<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'reka-ui';

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    class="sigma-ui-select-label"
    :class="[$attrs.class]"
  >
    <slot />
  </SelectLabel>
</template>

<style>
.sigma-ui-select-label {
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
