<script setup lang="ts">
import type { Component } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/registry/css/ui/tooltip';
import SidebarMenuButtonChild, { type SidebarMenuButtonProps } from './SidebarMenuButtonChild.vue';
import { useSidebar } from './utils';

interface Props extends SidebarMenuButtonProps {
  /**
   * Tooltip shown when the sidebar is collapsed to icons. Accepts a string or a component.
   */
  tooltip?: string | Component;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isActive: false,
  tooltip: undefined,
});

defineSlots<{
  /**
   * Button content, usually an icon followed by a `<span>` label.
   */
  default?: () => unknown;
}>();

const { isMobile, state } = useSidebar();

const delegatedProps = reactiveOmit(props, 'tooltip');
</script>

<template>
  <SidebarMenuButtonChild
    v-if="!tooltip"
    data-slot="sidebar-menu-button"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot />
  </SidebarMenuButtonChild>

  <Tooltip
    v-else
    data-slot="sidebar-menu-button"
  >
    <TooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot />
      </SidebarMenuButtonChild>
    </TooltipTrigger>
    <TooltipContent
      side="right"
      align="center"
      :hidden="state !== 'collapsed' || isMobile"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component
        :is="tooltip"
        v-else
      />
    </TooltipContent>
  </Tooltip>
</template>
