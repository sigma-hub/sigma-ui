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
import type { HeaderCopy, MobileNavLink } from '../data';

defineProps<{
  mobileNavItems: MobileNavLink[];
  breadcrumbLinks: string[];
  breadcrumbPage: string;
  accountMenuGroups: string[][];
  brandName: string;
  header: HeaderCopy;
}>();
</script>

<template>
  <header class="dashboard-products__header">
    <Sheet>
      <SheetTrigger as-child>
        <Button
          size="icon"
          variant="outline"
          class="dashboard-products__menu-button"
        >
          <PanelLeftIcon />
          <span class="dashboard-products__sr-only">{{ header.toggleMenu }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="dashboard-products__sheet"
      >
        <nav class="dashboard-products__mobile-nav">
          <a
            href="#"
            class="dashboard-products__mobile-brand"
          >
            <Package2Icon />
            <span class="dashboard-products__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="item in mobileNavItems"
            :key="item.label"
            href="#"
            class="dashboard-products__mobile-link"
            :class="{ 'dashboard-products__mobile-link--active': item.isActive }"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <Breadcrumb class="dashboard-products__breadcrumb">
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
    <div class="dashboard-products__search">
      <SearchIcon />
      <Input
        type="search"
        :placeholder="header.searchPlaceholder"
        class="dashboard-products__search-input"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="dashboard-products__account-button"
        >
          <CircleUserIcon />
          <span class="dashboard-products__sr-only">{{ header.toggleAccount }}</span>
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
.dashboard-products__header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  height: 3.5rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (width >= 640px) {
  .dashboard-products__header {
    position: static;
    height: auto;
    border-bottom-width: 0;
    background-color: transparent;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}

.dashboard-products .dashboard-products__menu-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

@media (width >= 640px) {
  .dashboard-products .dashboard-products__menu-button {
    display: none;
  }
}

@media (width >= 640px) {
  .dashboard-products__sheet.dashboard-products__sheet {
    max-width: 20rem;
  }
}

.dashboard-products__mobile-nav {
  display: grid;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.dashboard-products__mobile-brand {
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-products__mobile-brand {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-products__mobile-brand svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-products__mobile-brand:hover svg {
  transform: scale(1.1);
}

.dashboard-products__mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
  color: var(--muted-foreground);
}

.dashboard-products__mobile-link:hover,
.dashboard-products__mobile-link--active,
.dashboard-products__mobile-link--active:hover {
  color: var(--foreground);
}

.dashboard-products__mobile-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-products__breadcrumb {
  display: none;
}

@media (width >= 768px) {
  .dashboard-products__breadcrumb {
    display: flex;
  }
}

.dashboard-products__search {
  position: relative;
  margin-left: auto;
  flex: 1 1 0%;
}

@media (width >= 768px) {
  .dashboard-products__search {
    flex-grow: 0;
  }
}

.dashboard-products__search svg {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-products .dashboard-products__search-input {
  width: 100%;
  border-radius: var(--radius);
  background-color: var(--background);
  padding-left: 2rem;
}

@media (width >= 768px) {
  .dashboard-products .dashboard-products__search-input {
    width: 200px;
  }
}

@media (width >= 1024px) {
  .dashboard-products .dashboard-products__search-input {
    width: 320px;
  }
}

.dashboard-products .dashboard-products__account-button {
  border-radius: 9999px;
}

.dashboard-products .dashboard-products__account-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-products__sr-only {
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
