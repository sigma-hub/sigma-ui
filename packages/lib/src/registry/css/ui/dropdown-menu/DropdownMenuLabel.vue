<script setup lang="ts">
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui';

const props = defineProps<DropdownMenuLabelProps & { inset?: boolean }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    class="sigma-ui-dropdown-menu-label"
    :class="[{ 'sigma-ui-dropdown-menu-label--inset': inset }]"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<style>
.sigma-ui-dropdown-menu-label {
  padding: 0.375rem 0.5rem;
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.sigma-ui-dropdown-menu-label--inset {
  padding-left: 2rem;
}
</style>
