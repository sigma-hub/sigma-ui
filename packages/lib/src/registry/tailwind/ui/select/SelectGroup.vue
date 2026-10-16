<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectGroup, type SelectGroupProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('p-1 w-full', $attrs.class ?? '')"
    data-slot="select-group"
  >
    <slot />
  </SelectGroup>
</template>
