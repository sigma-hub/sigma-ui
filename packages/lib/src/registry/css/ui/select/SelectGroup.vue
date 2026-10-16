<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectGroup, type SelectGroupProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectGroupProps>();
</script>

<template>
  <SelectGroup
    class="sigma-ui-select-group"
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="select-group"
    :class="[$attrs.class]"
  >
    <slot />
  </SelectGroup>
</template>

<style>
.sigma-ui-select-group {
  width: 100%;
  padding: 0.25rem;
}
</style>
