<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    v-bind="{ ...props, ...$attrs }"
    :class="['sigma-ui-combobox-empty', $attrs.class]"
  >
    <slot />
  </ComboboxEmpty>
</template>

<style>
.sigma-ui-combobox-empty {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
