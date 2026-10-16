<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(
  defineProps<ProgressRootProps>(),
  {
    modelValue: 0,
  },
);
</script>

<template>
  <ProgressRoot
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="
      cn(
        'relative h-4 w-full min-w-[50px] overflow-hidden rounded-full bg-secondary',
        $attrs.class ?? '',
      )
    "
    data-slot="progress"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
