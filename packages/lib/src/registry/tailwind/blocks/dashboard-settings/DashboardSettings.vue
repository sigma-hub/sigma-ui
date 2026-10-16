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
  <div class="flex min-h-screen w-full flex-col">
    <AppHeader
      :brand-name="brandName"
      :brand-href="brandHref"
      :links="headerLinks"
      :search-placeholder="searchPlaceholder"
      :menu-entries="accountMenu"
      :user-menu-label="userMenuLabel"
      :navigation-label="navigationLabel"
    />
    <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <h1 class="text-3xl font-semibold">
          {{ pageTitle }}
        </h1>
      </div>
      <div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SettingsNav :links="settingsLinks" />
        <div class="grid gap-6">
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
