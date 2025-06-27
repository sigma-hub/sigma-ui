<script setup lang="ts">
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<RadioGroupItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
