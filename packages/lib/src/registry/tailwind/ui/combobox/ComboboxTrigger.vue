<script setup lang="ts">
import type { ComboboxTriggerProps } from 'reka-ui';
import { ComboboxTrigger, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ComboboxTriggerProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxTrigger
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('', $attrs.class ?? '')"
    tabindex="0"
  >
    <slot />
  </ComboboxTrigger>
</template>
