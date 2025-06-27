<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
  <ComboboxSeparator
    v-bind="{ ...props, ...$attrs }"
    :class="cn('-mx-1 h-px bg-border', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxSeparator>
</template>
