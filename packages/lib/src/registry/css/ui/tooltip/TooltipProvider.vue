<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'reka-ui';

const props = defineProps<TooltipProviderProps>();
</script>

<template>
  <TooltipProvider
    data-slot="tooltip-provider"
    v-bind="props"
  >
    <slot />
  </TooltipProvider>
</template>
