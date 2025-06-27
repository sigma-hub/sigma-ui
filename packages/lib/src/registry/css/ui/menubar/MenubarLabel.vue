<script setup lang="ts">
import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';

const props = defineProps<MenubarLabelProps & { inset?: boolean }>();
</script>

<template>
  <MenubarLabel
    class="sigma-ui-menubar-label"
    :class="[{ 'sigma-ui-menubar-label--inset': inset }, $attrs.class]"
  >
    <slot />
  </MenubarLabel>
</template>

<style>
.sigma-ui-menubar-label {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.sigma-ui-menubar-label--inset {
  padding-left: 2rem;
}
</style>
