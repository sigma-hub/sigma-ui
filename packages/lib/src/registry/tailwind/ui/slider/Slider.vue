<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SliderRootProps>();
const emits = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SliderRoot
    v-bind="forwarded"
    :class="cn(
      'relative flex w-full min-w-[50px] touch-none select-none items-center',
      $attrs.class ?? '',
    )"
  >
    <SliderTrack class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
