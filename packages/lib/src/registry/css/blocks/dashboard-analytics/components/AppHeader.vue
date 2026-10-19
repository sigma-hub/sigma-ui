<script setup lang="ts">
import { MenuIcon, Package2Icon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { AccountMenuEntry, NavLink } from '../data';
import SearchForm from './SearchForm.vue';
import UserMenu from './UserMenu.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  searchPlaceholder: string;
  menuEntries: AccountMenuEntry[];
  userMenuLabel: string;
  navigationLabel: string;
}>();
</script>

<template>
  <header class="dashboard-analytics__header">
    <nav class="dashboard-analytics__desktop-nav">
      <a
        :href="brandHref"
        class="dashboard-analytics__brand dashboard-analytics__brand--desktop"
      >
        <Package2Icon class="dashboard-analytics__icon-lg" />
        <span class="dashboard-analytics__sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="dashboard-analytics__desktop-link"
        :class="{ 'dashboard-analytics__desktop-link--active': link.isActive }"
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
          <MenuIcon class="dashboard-analytics__icon-md" />
          <span class="dashboard-analytics__sr-only">{{ navigationLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="dashboard-analytics__mobile-nav">
          <a
            :href="brandHref"
            class="dashboard-analytics__brand"
          >
            <Package2Icon class="dashboard-analytics__icon-lg" />
            <span class="dashboard-analytics__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="dashboard-analytics__mobile-link"
            :class="{ 'dashboard-analytics__mobile-link--muted': !link.isActive }"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="dashboard-analytics__tools">
      <SearchForm :placeholder="searchPlaceholder" />
      <UserMenu
        :entries="menuEntries"
        :trigger-label="userMenuLabel"
      />
    </div>
  </header>
</template>

<style>
@layer components {
  .dashboard-analytics__header {
    position: sticky;
    top: 0;
    display: flex;
    height: calc(var(--spacing) * 16);
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
    background-color: var(--background);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-analytics__desktop-nav {
    display: none;
    font-weight: 500;
  }

  .dashboard-analytics__brand {
    display: flex;
    align-items: center;
    color: inherit;
    font-size: 1.125rem;
    font-weight: 600;
    gap: calc(var(--spacing) * 2);
    line-height: 1.75rem;
    text-decoration: none;
  }

  .dashboard-analytics__desktop-link {
    color: var(--muted-foreground);
    text-decoration: none;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-analytics__desktop-link:hover,
  .dashboard-analytics__desktop-link--active,
  .dashboard-analytics__desktop-link--active:hover {
    color: var(--foreground);
  }

  .dashboard-analytics__mobile-nav {
    display: grid;
    font-size: 1.125rem;
    font-weight: 500;
    gap: calc(var(--spacing) * 6);
    line-height: 1.75rem;
  }

  .dashboard-analytics__mobile-link {
    color: var(--foreground);
    text-decoration: none;
  }

  .dashboard-analytics__mobile-link:hover,
  .dashboard-analytics__mobile-link--muted:hover {
    color: var(--foreground);
  }

  .dashboard-analytics__mobile-link--muted {
    color: var(--muted-foreground);
  }

  .dashboard-analytics__tools {
    display: flex;
    width: 100%;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-analytics__menu-button {
    flex-shrink: 0;
  }

  .dashboard-analytics__icon-lg {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }

  .dashboard-analytics__icon-md {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-analytics__sr-only {
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

  @media (width >= 48rem) {
    .dashboard-analytics__header {
      padding: 0 calc(var(--spacing) * 6);
    }

    .dashboard-analytics__desktop-nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.875rem;
      gap: calc(var(--spacing) * 5);
      line-height: 1.25rem;
    }

    .dashboard-analytics__brand--desktop {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .dashboard-analytics__tools {
      margin-left: auto;
      gap: calc(var(--spacing) * 2);
    }

    .dashboard-analytics__menu-button.dashboard-analytics__menu-button {
      display: none;
    }
  }

  @media (width >= 64rem) {
    .dashboard-analytics__desktop-nav {
      gap: calc(var(--spacing) * 6);
    }

    .dashboard-analytics__tools {
      gap: calc(var(--spacing) * 4);
    }
  }
}
</style>
