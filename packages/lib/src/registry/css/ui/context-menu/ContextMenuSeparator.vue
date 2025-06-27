<script setup lang="ts">
import {
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
} from 'reka-ui';

const props = defineProps<ContextMenuSeparatorProps>();
</script>

<template>
  <ContextMenuSeparator
    v-bind="props"
    class="sigma-ui-context-menu-separator"
  />
</template>

<style>
.sigma-ui-context-menu-separator {
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: hsl(var(--border));
}
</style>
