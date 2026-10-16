<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
import { Input } from '@ui/registry/css/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { NavLink } from '../data';

defineProps<{
  brandName: string;
  links: NavLink[];
  searchPlaceholder: string;
  menuLabel: string;
  accountLabel: string;
  accountMenuLabel: string;
  accountMenuGroups: string[][];
}>();

function desktopLinkClass(isActive: boolean) {
  return isActive ? 'dashboard-settings__link--active' : 'dashboard-settings__link--muted';
}

function mobileLinkClass(isActive: boolean) {
  return isActive ? undefined : 'dashboard-settings__link--muted';
}
</script>

<template>
  <header class="dashboard-settings__header">
    <nav class="dashboard-settings__nav">
      <a
        href="#"
        class="dashboard-settings__brand"
      >
        <Package2Icon />
        <span class="dashboard-settings__sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        href="#"
        class="dashboard-settings__link"
        :class="desktopLinkClass(link.isActive)"
      >
        {{ link.label }}
      </a>
    </nav>
    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="dashboard-settings__menu-button"
        >
          <MenuIcon />
          <span class="dashboard-settings__sr-only">{{ menuLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="dashboard-settings__mobile-nav">
          <a
            href="#"
            class="dashboard-settings__mobile-brand"
          >
            <Package2Icon />
            <span class="dashboard-settings__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            href="#"
            class="dashboard-settings__mobile-link"
            :class="mobileLinkClass(link.isActive)"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="dashboard-settings__toolbar">
      <form class="dashboard-settings__search">
        <div class="dashboard-settings__search-field">
          <SearchIcon class="dashboard-settings__search-icon" />
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="dashboard-settings__search-input"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="secondary"
            size="icon"
            class="dashboard-settings__account"
          >
            <CircleUserIcon />
            <span class="dashboard-settings__sr-only">{{ accountLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{{ accountMenuLabel }}</DropdownMenuLabel>
          <template
            v-for="group in accountMenuGroups"
            :key="group.join('-')"
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="item in group"
              :key="item"
            >
              {{ item }}
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<style>
.dashboard-settings__header {
  position: sticky;
  top: 0;
  display: flex;
  height: 4rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0 1rem;
}

@media (width >= 768px) {
  .dashboard-settings__header {
    padding: 0 1.5rem;
  }
}

.dashboard-settings__nav {
  display: none;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-settings__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

@media (width >= 1024px) {
  .dashboard-settings__nav {
    gap: 1.5rem;
  }
}

.dashboard-settings__brand,
.dashboard-settings__mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-settings__brand {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-settings__brand svg,
.dashboard-settings__mobile-brand svg,
.dashboard-settings__menu-button svg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-settings__menu-button svg,
.dashboard-settings__account svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-settings__link,
.dashboard-settings__mobile-link {
  color: hsl(var(--foreground));
  transition-duration: 150ms;
  transition-property: color;
}

.dashboard-settings__link:hover,
.dashboard-settings__mobile-link:hover {
  color: hsl(var(--foreground));
}

.dashboard-settings__link--muted,
.dashboard-settings__mobile-link.dashboard-settings__link--muted {
  color: hsl(var(--muted-foreground));
}

.dashboard-settings__menu-button {
  flex-shrink: 0;
}

@media (width >= 768px) {
  .dashboard-settings__menu-button {
    display: none;
  }
}

.dashboard-settings__mobile-nav {
  display: grid;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.dashboard-settings__toolbar {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-settings__toolbar {
    margin-left: auto;
    gap: 0.5rem;
  }
}

@media (width >= 1024px) {
  .dashboard-settings__toolbar {
    gap: 1rem;
  }
}

.dashboard-settings__search {
  margin-left: auto;
  flex: 1 1 0%;
}

@media (width >= 640px) {
  .dashboard-settings__search {
    flex: 0 1 auto;
  }
}

.dashboard-settings__search-field {
  position: relative;
}

.dashboard-settings__search-icon {
  position: absolute;
  left: 0.625rem;
  top: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-settings__search-input {
  padding-left: 2rem;
}

@media (width >= 640px) {
  .dashboard-settings__search-input {
    width: 300px;
  }
}

@media (width >= 768px) {
  .dashboard-settings__search-input {
    width: 200px;
  }
}

@media (width >= 1024px) {
  .dashboard-settings__search-input {
    width: 300px;
  }
}

.dashboard-settings__account {
  border-radius: 9999px;
}

.dashboard-settings__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
