<script setup lang="ts">
import { MenuIcon, Package2Icon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/css/ui/sheet';
import type { NavLink } from '../data';
import UpgradeCard from './UpgradeCard.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  navigationLabel: string;
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeActionLabel: string;
}>();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="dashboard-sidebar__menu-button"
      >
        <MenuIcon class="dashboard-sidebar__icon-md" />
        <span class="dashboard-sidebar__sr-only">{{ navigationLabel }}</span>
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      class="dashboard-sidebar__sheet"
    >
      <nav class="dashboard-sidebar__mobile-nav">
        <a
          :href="brandHref"
          class="dashboard-sidebar__mobile-brand"
        >
          <Package2Icon class="dashboard-sidebar__icon-lg" />
          <span class="dashboard-sidebar__sr-only">{{ brandName }}</span>
        </a>
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="dashboard-sidebar__mobile-link"
          :class="{ 'dashboard-sidebar__mobile-link--active': link.isActive }"
        >
          <component
            :is="link.icon"
            class="dashboard-sidebar__icon-md"
          />
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
        <UpgradeCard
          :title="upgradeTitle"
          :description="upgradeDescription"
          :action-label="upgradeActionLabel"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>

<style>
.dashboard-sidebar__menu-button {
  flex-shrink: 0;
}

.dashboard-sidebar__sheet.dashboard-sidebar__sheet {
  display: flex;
  flex-direction: column;
}

.dashboard-sidebar__mobile-nav {
  display: grid;
  font-size: 1.125rem;
  font-weight: 500;
  gap: 0.5rem;
  line-height: 1.75rem;
}

.dashboard-sidebar__mobile-brand {
  display: flex;
  align-items: center;
  color: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  gap: 0.5rem;
  line-height: 1.75rem;
  text-decoration: none;
}

.dashboard-sidebar__mobile-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: calc(var(--radius) + 4px);
  margin-right: -0.65rem;
  margin-left: -0.65rem;
  color: var(--muted-foreground);
  gap: 1rem;
  text-decoration: none;
}

.dashboard-sidebar__mobile-link:hover {
  color: var(--foreground);
}

.dashboard-sidebar__mobile-link--active {
  background-color: var(--muted);
  color: var(--foreground);
}

.dashboard-sidebar__mobile-link--active:hover {
  color: var(--foreground);
}

.dashboard-sidebar__badge.dashboard-sidebar__badge {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 9999px;
  margin-left: auto;
}

.dashboard-sidebar__sheet-upgrade {
  margin-top: auto;
}

.dashboard-sidebar__icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-sidebar__icon-md {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-sidebar__sr-only {
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

@media (width >= 768px) {
  .dashboard-sidebar__menu-button.dashboard-sidebar__menu-button {
    display: none;
  }
}
</style>
