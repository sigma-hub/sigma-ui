<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
import { Input } from '@ui/registry/css/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { AccountMenuEntry, NavLink } from '../data';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  searchPlaceholder: string;
  navigationLabel: string;
  userMenuLabel: string;
  accountMenu: AccountMenuEntry[];
}>();

function desktopLinkClass(isActive?: boolean) {
  return isActive ? 'dashboard-analytics__link--active' : 'dashboard-analytics__link--muted';
}

function mobileLinkClass(isActive?: boolean) {
  return isActive ? undefined : 'dashboard-analytics__link--muted';
}
</script>

<template>
  <header class="dashboard-analytics__header">
    <nav class="dashboard-analytics__nav">
      <a
        :href="brandHref"
        class="dashboard-analytics__brand"
      >
        <Package2Icon />
        <span class="dashboard-analytics__sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="dashboard-analytics__link"
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
          class="dashboard-analytics__menu-button"
        >
          <MenuIcon />
          <span class="dashboard-analytics__sr-only">{{ navigationLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="dashboard-analytics__mobile-nav">
          <a
            :href="brandHref"
            class="dashboard-analytics__mobile-brand"
          >
            <Package2Icon />
            <span class="dashboard-analytics__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="dashboard-analytics__mobile-link"
            :class="mobileLinkClass(link.isActive)"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="dashboard-analytics__toolbar">
      <form class="dashboard-analytics__search">
        <div class="dashboard-analytics__search-field">
          <SearchIcon class="dashboard-analytics__search-icon" />
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="dashboard-analytics__search-input"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="secondary"
            size="icon"
            class="dashboard-analytics__account"
          >
            <CircleUserIcon />
            <span class="dashboard-analytics__sr-only">{{ userMenuLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <template
            v-for="entry in accountMenu"
            :key="entry.id"
          >
            <DropdownMenuLabel v-if="entry.kind === 'label'">
              {{ entry.label }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
            <DropdownMenuItem v-else-if="entry.kind === 'action'">
              {{ entry.label }}
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<style>
.dashboard-analytics__header {
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
  .dashboard-analytics__header {
    padding: 0 1.5rem;
  }
}

.dashboard-analytics__nav {
  display: none;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-analytics__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__nav {
    gap: 1.5rem;
  }
}

.dashboard-analytics__brand,
.dashboard-analytics__mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-analytics__brand {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-analytics__brand svg,
.dashboard-analytics__mobile-brand svg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-analytics__menu-button svg,
.dashboard-analytics__account svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-analytics__link,
.dashboard-analytics__mobile-link {
  color: hsl(var(--foreground));
  transition-duration: 150ms;
  transition-property: color;
}

.dashboard-analytics__link:hover,
.dashboard-analytics__mobile-link:hover {
  color: hsl(var(--foreground));
}

.dashboard-analytics__link--muted,
.dashboard-analytics__mobile-link.dashboard-analytics__link--muted {
  color: hsl(var(--muted-foreground));
}

.dashboard-analytics__menu-button {
  flex-shrink: 0;
}

@media (width >= 768px) {
  .dashboard-analytics__menu-button {
    display: none;
  }
}

.dashboard-analytics__mobile-nav {
  display: grid;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.dashboard-analytics__toolbar {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-analytics__toolbar {
    margin-left: auto;
    gap: 0.5rem;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__toolbar {
    gap: 1rem;
  }
}

.dashboard-analytics__search {
  margin-left: auto;
  flex: 1 1 0%;
}

@media (width >= 640px) {
  .dashboard-analytics__search {
    flex: 0 1 auto;
  }
}

.dashboard-analytics__search-field {
  position: relative;
}

.dashboard-analytics__search-icon {
  position: absolute;
  left: 0.625rem;
  top: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-analytics__search-input {
  padding-left: 2rem;
}

@media (width >= 640px) {
  .dashboard-analytics__search-input {
    width: 300px;
  }
}

@media (width >= 768px) {
  .dashboard-analytics__search-input {
    width: 200px;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__search-input {
    width: 300px;
  }
}

.dashboard-analytics__account {
  border-radius: 9999px;
}

.dashboard-analytics__sr-only {
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
