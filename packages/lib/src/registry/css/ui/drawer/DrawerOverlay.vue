<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerOverlayProps } from 'reka-ui';
import { DrawerOverlay } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerOverlayProps>();
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-drawer-overlay"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
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
}
</style>
