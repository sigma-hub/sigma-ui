<script setup lang="ts">
import { CollapsibleContent, type CollapsibleContentProps } from 'reka-ui';

const props = defineProps<CollapsibleContentProps>();
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    class="sigma-ui-collapsible__content"
  >
    <slot />
  </CollapsibleContent>
</template>

<style>
.sigma-ui-collapsible__content {
  overflow: hidden;
}

.sigma-ui-collapsible__content[data-state="open"] {
  animation: collapsible-down 0.2s ease-out;
}

.sigma-ui-collapsible__content[data-state="closed"] {
  animation: collapsible-up 0.2s ease-out;
}
</style>
