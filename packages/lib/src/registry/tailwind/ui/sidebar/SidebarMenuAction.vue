<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

interface SidebarMenuActionProps extends PrimitiveProps {
  /**
   * Shows the action only while the menu item is hovered or focused.
   */
  showOnHover?: boolean;
}

withDefaults(defineProps<SidebarMenuActionProps>(), {
  as: 'button',
  showOnHover: false,
});

defineSlots<{
  /**
   * Action icon. Add a visually hidden label for screen readers.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 md:after:hidden',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      showOnHover && 'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
