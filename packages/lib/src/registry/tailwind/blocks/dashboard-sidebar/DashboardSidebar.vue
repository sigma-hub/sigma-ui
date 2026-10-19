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
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <DesktopSidebar
      :brand-name="desktopBrand.name"
      :brand-href="desktopBrand.href"
      :links="desktopLinks"
      :notifications-label="notificationsLabel"
      :upgrade-title="upgradeCard.title"
      :upgrade-description="upgradeCard.description"
      :upgrade-action-label="upgradeCard.actionLabel"
    />
    <div class="flex flex-col">
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
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">
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
