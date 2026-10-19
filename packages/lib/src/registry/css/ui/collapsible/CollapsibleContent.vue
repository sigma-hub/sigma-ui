<script setup lang="ts">
import { CollapsibleContent, type CollapsibleContentProps } from 'reka-ui';

const props = defineProps<CollapsibleContentProps>();
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="props"
    class="sigma-ui-collapsible__content"
  >
    <slot />
  </CollapsibleContent>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-collapsible__content {
    overflow: hidden;
  }

  .sigma-ui-collapsible__content[data-state="open"] {
    animation: sigma-ui-collapsible-down 0.2s ease-out;
  }

  .sigma-ui-collapsible__content[data-state="closed"] {
    animation: sigma-ui-collapsible-up 0.2s ease-out;
  }
}
</style>
