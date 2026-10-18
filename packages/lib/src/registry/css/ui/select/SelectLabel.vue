<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectLabel, type SelectLabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    v-bind="delegatedAttrs()"
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
