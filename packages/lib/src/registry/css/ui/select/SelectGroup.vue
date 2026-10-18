<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectGroup, type SelectGroupProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectGroupProps>();
</script>

<template>
  <SelectGroup
    class="sigma-ui-select-group"
    data-slot="select-group"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </SelectGroup>
</template>

<style>
.sigma-ui-select-group {
  width: 100%;
  padding: calc(var(--spacing) * 1);
}
</style>
