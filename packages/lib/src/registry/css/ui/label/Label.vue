<script setup lang="ts">
import { Label, type LabelProps } from 'reka-ui';

const props = defineProps<LabelProps>();
</script>

<template>
  <Label
    v-bind="props"
    class="sigma-ui-label"
  >
    <slot />
  </Label>
</template>

<style>
.sigma-ui-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

:where(:disabled) ~ .sigma-ui-label {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
