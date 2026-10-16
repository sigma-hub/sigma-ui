<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'reka-ui';

const props = defineProps<TooltipProviderProps>();
</script>

<template>
  <TooltipProvider
    v-bind="props"
    data-slot="tooltip-provider"
  >
    <slot />
  </TooltipProvider>
</template>
