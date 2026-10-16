<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectLabel, type SelectLabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    v-bind="delegatedAttrs"
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
  color: var(--muted-foreground);
  font-size: 0.75rem;
}
</style>
