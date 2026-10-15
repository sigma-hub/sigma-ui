<script setup lang="ts">
import { PanelLeftIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
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
    :class="cn('size-7', $attrs.class ?? '')"
    @click="toggleSidebar"
  >
    <slot>
      <PanelLeftIcon class="size-4" />
    </slot>
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
