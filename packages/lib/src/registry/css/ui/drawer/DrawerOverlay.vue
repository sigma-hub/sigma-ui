<script lang="ts" setup>
import { DrawerOverlay } from 'vaul-vue';
import type { DialogOverlayProps } from 'reka-ui';

const props = defineProps<DialogOverlayProps>();
</script>

<template>
  <DrawerOverlay
    v-bind="props"
    class="sigma-ui-drawer-overlay"
  />
</template>

<style>
.sigma-ui-drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);
}
</style>
