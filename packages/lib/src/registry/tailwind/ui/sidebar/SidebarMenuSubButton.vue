<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

interface SidebarMenuSubButtonProps extends PrimitiveProps {
  /**
   * Text size of the button.
   */
  size?: 'sm' | 'md';
  /**
   * Marks the button as the current page.
   */
  isActive?: boolean;
}

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'a',
  size: 'md',
  isActive: false,
});

defineSlots<{
  /**
   * Button content, usually a `<span>` label.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="props.isActive"
    :class="cn(
      'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-foreground outline-hidden ring-ring hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 active:bg-secondary active:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-secondary-foreground',
      'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      'group-data-[collapsible=icon]:hidden',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
