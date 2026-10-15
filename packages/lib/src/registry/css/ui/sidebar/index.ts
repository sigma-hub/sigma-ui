import { type VariantProps, cva } from 'class-variance-authority';

export { default as Sidebar } from './Sidebar.vue';
export { default as SidebarContent } from './SidebarContent.vue';
export { default as SidebarFooter } from './SidebarFooter.vue';
export { default as SidebarGroup } from './SidebarGroup.vue';
export { default as SidebarGroupAction } from './SidebarGroupAction.vue';
export { default as SidebarGroupContent } from './SidebarGroupContent.vue';
export { default as SidebarGroupLabel } from './SidebarGroupLabel.vue';
export { default as SidebarHeader } from './SidebarHeader.vue';
export { default as SidebarInput } from './SidebarInput.vue';
export { default as SidebarInset } from './SidebarInset.vue';
export { default as SidebarMenu } from './SidebarMenu.vue';
export { default as SidebarMenuAction } from './SidebarMenuAction.vue';
export { default as SidebarMenuBadge } from './SidebarMenuBadge.vue';
export { default as SidebarMenuButton } from './SidebarMenuButton.vue';
export { default as SidebarMenuItem } from './SidebarMenuItem.vue';
export { default as SidebarMenuSkeleton } from './SidebarMenuSkeleton.vue';
export { default as SidebarMenuSub } from './SidebarMenuSub.vue';
export { default as SidebarMenuSubButton } from './SidebarMenuSubButton.vue';
export { default as SidebarMenuSubItem } from './SidebarMenuSubItem.vue';
export { default as SidebarProvider } from './SidebarProvider.vue';
export { default as SidebarRail } from './SidebarRail.vue';
export { default as SidebarSeparator } from './SidebarSeparator.vue';
export { default as SidebarTrigger } from './SidebarTrigger.vue';

export { useSidebar } from './utils';
export type { SidebarContext, SidebarState } from './utils';

export const sidebarMenuButtonVariants = cva(
  'sigma-ui-sidebar-menu-button',
  {
    variants: {
      variant: {
        default: 'sigma-ui-sidebar-menu-button--default',
        outline: 'sigma-ui-sidebar-menu-button--outline',
      },
      size: {
        default: 'sigma-ui-sidebar-menu-button--size-default',
        sm: 'sigma-ui-sidebar-menu-button--size-sm',
        lg: 'sigma-ui-sidebar-menu-button--size-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
