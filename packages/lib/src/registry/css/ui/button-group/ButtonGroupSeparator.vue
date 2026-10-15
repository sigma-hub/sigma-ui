<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/css/ui/separator';

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <Separator
    v-bind="props"
    data-slot="button-group-separator"
    class="sigma-ui-button-group-separator"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-button-group-separator {
  position: relative;
  align-self: stretch;
  margin: 0;
  background-color: hsl(var(--border));
}

.sigma-ui-separator.sigma-ui-button-group-separator[data-orientation="vertical"] {
  height: auto;
}
</style>
