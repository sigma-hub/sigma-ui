<script setup lang="ts">
import {
  CircleUserIcon,
  Package2Icon,
  PanelLeftIcon,
  SearchIcon,
} from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
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
import { breadcrumbLinks, breadcrumbPage, mobileNavItems } from '../data';
</script>

<template>
  <header class="dashboard-product-edit__header">
    <Sheet>
      <SheetTrigger as-child>
        <Button
          size="icon"
          variant="outline"
          class="dashboard-product-edit__menu-button"
        >
          <PanelLeftIcon />
          <span class="dashboard-product-edit__visually-hidden">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="dashboard-product-edit__sheet"
      >
        <nav class="dashboard-product-edit__sheet-nav">
          <a
            href="#"
            class="dashboard-product-edit__sheet-logo"
          >
            <Package2Icon />
            <span class="dashboard-product-edit__visually-hidden">Acme Inc</span>
          </a>
          <a
            v-for="item in mobileNavItems"
            :key="item.label"
            href="#"
            class="dashboard-product-edit__sheet-link"
            :class="{ 'dashboard-product-edit__sheet-link--active': item.isActive }"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <Breadcrumb class="dashboard-product-edit__breadcrumb">
      <BreadcrumbList>
        <template
          v-for="link in breadcrumbLinks"
          :key="link.label"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <a :href="link.href">{{ link.label }}</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbItem>
          <BreadcrumbPage>{{ breadcrumbPage }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="dashboard-product-edit__search">
      <SearchIcon class="dashboard-product-edit__search-icon" />
      <Input
        type="search"
        placeholder="Search..."
        class="dashboard-product-edit__search-input"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="dashboard-product-edit__account-button"
        >
          <CircleUserIcon />
          <span class="dashboard-product-edit__visually-hidden">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>

<style>
.dashboard-product-edit__header {
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
  .dashboard-product-edit__header {
    position: static;
    height: auto;
    padding-right: calc(var(--spacing) * 6);
    padding-left: calc(var(--spacing) * 6);
    border-bottom-width: 0;
    background-color: transparent;
  }

  button.dashboard-product-edit__menu-button {
    display: none;
  }

  .dashboard-product-edit__sheet.sigma-ui-sheet-content--left {
    max-width: 20rem;
  }
}

button.dashboard-product-edit__menu-button svg,
button.dashboard-product-edit__account-button svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
}

button.dashboard-product-edit__account-button {
  border-radius: var(--radius-full);
}

.dashboard-product-edit__sheet-nav {
  display: grid;
  font-size: 1.125rem;
  font-weight: 500;
  gap: calc(var(--spacing) * 6);
  line-height: 1.75rem;
}

.dashboard-product-edit__sheet-logo {
  display: flex;
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  gap: calc(var(--spacing) * 2);
  line-height: 1.75rem;
  text-decoration: none;
}

@media (width >= 48rem) {
  .dashboard-product-edit__sheet-logo {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-product-edit__sheet-logo svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-product-edit__sheet-logo:hover svg {
  transform: scale(1.1);
}

.dashboard-product-edit__sheet-link {
  display: flex;
  align-items: center;
  padding-right: calc(var(--spacing) * 2.5);
  padding-left: calc(var(--spacing) * 2.5);
  color: var(--muted-foreground);
  gap: calc(var(--spacing) * 4);
  text-decoration: none;
}

.dashboard-product-edit__sheet-link:hover,
.dashboard-product-edit__sheet-link--active {
  color: var(--foreground);
}

.dashboard-product-edit__sheet-link svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  flex-shrink: 0;
}

.dashboard-product-edit__breadcrumb {
  display: none;
}

@media (width >= 48rem) {
  .dashboard-product-edit__breadcrumb {
    display: flex;
  }
}

.dashboard-product-edit__search {
  position: relative;
  flex: 1 1 0%;
  margin-left: auto;
}

@media (width >= 48rem) {
  .dashboard-product-edit__search {
    flex-grow: 0;
  }
}

.dashboard-product-edit__search-icon {
  position: absolute;
  top: calc(var(--spacing) * 2.5);
  left: calc(var(--spacing) * 2.5);
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  color: var(--muted-foreground);
}

input.dashboard-product-edit__search-input {
  width: 100%;
  padding-left: calc(var(--spacing) * 8);
  border-radius: var(--radius-lg);
  background-color: var(--background);
}

@media (width >= 48rem) {
  input.dashboard-product-edit__search-input {
    width: 200px;
  }
}

@media (width >= 64rem) {
  input.dashboard-product-edit__search-input {
    width: 336px;
  }
}

.dashboard-product-edit__visually-hidden {
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
