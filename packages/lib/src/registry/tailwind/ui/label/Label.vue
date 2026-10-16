<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Label, type LabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<LabelProps>();
</script>

<template>
  <Label
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="

      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        $attrs.class ?? '',
      )
    "
    data-slot="label"
  >
    <slot />
  </Label>
</template>
