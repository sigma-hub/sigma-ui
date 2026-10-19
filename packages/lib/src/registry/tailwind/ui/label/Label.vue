<script setup lang="ts">
import { useAttrs } from 'vue';

import { Label, type LabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<LabelProps>();
</script>

<template>
  <Label
    data-slot="label"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="

      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </Label>
</template>
