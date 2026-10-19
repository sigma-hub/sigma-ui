<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-select-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-select-separator {
    height: 1px;
    margin: calc(var(--spacing) * 1) calc(var(--spacing) * -1);
    background-color: var(--border);
    pointer-events: none;
  }
}
</style>
