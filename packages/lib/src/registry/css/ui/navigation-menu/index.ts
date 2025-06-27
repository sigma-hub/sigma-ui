import { cva } from 'class-variance-authority';

export { default as NavigationMenu } from './NavigationMenu.vue';
export { default as NavigationMenuList } from './NavigationMenuList.vue';
export { default as NavigationMenuItem } from './NavigationMenuItem.vue';
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue';
export { default as NavigationMenuContent } from './NavigationMenuContent.vue';
export { default as NavigationMenuLink } from './NavigationMenuLink.vue';

export const navigationMenuTriggerStyle = cva(
  'sigma-ui-navigation-menu-trigger__base',
);
