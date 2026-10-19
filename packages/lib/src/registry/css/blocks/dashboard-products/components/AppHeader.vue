<script setup lang="ts">
import {
  CircleUserIcon,
  Package2Icon,
  PanelLeftIcon,
  SearchIcon,
} from '@lucide/vue';
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
@layer components {
  .dashboard-products__header {
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
    .dashboard-products__header {
      position: static;
      height: auto;
      padding-right: calc(var(--spacing) * 6);
      padding-left: calc(var(--spacing) * 6);
      border-bottom-width: 0;
      background-color: transparent;
    }
  }

  .dashboard-products .dashboard-products__menu-button svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  @media (width >= 40rem) {
    .dashboard-products .dashboard-products__menu-button {
      display: none;
    }
  }

  @media (width >= 40rem) {
    .dashboard-products__sheet.dashboard-products__sheet {
      max-width: 20rem;
    }
  }

  .dashboard-products__mobile-nav {
    display: grid;
    font-size: 1.125rem;
    font-weight: 500;
    gap: calc(var(--spacing) * 6);
    line-height: 1.75rem;
  }

  .dashboard-products__mobile-brand {
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
    .dashboard-products__mobile-brand {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  .dashboard-products__mobile-brand svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-products__mobile-brand:hover svg {
    transform: scale(1.1);
  }

  .dashboard-products__mobile-link {
    display: flex;
    align-items: center;
    padding-right: calc(var(--spacing) * 2.5);
    padding-left: calc(var(--spacing) * 2.5);
    color: var(--muted-foreground);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-products__mobile-link:hover,
  .dashboard-products__mobile-link--active,
  .dashboard-products__mobile-link--active:hover {
    color: var(--foreground);
  }

  .dashboard-products__mobile-link svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-products__breadcrumb {
    display: none;
  }

  @media (width >= 48rem) {
    .dashboard-products__breadcrumb {
      display: flex;
    }
  }

  .dashboard-products__search {
    position: relative;
    flex: 1 1 0%;
    margin-left: auto;
  }

  @media (width >= 48rem) {
    .dashboard-products__search {
      flex-grow: 0;
    }
  }

  .dashboard-products__search svg {
    position: absolute;
    top: calc(var(--spacing) * 2.5);
    left: calc(var(--spacing) * 2.5);
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-products .dashboard-products__search-input {
    width: 100%;
    padding-left: calc(var(--spacing) * 8);
    border-radius: var(--radius);
    background-color: var(--background);
  }

  @media (width >= 48rem) {
    .dashboard-products .dashboard-products__search-input {
      width: 200px;
    }
  }

  @media (width >= 64rem) {
    .dashboard-products .dashboard-products__search-input {
      width: 320px;
    }
  }

  .dashboard-products .dashboard-products__account-button {
    border-radius: 9999px;
  }

  .dashboard-products .dashboard-products__account-button svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-products__sr-only {
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
}
</style>
