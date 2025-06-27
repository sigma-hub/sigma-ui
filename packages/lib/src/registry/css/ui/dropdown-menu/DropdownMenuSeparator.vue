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
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: hsl(var(--border));
}
</style>
