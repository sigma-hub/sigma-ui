<script setup lang="ts">
import { PanelLeftIcon } from '@lucide/vue';
import { VisuallyHidden } from 'reka-ui';
import { Button } from '@ui/registry/css/ui/button';
import { useSidebar } from './utils';

defineSlots<{
  /**
   * Custom trigger icon. Defaults to a panel icon.
   */
  default?: () => unknown;
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    class="sigma-ui-sidebar-trigger"
    @click="toggleSidebar"
  >
    <slot>
      <PanelLeftIcon class="sigma-ui-sidebar-trigger__icon" />
    </slot>
    <VisuallyHidden>Toggle Sidebar</VisuallyHidden>
  </Button>
</template>

<style>
.sigma-ui-button.sigma-ui-sidebar-trigger {
  width: calc(var(--spacing) * 7);
  height: calc(var(--spacing) * 7);
}

.sigma-ui-sidebar-trigger__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
