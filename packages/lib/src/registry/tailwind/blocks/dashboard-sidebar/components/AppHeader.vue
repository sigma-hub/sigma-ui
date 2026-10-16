<script setup lang="ts">
import type { AccountMenuEntry, NavLink } from '../data';
import MobileNav from './MobileNav.vue';
import SearchForm from './SearchForm.vue';
import UserMenu from './UserMenu.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  navigationLabel: string;
  searchPlaceholder: string;
  menuEntries: AccountMenuEntry[];
  userMenuLabel: string;
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeActionLabel: string;
}>();
</script>

<template>
  <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <MobileNav
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="links"
      :navigation-label="navigationLabel"
      :upgrade-title="upgradeTitle"
      :upgrade-description="upgradeDescription"
      :upgrade-action-label="upgradeActionLabel"
    />
    <SearchForm :placeholder="searchPlaceholder" />
    <UserMenu
      :entries="menuEntries"
      :trigger-label="userMenuLabel"
    />
  </header>
</template>
