<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';
import ScrollBar from './ScrollBar.vue';
import { cn } from '@ui/utils';

const props = defineProps<ScrollAreaRootProps>();
</script>

<template>
  <ScrollAreaRoot
    v-bind="props"
    :class="cn('relative overflow-hidden', $attrs.class ?? '')"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
