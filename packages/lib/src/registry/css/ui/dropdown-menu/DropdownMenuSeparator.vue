<script setup lang="ts">
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'reka-ui';

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
  <DropdownMenuSeparator
    v-bind="props"
    class="sigma-ui-dropdown-menu-separator"
  />
</template>

<style>
.sigma-ui-dropdown-menu-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: hsl(var(--border));
}
</style>
