<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'vaul-vue';
import { DrawerDescription } from 'vaul-vue';

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="props"
    class="sigma-ui-drawer-description"
  >
    <slot />
  </DrawerDescription>
</template>

<style>
.sigma-ui-drawer-description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
