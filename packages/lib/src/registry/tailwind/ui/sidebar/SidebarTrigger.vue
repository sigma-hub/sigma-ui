<script setup lang="ts">
import { useAttrs } from 'vue';

import { PanelLeftIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
import { useSidebar } from './utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    data-slot="sidebar-trigger"
    v-bind="delegatedAttrs()"
    data-sidebar="trigger"
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
