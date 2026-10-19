<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { type SidebarMenuButtonVariants, sidebarMenuButtonVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

export interface SidebarMenuButtonProps extends PrimitiveProps {
  /**
   * Visual style of the button.
   */
  variant?: SidebarMenuButtonVariants['variant'];
  /**
   * Height and text size of the button.
   */
  size?: SidebarMenuButtonVariants['size'];
  /**
   * Marks the button as the current page or section.
   */
  isActive?: boolean;
}

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isActive: false,
});
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-button"
    v-bind="delegatedAttrs()"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="props.isActive"
    :as="as"
    :as-child="asChild"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
