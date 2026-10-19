<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui';
import { CircleIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RadioGroupItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary focus:outline-hidden focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $attrs.class ?? '',
      )
    "
  >
    <RadioGroupIndicator
      class="flex items-center justify-center"
    >
      <CircleIcon class="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
