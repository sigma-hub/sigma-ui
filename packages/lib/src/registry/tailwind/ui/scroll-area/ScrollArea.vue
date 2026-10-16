<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';
import ScrollBar from './ScrollBar.vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ScrollAreaRootProps>();
</script>

<template>
  <ScrollAreaRoot
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('relative overflow-hidden', $attrs.class ?? '')"
    data-slot="scroll-area"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
