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
  <header class="dashboard-sidebar__header">
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

<style>
.dashboard-sidebar__header {
  display: flex;
  height: 3.5rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  background-color: color-mix(in oklch, var(--muted) 40%, transparent);
  padding: 0 1rem;
}

@media (width >= 1024px) {
  .dashboard-sidebar__header {
    height: 60px;
    padding: 0 1.5rem;
  }
}
</style>
