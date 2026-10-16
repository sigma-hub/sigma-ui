<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </SelectLabel>
</template>
