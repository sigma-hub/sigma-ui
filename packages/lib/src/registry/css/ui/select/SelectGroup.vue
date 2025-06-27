<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from 'reka-ui';

const props = defineProps<SelectGroupProps>();
</script>

<template>
  <SelectGroup
    class="sigma-ui-select-group"
    v-bind="props"
  >
    <slot />
  </SelectGroup>
</template>

<style>
.sigma-ui-select-group {
  padding: 0.25rem;
  width: 100%;
}
</style>
