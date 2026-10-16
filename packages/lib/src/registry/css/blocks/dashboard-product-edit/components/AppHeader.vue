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
  height: 3.5rem;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
  gap: 1rem;
}

@media (width >= 640px) {
  .dashboard-product-edit__header {
    position: static;
    height: auto;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
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
  width: 1.25rem;
  height: 1.25rem;
}

button.dashboard-product-edit__account-button {
  border-radius: var(--radius-full);
}

.dashboard-product-edit__sheet-nav {
  display: grid;
  font-size: 1.125rem;
  font-weight: 500;
  gap: 1.5rem;
  line-height: 1.75rem;
}

.dashboard-product-edit__sheet-logo {
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  gap: 0.5rem;
  line-height: 1.75rem;
  text-decoration: none;
}

@media (width >= 768px) {
  .dashboard-product-edit__sheet-logo {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-product-edit__sheet-logo svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-product-edit__sheet-logo:hover svg {
  transform: scale(1.1);
}

.dashboard-product-edit__sheet-link {
  display: flex;
  align-items: center;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
  color: var(--muted-foreground);
  gap: 1rem;
  text-decoration: none;
}

.dashboard-product-edit__sheet-link:hover,
.dashboard-product-edit__sheet-link--active {
  color: var(--foreground);
}

.dashboard-product-edit__sheet-link svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.dashboard-product-edit__breadcrumb {
  display: none;
}

@media (width >= 768px) {
  .dashboard-product-edit__breadcrumb {
    display: flex;
  }
}

.dashboard-product-edit__search {
  position: relative;
  flex: 1 1 0%;
  margin-left: auto;
}

@media (width >= 768px) {
  .dashboard-product-edit__search {
    flex-grow: 0;
  }
}

.dashboard-product-edit__search-icon {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

input.dashboard-product-edit__search-input {
  width: 100%;
  padding-left: 2rem;
  border-radius: var(--radius-lg);
  background-color: var(--background);
}

@media (width >= 768px) {
  input.dashboard-product-edit__search-input {
    width: 200px;
  }
}

@media (width >= 1024px) {
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
