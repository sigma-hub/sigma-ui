<script setup lang="ts">
import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui';

const props = defineProps<ContextMenuLabelProps & { inset?: boolean }>();
</script>

<template>
  <ContextMenuLabel
    v-bind="props"
    class="sigma-ui-context-menu-label"
    :class="[{ 'sigma-ui-context-menu-label--inset': inset }]"
  >
    <slot />
  </ContextMenuLabel>
</template>

<style>
.sigma-ui-context-menu-label {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.sigma-ui-context-menu-label--inset {
  padding-left: 2rem;
}
</style>
