<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    v-bind="props"
    data-slot="select-separator"
    :class="cn('-mx-1 my-1 h-px bg-border pointer-events-none', $attrs.class ?? '')"
  />
</template>
