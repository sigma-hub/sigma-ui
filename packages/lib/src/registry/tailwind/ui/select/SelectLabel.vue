<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', $attrs.class ?? '')">
    <slot />
  </SelectLabel>
</template>
