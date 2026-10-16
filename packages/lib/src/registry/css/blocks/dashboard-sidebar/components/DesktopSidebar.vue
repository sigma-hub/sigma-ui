<script setup lang="ts">
import { BellIcon, Package2Icon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import type { NavLink } from '../data';
import UpgradeCard from './UpgradeCard.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  notificationsLabel: string;
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeActionLabel: string;
}>();
</script>

<template>
  <div class="dashboard-sidebar__panel">
    <div class="dashboard-sidebar__panel-inner">
      <div class="dashboard-sidebar__brand-bar">
        <a
          :href="brandHref"
          class="dashboard-sidebar__brand"
        >
          <Package2Icon class="dashboard-sidebar__icon-lg" />
          <span>{{ brandName }}</span>
        </a>
        <Button
          variant="outline"
          size="icon"
          class="dashboard-sidebar__bell"
        >
          <BellIcon class="dashboard-sidebar__icon-sm" />
          <span class="dashboard-sidebar__sr-only">{{ notificationsLabel }}</span>
        </Button>
      </div>
      <div class="dashboard-sidebar__nav-wrap">
        <nav class="dashboard-sidebar__nav">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="dashboard-sidebar__link"
            :class="{ 'dashboard-sidebar__link--active': link.isActive }"
          >
            <component
              :is="link.icon"
              class="dashboard-sidebar__icon-sm"
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
      </div>
      <div class="dashboard-sidebar__upgrade">
        <UpgradeCard
          compact
          :title="upgradeTitle"
          :description="upgradeDescription"
          :action-label="upgradeActionLabel"
        />
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-sidebar__panel {
  display: none;
  border-right: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 40%);
}

.dashboard-sidebar__panel-inner {
  display: flex;
  height: 100%;
  max-height: 100vh;
  flex-direction: column;
  gap: 0.5rem;
}

.dashboard-sidebar__brand-bar {
  display: flex;
  height: 3.5rem;
  align-items: center;
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 1rem;
}

.dashboard-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  font-weight: 600;
  text-decoration: none;
}

.dashboard-sidebar__bell.dashboard-sidebar__bell {
  width: 2rem;
  height: 2rem;
  margin-left: auto;
}

.dashboard-sidebar__nav-wrap {
  flex: 1 1 0%;
}

.dashboard-sidebar__nav {
  display: grid;
  align-items: start;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.dashboard-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  color: hsl(var(--muted-foreground));
  text-decoration: none;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-sidebar__link:hover,
.dashboard-sidebar__link--active:hover {
  color: hsl(var(--primary));
}

.dashboard-sidebar__link--active {
  background-color: hsl(var(--muted));
  color: hsl(var(--primary));
}

.dashboard-sidebar__badge.dashboard-sidebar__badge {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0;
  border-radius: 9999px;
}

.dashboard-sidebar__upgrade {
  margin-top: auto;
  padding: 1rem;
}

.dashboard-sidebar__icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

.dashboard-sidebar__icon-sm {
  width: 1rem;
  height: 1rem;
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

@media (width >= 768px) {
  .dashboard-sidebar__panel {
    display: block;
  }
}

@media (width >= 1024px) {
  .dashboard-sidebar__brand-bar {
    height: 60px;
    padding: 0 1.5rem;
  }

  .dashboard-sidebar__nav {
    padding: 0 1rem;
  }
}
</style>
