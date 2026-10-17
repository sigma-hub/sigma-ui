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
    v-bind="{ ...props, ...delegatedAttrs() }"
    data-slot="select-separator"
    class="sigma-ui-select-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-select-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: var(--border);
  pointer-events: none;
}
</style>
