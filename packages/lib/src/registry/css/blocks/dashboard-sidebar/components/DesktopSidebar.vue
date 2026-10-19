<script setup lang="ts">
import { BellIcon, Package2Icon } from '@lucide/vue';
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
@layer base, components;

@layer components {
  .dashboard-sidebar__panel {
    display: none;
    border-right: 1px solid var(--border);
    background-color: color-mix(in oklch, var(--muted) 40%, transparent);
  }

  .dashboard-sidebar__panel-inner {
    display: flex;
    height: 100%;
    max-height: 100vh;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-sidebar__brand-bar {
    display: flex;
    height: calc(var(--spacing) * 14);
    align-items: center;
    padding: 0 calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
  }

  .dashboard-sidebar__brand {
    display: flex;
    align-items: center;
    color: inherit;
    font-weight: 600;
    gap: calc(var(--spacing) * 2);
    text-decoration: none;
  }

  .dashboard-sidebar__bell.dashboard-sidebar__bell {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    margin-left: auto;
  }

  .dashboard-sidebar__nav-wrap {
    flex: 1 1 0%;
  }

  .dashboard-sidebar__nav {
    display: grid;
    align-items: start;
    padding: 0 calc(var(--spacing) * 2);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  .dashboard-sidebar__link {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    border-radius: var(--radius);
    color: var(--muted-foreground);
    gap: calc(var(--spacing) * 3);
    text-decoration: none;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-sidebar__link:hover,
  .dashboard-sidebar__link--active:hover {
    color: var(--primary);
  }

  .dashboard-sidebar__link--active {
    background-color: var(--muted);
    color: var(--primary);
  }

  .dashboard-sidebar__badge.dashboard-sidebar__badge {
    display: flex;
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 9999px;
    margin-left: auto;
  }

  .dashboard-sidebar__upgrade {
    padding: calc(var(--spacing) * 4);
    margin-top: auto;
  }

  .dashboard-sidebar__icon-lg {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }

  .dashboard-sidebar__icon-sm {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
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

  @media (width >= 48rem) {
    .dashboard-sidebar__panel {
      display: block;
    }
  }

  @media (width >= 64rem) {
    .dashboard-sidebar__brand-bar {
      height: 60px;
      padding: 0 calc(var(--spacing) * 6);
    }

    .dashboard-sidebar__nav {
      padding: 0 calc(var(--spacing) * 4);
    }
  }
}
</style>
