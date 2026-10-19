<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectGroup, type SelectGroupProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    data-slot="select-group"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('p-1 w-full', $attrs.class ?? '')"
  >
    <slot />
  </SelectGroup>
</template>
