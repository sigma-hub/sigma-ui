<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SelectGroupProps>();
</script>

<template>
  <SelectGroup
    :class="cn('p-1 w-full', $attrs.class ?? '')"
    v-bind="props"
  >
    <slot />
  </SelectGroup>
</template>
