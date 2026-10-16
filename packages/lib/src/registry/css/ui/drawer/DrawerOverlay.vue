<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { DrawerOverlayProps } from 'reka-ui';
import { DrawerOverlay } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DrawerOverlayProps>();
</script>

<template>
  <DrawerOverlay
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-drawer-overlay"
    :class="[$attrs.class]"
    data-slot="drawer-overlay"
  />
</template>

<style>
.sigma-ui-drawer-overlay {
  position: fixed;
  z-index: 50;
  background-color: rgb(0 0 0 / 80%);
  inset: 0;
}

.sigma-ui-drawer-overlay[data-state="open"] {
  animation: sigma-ui-drawer-fade-in 500ms ease;
}

.sigma-ui-drawer-overlay[data-state="closed"] {
  animation: sigma-ui-drawer-fade-out 500ms ease;
}

@keyframes sigma-ui-drawer-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes sigma-ui-drawer-fade-out {
  to {
    opacity: 0;
  }
}
</style>
