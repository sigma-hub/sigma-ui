<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';
import ScrollBar from './ScrollBar.vue';
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
    class="sigma-ui-scroll-area"
    data-slot="scroll-area"
    :class="[$attrs.class]"
  >
    <ScrollAreaViewport class="sigma-ui-scroll-area__viewport">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style>
.sigma-ui-scroll-area {
  position: relative;
  overflow: hidden;
}

.sigma-ui-scroll-area__viewport {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
</style>
