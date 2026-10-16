<script setup lang="ts">
import { SelectItemText, type SelectItemTextProps } from 'reka-ui';

const props = defineProps<SelectItemTextProps>();
</script>

<template>
  <SelectItemText
    v-bind="props"
    data-slot="select-item-text"
  >
    <slot />
  </SelectItemText>
</template>
