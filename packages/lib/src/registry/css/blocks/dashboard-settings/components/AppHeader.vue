<script setup lang="ts">
import { MenuIcon, Package2Icon } from 'lucide-vue-next';
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
  <header class="dashboard-settings__header">
    <nav class="dashboard-settings__desktop-nav">
      <a
        :href="brandHref"
        class="dashboard-settings__brand dashboard-settings__brand--desktop"
      >
        <Package2Icon class="dashboard-settings__icon-lg" />
        <span class="dashboard-settings__sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="dashboard-settings__desktop-link"
        :class="{ 'dashboard-settings__desktop-link--active': link.isActive }"
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
          <MenuIcon class="dashboard-settings__icon-md" />
          <span class="dashboard-settings__sr-only">{{ navigationLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="dashboard-settings__mobile-nav">
          <a
            :href="brandHref"
            class="dashboard-settings__brand"
          >
            <Package2Icon class="dashboard-settings__icon-lg" />
            <span class="dashboard-settings__sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="dashboard-settings__mobile-link"
            :class="{ 'dashboard-settings__mobile-link--muted': !link.isActive }"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="dashboard-settings__tools">
      <SearchForm :placeholder="searchPlaceholder" />
      <UserMenu
        :entries="menuEntries"
        :trigger-label="userMenuLabel"
      />
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

.dashboard-settings__desktop-nav {
  display: none;
  font-weight: 500;
}

.dashboard-settings__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  text-decoration: none;
}

.dashboard-settings__desktop-link {
  color: hsl(var(--muted-foreground));
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-settings__desktop-link:hover,
.dashboard-settings__desktop-link--active,
.dashboard-settings__desktop-link--active:hover {
  color: hsl(var(--foreground));
}

.dashboard-settings__mobile-nav {
  display: grid;
  gap: 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
}

.dashboard-settings__mobile-link {
  color: hsl(var(--foreground));
  text-decoration: none;
}

.dashboard-settings__mobile-link:hover,
.dashboard-settings__mobile-link--muted:hover {
  color: hsl(var(--foreground));
}

.dashboard-settings__mobile-link--muted {
  color: hsl(var(--muted-foreground));
}

.dashboard-settings__tools {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}

.dashboard-settings__menu-button {
  flex-shrink: 0;
}

.dashboard-settings__icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-settings__icon-md {
  width: 1.25rem;
  height: 1.25rem;
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

@media (width >= 768px) {
  .dashboard-settings__header {
    padding: 0 1.5rem;
  }

  .dashboard-settings__desktop-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dashboard-settings__brand--desktop {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .dashboard-settings__tools {
    margin-left: auto;
    gap: 0.5rem;
  }

  .dashboard-settings__menu-button.dashboard-settings__menu-button {
    display: none;
  }
}

@media (width >= 1024px) {
  .dashboard-settings__desktop-nav {
    gap: 1.5rem;
  }

  .dashboard-settings__tools {
    gap: 1rem;
  }
}
</style>
