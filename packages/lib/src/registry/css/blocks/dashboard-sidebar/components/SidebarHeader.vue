<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
import { Input } from '@ui/registry/css/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { SidebarLink } from '../data';

defineProps<{
  brandName: string;
  links: SidebarLink[];
  searchPlaceholder: string;
  menuLabel: string;
  accountLabel: string;
  accountMenuLabel: string;
  accountMenuGroups: string[][];
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeAction: string;
}>();

function linkClass(isActive: boolean) {
  return isActive ? 'dashboard-sidebar__mobile-link--active' : 'dashboard-sidebar__mobile-link--muted';
}
</script>

<template>
  <header class="dashboard-sidebar__header">
    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="dashboard-sidebar__menu"
        >
          <MenuIcon />
          <span class="dashboard-sidebar__sr-only">{{ menuLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="dashboard-sidebar__sheet"
      >
        <nav class="dashboard-sidebar__mobile-nav">
          <a
            href="#"
            class="dashboard-sidebar__mobile-brand"
          >
            <Package2Icon />
            <span class="dashboard-sidebar__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="dashboard-sidebar__mobile-link"
            :class="linkClass(link.isActive)"
          >
            <component :is="link.icon" />
            {{ link.label }}
            <Badge
              v-if="link.badge"
              class="dashboard-sidebar__badge"
            >
              {{ link.badge }}
            </Badge>
          </a>
        </nav>
        <div class="dashboard-sidebar__sheet-upgrade">
          <Card>
            <CardHeader>
              <CardTitle>{{ upgradeTitle }}</CardTitle>
              <CardDescription>
                {{ upgradeDescription }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                class="dashboard-sidebar__upgrade-button"
              >
                {{ upgradeAction }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
    <div class="dashboard-sidebar__search-wrap">
      <form>
        <div class="dashboard-sidebar__search-field">
          <SearchIcon class="dashboard-sidebar__search-icon" />
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="dashboard-sidebar__search-input"
          />
        </div>
      </form>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="dashboard-sidebar__account"
        >
          <CircleUserIcon />
          <span class="dashboard-sidebar__sr-only">{{ accountLabel }}</span>
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
  </header>
</template>

<style>
.dashboard-sidebar__header {
  display: flex;
  height: 3.5rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 40%);
  padding: 0 1rem;
}

@media (width >= 1024px) {
  .dashboard-sidebar__header {
    height: 60px;
    padding: 0 1.5rem;
  }
}

.dashboard-sidebar__menu {
  flex-shrink: 0;
}

@media (width >= 768px) {
  .dashboard-sidebar__menu {
    display: none;
  }
}

.dashboard-sidebar__menu svg,
.dashboard-sidebar__account svg,
.dashboard-sidebar__mobile-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-sidebar__sheet {
  display: flex;
  flex-direction: column;
}

.dashboard-sidebar__mobile-nav {
  display: grid;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.dashboard-sidebar__mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

.dashboard-sidebar__mobile-brand svg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-sidebar__mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: -0.65rem;
  margin-left: -0.65rem;
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
}

.dashboard-sidebar__mobile-link:hover {
  color: hsl(var(--foreground));
}

.dashboard-sidebar__mobile-link--muted {
  color: hsl(var(--muted-foreground));
}

.dashboard-sidebar__mobile-link--active {
  background-color: hsl(var(--muted));
  color: hsl(var(--foreground));
}

.dashboard-sidebar__badge {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border-radius: 9999px;
}

.dashboard-sidebar__sheet-upgrade {
  margin-top: auto;
}

.dashboard-sidebar__upgrade-button {
  width: 100%;
}

.dashboard-sidebar__search-wrap {
  width: 100%;
  flex: 1 1 0%;
}

.dashboard-sidebar__search-field {
  position: relative;
}

.dashboard-sidebar__search-icon {
  position: absolute;
  left: 0.625rem;
  top: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}

.dashboard-sidebar__search-input {
  width: 100%;
  appearance: none;
  background-color: hsl(var(--background));
  padding-left: 2rem;
  box-shadow: none;
}

@media (width >= 768px) {
  .dashboard-sidebar__search-input {
    width: 66.666667%;
  }
}

@media (width >= 1024px) {
  .dashboard-sidebar__search-input {
    width: 33.333333%;
  }
}

.dashboard-sidebar__account {
  border-radius: 9999px;
}

.dashboard-sidebar__sr-only {
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
