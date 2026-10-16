<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="props"
    class="sigma-ui-drawer-description"
    :class="[$attrs.class]"
    data-slot="drawer-description"
  >
    <slot />
  </DrawerDescription>
</template>

<style>
.sigma-ui-drawer-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
