<script lang="ts" setup>
import type { DrawerOverlayProps } from 'reka-ui';
import { DrawerOverlay } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DrawerOverlayProps>();
</script>

<template>
  <DrawerOverlay
    v-bind="props"
    data-slot="drawer-overlay"
    :class="cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', $attrs.class ?? '')"
  />
</template>
