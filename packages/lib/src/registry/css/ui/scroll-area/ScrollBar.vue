<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-scroll-area-scrollbar"
    data-slot="scroll-bar"
    :class="[$attrs.class]"
  >
    <ScrollAreaThumb class="sigma-ui-scroll-area-scrollbar__thumb" />
  </ScrollAreaScrollbar>
</template>

<style>
.sigma-ui-scroll-area-scrollbar {
  display: flex;
  touch-action: none;
  transition-duration: 150ms;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.sigma-ui-scroll-area-scrollbar[data-orientation="vertical"] {
  width: 0.625rem;
  height: 100%;
  padding: 1px;
  border-left: 1px solid transparent;
}

.sigma-ui-scroll-area-scrollbar[data-orientation="horizontal"] {
  height: 0.625rem;
  flex-direction: column;
  padding: 1px;
  border-top: 1px solid transparent;
}

.sigma-ui-scroll-area-scrollbar__thumb {
  position: relative;
  flex: 1;
  border-radius: var(--radius-full);
  background-color: var(--border);
}
</style>
