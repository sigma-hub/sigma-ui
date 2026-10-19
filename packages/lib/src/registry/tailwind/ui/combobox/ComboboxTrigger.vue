<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxTriggerProps } from 'reka-ui';
import { ComboboxTrigger, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxTriggerProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxTrigger
    data-slot="combobox-trigger"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('', $attrs.class ?? '')"
    tabindex="0"
  >
    <slot />
  </ComboboxTrigger>
</template>
