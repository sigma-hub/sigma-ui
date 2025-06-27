<script setup lang="ts">
import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'reka-ui';

const props = defineProps<MenubarSeparatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSeparator
    class="sigma-ui-menubar-separator"
    v-bind="forwardedProps"
  />
</template>

<style>
.sigma-ui-menubar-separator {
  margin-inline: -0.25rem;
  margin-block: 0.25rem;
  height: 1px;
  background-color: hsl(var(--muted));
}
</style>
