<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    v-bind="props"
    :class="cn('py-6 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxEmpty>
</template>
