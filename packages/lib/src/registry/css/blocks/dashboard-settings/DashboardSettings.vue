<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import PluginsDirectoryCard from './components/PluginsDirectoryCard.vue';
import SettingsNav from './components/SettingsNav.vue';
import StoreNameCard from './components/StoreNameCard.vue';
import {
  accountMenu,
  brandHref,
  brandName,
  headerLinks,
  navigationLabel,
  pageTitle,
  pluginsDirectoryCard,
  searchPlaceholder,
  settingsLinks,
  storeNameCard,
  userMenuLabel,
} from './data';
</script>

<template>
  <div class="dashboard-settings">
    <AppHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :menu-entries="accountMenu"
      :user-menu-label="userMenuLabel"
      :navigation-label="navigationLabel"
    />
    <main class="dashboard-settings__main">
      <div class="dashboard-settings__intro">
        <h1 class="dashboard-settings__title">
          {{ pageTitle }}
        </h1>
      </div>
      <div class="dashboard-settings__layout">
        <SettingsNav :links="settingsLinks" />
        <div class="dashboard-settings__cards">
          <StoreNameCard
            :title="storeNameCard.title"
            :description="storeNameCard.description"
            :placeholder="storeNameCard.placeholder"
            :save-label="storeNameCard.saveLabel"
          />
          <PluginsDirectoryCard
            :title="pluginsDirectoryCard.title"
            :description="pluginsDirectoryCard.description"
            :placeholder="pluginsDirectoryCard.placeholder"
            :directory="pluginsDirectoryCard.directory"
            :checkbox-id="pluginsDirectoryCard.checkboxId"
            :checkbox-label="pluginsDirectoryCard.checkboxLabel"
            :include-checked="pluginsDirectoryCard.includeChecked"
            :save-label="pluginsDirectoryCard.saveLabel"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-settings {
    display: flex;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
  }

  .dashboard-settings__main {
    display: flex;
    min-height: calc(100vh - 4rem);
    flex: 1 1 0%;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    background-color: color-mix(in oklch, var(--muted) 40%, transparent);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-settings__intro,
  .dashboard-settings__layout {
    display: grid;
    width: 100%;
    max-width: 72rem;
    margin-right: auto;
    margin-left: auto;
  }

  .dashboard-settings__intro {
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-settings__layout {
    align-items: start;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-settings__title {
    margin: 0;
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 2.25rem;
  }

  .dashboard-settings__cards {
    display: grid;
    gap: calc(var(--spacing) * 6);
  }

  @media (width >= 48rem) {
    .dashboard-settings__main {
      padding: calc(var(--spacing) * 10);
      gap: calc(var(--spacing) * 8);
    }

    .dashboard-settings__layout {
      grid-template-columns: 180px 1fr;
    }
  }

  @media (width >= 64rem) {
    .dashboard-settings__layout {
      grid-template-columns: 250px 1fr;
    }
  }
}
</style>
