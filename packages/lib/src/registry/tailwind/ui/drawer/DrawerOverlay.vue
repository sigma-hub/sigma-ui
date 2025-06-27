<script lang="ts" setup>
import { DrawerOverlay } from 'vaul-vue';
import type { DialogOverlayProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DialogOverlayProps>();
</script>

<template>
  <DrawerOverlay
    v-bind="props"
    :class="cn('fixed inset-0 z-50 bg-black/80', $attrs.class ?? '')"
  />
</template>
