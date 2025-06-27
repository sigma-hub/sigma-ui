<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';

import ScrollBar from './ScrollBar.vue';

const props = defineProps<ScrollAreaRootProps>();
</script>

<template>
  <ScrollAreaRoot
    v-bind="props"
    class="sigma-ui-scroll-area"
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
  height: 100%;
  width: 100%;
  border-radius: inherit;
}
</style>
