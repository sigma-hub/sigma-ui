<script setup lang="ts">
import { CollapsibleTrigger, type CollapsibleTriggerProps } from 'reka-ui';

const props = defineProps<CollapsibleTriggerProps>();
</script>

<template>
  <CollapsibleTrigger
    v-bind="props"
    data-slot="collapsible-trigger"
  >
    <slot />
  </CollapsibleTrigger>
</template>
