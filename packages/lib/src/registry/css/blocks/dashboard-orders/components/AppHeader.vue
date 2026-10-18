<script setup lang="ts">
import {
  CircleUserIcon,
  Package2Icon,
  PanelLeftIcon,
  SearchIcon,
} from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
import { Input } from '@ui/registry/css/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/registry/css/ui/breadcrumb';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { HeaderCopy, NavItem } from '../data';

defineProps<{
  mobileNavItems: NavItem[];
  breadcrumbLinks: string[];
  breadcrumbPage: string;
  accountMenuGroups: string[][];
  brandName: string;
  header: HeaderCopy;
}>();
</script>

<template>
  <header class="dashboard-orders__header">
    <Sheet>
      <SheetTrigger as-child>
        <Button
          size="icon"
          variant="outline"
          class="dashboard-orders__menu-button"
        >
          <PanelLeftIcon />
          <span class="dashboard-orders__sr-only">{{ header.toggleMenu }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="dashboard-orders__sheet"
      >
        <nav class="dashboard-orders__mobile-nav">
          <a
            href="#"
            class="dashboard-orders__mobile-brand"
          >
            <Package2Icon />
            <span class="dashboard-orders__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="item in mobileNavItems"
            :key="item.label"
            href="#"
            class="dashboard-orders__mobile-link"
            :class="{ 'dashboard-orders__mobile-link--active': item.isActive }"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <Breadcrumb class="dashboard-orders__breadcrumb">
      <BreadcrumbList>
        <template
          v-for="link in breadcrumbLinks"
          :key="link"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <a href="#">{{ link }}</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbItem>
          <BreadcrumbPage>{{ breadcrumbPage }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="dashboard-orders__search">
      <SearchIcon />
      <Input
        type="search"
        :placeholder="header.searchPlaceholder"
        class="dashboard-orders__search-input"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="dashboard-orders__account-button"
        >
          <CircleUserIcon />
          <span class="dashboard-orders__sr-only">{{ header.toggleAccount }}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{{ header.accountLabel }}</DropdownMenuLabel>
        <template
          v-for="(group, groupIndex) in accountMenuGroups"
          :key="groupIndex"
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
.dashboard-orders__header {
  position: sticky;
  z-index: 30;
  top: 0;
  display: flex;
  height: calc(var(--spacing) * 14);
  align-items: center;
  padding-right: calc(var(--spacing) * 4);
  padding-left: calc(var(--spacing) * 4);
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  gap: calc(var(--spacing) * 4);
}

@media (width >= 40rem) {
  .dashboard-orders__header {
    position: static;
    height: auto;
    padding-right: calc(var(--spacing) * 6);
    padding-left: calc(var(--spacing) * 6);
    border-bottom-width: 0;
    background-color: transparent;
  }
}

.dashboard-orders .dashboard-orders__menu-button svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
}

@media (width >= 40rem) {
  .dashboard-orders .dashboard-orders__menu-button {
    display: none;
  }
}

@media (width >= 40rem) {
  .dashboard-orders__sheet.dashboard-orders__sheet {
    max-width: 20rem;
  }
}

.dashboard-orders__mobile-nav {
  display: grid;
  font-size: 1.125rem;
  font-weight: 500;
  gap: calc(var(--spacing) * 6);
  line-height: 1.75rem;
}

.dashboard-orders__mobile-brand {
  display: flex;
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  gap: calc(var(--spacing) * 2);
  line-height: 1.75rem;
}

@media (width >= 48rem) {
  .dashboard-orders__mobile-brand {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-orders__mobile-brand svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-orders__mobile-brand:hover svg {
  transform: scale(1.1);
}

.dashboard-orders__mobile-link {
  display: flex;
  align-items: center;
  padding-right: calc(var(--spacing) * 2.5);
  padding-left: calc(var(--spacing) * 2.5);
  color: var(--muted-foreground);
  gap: calc(var(--spacing) * 4);
}

.dashboard-orders__mobile-link:hover,
.dashboard-orders__mobile-link--active,
.dashboard-orders__mobile-link--active:hover {
  color: var(--foreground);
}

.dashboard-orders__mobile-link svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
}

.dashboard-orders__breadcrumb {
  display: none;
}

@media (width >= 48rem) {
  .dashboard-orders__breadcrumb {
    display: flex;
  }
}

.dashboard-orders__search {
  position: relative;
  flex: 1 1 0%;
  margin-left: auto;
}

@media (width >= 48rem) {
  .dashboard-orders__search {
    flex-grow: 0;
  }
}

.dashboard-orders__search svg {
  position: absolute;
  top: calc(var(--spacing) * 2.5);
  left: calc(var(--spacing) * 2.5);
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  color: var(--muted-foreground);
}

.dashboard-orders .dashboard-orders__search-input {
  width: 100%;
  padding-left: calc(var(--spacing) * 8);
  border-radius: var(--radius);
  background-color: var(--background);
}

@media (width >= 48rem) {
  .dashboard-orders .dashboard-orders__search-input {
    width: 200px;
  }
}

@media (width >= 64rem) {
  .dashboard-orders .dashboard-orders__search-input {
    width: 336px;
  }
}

.dashboard-orders .dashboard-orders__account-button {
  border-radius: 9999px;
}

.dashboard-orders .dashboard-orders__account-button svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
}

.dashboard-orders__sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
