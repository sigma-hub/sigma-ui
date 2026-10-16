<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import DesktopSidebar from './components/DesktopSidebar.vue';
import EmptyState from './components/EmptyState.vue';
import {
  accountMenu,
  desktopBrand,
  desktopLinks,
  emptyState,
  inventoryTitle,
  mobileBrand,
  mobileLinks,
  navigationLabel,
  notificationsLabel,
  searchPlaceholder,
  upgradeCard,
  userMenuLabel,
} from './data';
</script>

<template>
  <div class="dashboard-sidebar">
    <DesktopSidebar
      :brand-name="desktopBrand.name"
      :brand-href="desktopBrand.href"
      :links="desktopLinks"
      :notifications-label="notificationsLabel"
      :upgrade-title="upgradeCard.title"
      :upgrade-description="upgradeCard.description"
      :upgrade-action-label="upgradeCard.actionLabel"
    />
    <div class="dashboard-sidebar__body">
      <AppHeader
        :brand-name="mobileBrand.name"
        :brand-href="mobileBrand.href"
        :links="mobileLinks"
        :navigation-label="navigationLabel"
        :search-placeholder="searchPlaceholder"
        :menu-entries="accountMenu"
        :user-menu-label="userMenuLabel"
        :upgrade-title="upgradeCard.title"
        :upgrade-description="upgradeCard.description"
        :upgrade-action-label="upgradeCard.actionLabel"
      />
      <main class="dashboard-sidebar__main">
        <div class="dashboard-sidebar__heading-row">
          <h1 class="dashboard-sidebar__heading">
            {{ inventoryTitle }}
          </h1>
        </div>
        <EmptyState
          :title="emptyState.title"
          :description="emptyState.description"
          :action-label="emptyState.actionLabel"
        />
      </main>
    </div>
  </div>
</template>

<style>
.dashboard-sidebar {
  display: grid;
  width: 100%;
  min-height: 100vh;
}

.dashboard-sidebar__body {
  display: flex;
  flex-direction: column;
}

.dashboard-sidebar__main {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.dashboard-sidebar__heading-row {
  display: flex;
  align-items: center;
}

.dashboard-sidebar__heading {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-sidebar {
    grid-template-columns: 220px 1fr;
  }

  .dashboard-sidebar__heading {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

@media (width >= 1024px) {
  .dashboard-sidebar {
    grid-template-columns: 280px 1fr;
  }

  .dashboard-sidebar__main {
    gap: 1.5rem;
    padding: 1.5rem;
  }
}
</style>
