<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { PackageSearchIcon, RefreshCwIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/css/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/css/ui/input-group';
import { Skeleton } from '@ui/registry/css/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/css/ui/tabs';
import MarketplaceCard from './components/MarketplaceCard.vue';
import { categories, initialApps, pageDescription, pageTitle, searchPlaceholder } from './data';
import type { MarketplaceApp, MarketplaceTab } from './data';

const apps = ref<MarketplaceApp[]>(initialApps.map(app => ({ ...app })));
const activeTab = ref<MarketplaceTab>('browse');
const category = ref('all');
const searchQuery = ref('');
const isRefreshing = ref(false);

const timers = new Map<string, ReturnType<typeof setInterval>>();
let refreshTimer: ReturnType<typeof setTimeout> | undefined;

const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());
const isFiltering = computed(() => normalizedQuery.value.length > 0 || category.value !== 'all');

const matchingApps = computed(() => {
  return apps.value.filter((app) => {
    const matchesCategory = category.value === 'all' || app.category === category.value;
    const matchesQuery = normalizedQuery.value.length === 0
      || [app.name, app.publisher, app.description, app.category].some(value => value.toLowerCase().includes(normalizedQuery.value));

    return matchesCategory && matchesQuery;
  });
});

function hasUpdate(app: MarketplaceApp) {
  return app.installed && app.installedVersion !== app.version;
}

const installedCount = computed(() => apps.value.filter(app => app.installed).length);
const updateCount = computed(() => apps.value.filter(hasUpdate).length);

const tabs = computed(() => [
  { value: 'browse' as const, label: 'Browse', count: undefined },
  { value: 'installed' as const, label: 'Installed', count: installedCount.value },
  { value: 'updates' as const, label: 'Updates', count: updateCount.value },
]);

const visibleApps = computed(() => {
  if (activeTab.value === 'installed') {
    return matchingApps.value.filter(app => app.installed);
  }

  if (activeTab.value === 'updates') {
    return matchingApps.value.filter(hasUpdate);
  }

  return matchingApps.value;
});

const featuredApps = computed(() => {
  return activeTab.value === 'browse' && !isFiltering.value ? apps.value.filter(app => app.featured) : [];
});

const emptyState = computed(() => {
  if (isFiltering.value) {
    return {
      title: 'No integrations found',
      description: 'Try a different keyword or category.',
      action: 'Clear filters',
    };
  }

  if (activeTab.value === 'installed') {
    return {
      title: 'Nothing installed yet',
      description: 'Installed integrations will show up here.',
      action: 'Browse integrations',
    };
  }

  return {
    title: 'Everything is up to date',
    description: 'You are running the latest version of every integration.',
    action: 'Browse integrations',
  };
});

function findApp(id: string) {
  return apps.value.find(app => app.id === id);
}

function stopTimer(id: string) {
  const timer = timers.get(id);

  if (timer !== undefined) {
    clearInterval(timer);
  }

  timers.delete(id);
}

// Simulates a download. Replace this with your real install or update request.
function startOperation(id: string) {
  const app = findApp(id);

  if (!app || app.progress !== null) {
    return;
  }

  app.progress = 0;
  timers.set(id, setInterval(() => {
    app.progress = Math.min(100, (app.progress ?? 0) + 20);

    if (app.progress >= 100) {
      stopTimer(id);
      Object.assign(app, { installed: true, installedVersion: app.version, progress: null });
    }
  }, 450));
}

function cancelOperation(id: string) {
  const app = findApp(id);
  stopTimer(id);

  if (app) {
    app.progress = null;
  }
}

function uninstall(id: string) {
  const app = findApp(id);

  if (app) {
    Object.assign(app, { installed: false, installedVersion: undefined });
  }
}

function updateAll() {
  apps.value.filter(hasUpdate).forEach(app => startOperation(app.id));
}

function refresh() {
  isRefreshing.value = true;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    isRefreshing.value = false;
  }, 900);
}

function clearFilters() {
  searchQuery.value = '';
  category.value = 'all';
}

function handleEmptyAction() {
  if (isFiltering.value) {
    clearFilters();
    return;
  }

  activeTab.value = 'browse';
}

onBeforeUnmount(() => {
  timers.forEach(timer => clearInterval(timer));
  timers.clear();
  clearTimeout(refreshTimer);
});
</script>

<template>
  <div class="dashboard-sfm-marketplace">
    <header class="dashboard-sfm-marketplace__header">
      <h2 class="dashboard-sfm-marketplace__title">
        {{ pageTitle }}
      </h2>
      <p class="dashboard-sfm-marketplace__description">
        {{ pageDescription }}
      </p>
    </header>

    <Tabs
      v-model="activeTab"
      class="dashboard-sfm-marketplace__tabs"
    >
      <div class="dashboard-sfm-marketplace__toolbar">
        <TabsList class="dashboard-sfm-marketplace__tabs-list">
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
          >
            {{ tab.label }}
            <Badge
              v-if="tab.count"
              variant="secondary"
            >
              {{ tab.count }}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div class="dashboard-sfm-marketplace__search-row">
          <InputGroup class="dashboard-sfm-marketplace__search">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              :aria-label="searchPlaceholder"
            />
            <InputGroupAddon
              v-if="searchQuery"
              align="inline-end"
            >
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear search"
                @click="searchQuery = ''"
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Button
            variant="outline"
            size="icon"
            aria-label="Refresh integrations"
            :disabled="isRefreshing"
            @click="refresh"
          >
            <RefreshCwIcon :class="{ 'dashboard-sfm-marketplace__refresh-icon--spinning': isRefreshing }" />
          </Button>
        </div>
      </div>

      <div
        class="dashboard-sfm-marketplace__categories"
        role="group"
        aria-label="Categories"
      >
        <Button
          v-for="item in categories"
          :key="item.value"
          :variant="category === item.value ? 'secondary' : 'outline'"
          size="sm"
          :aria-pressed="category === item.value"
          @click="category = item.value"
        >
          {{ item.label }}
        </Button>
      </div>

      <TabsContent
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="dashboard-sfm-marketplace__panel"
      >
        <div
          v-if="isRefreshing && activeTab === tab.value"
          class="dashboard-sfm-marketplace__grid"
          aria-busy="true"
        >
          <Skeleton
            v-for="index in 6"
            :key="index"
            class="dashboard-sfm-marketplace__skeleton"
          />
        </div>

        <template v-else-if="activeTab === tab.value">
          <section
            v-if="featuredApps.length > 0"
            class="dashboard-sfm-marketplace__section"
          >
            <h3 class="dashboard-sfm-marketplace__section-title">
              Featured
            </h3>
            <ul class="dashboard-sfm-marketplace__grid">
              <li
                v-for="app in featuredApps"
                :key="app.id"
              >
                <MarketplaceCard
                  :app="app"
                  @install="startOperation"
                  @update="startOperation"
                  @cancel="cancelOperation"
                />
              </li>
            </ul>
          </section>

          <section
            v-if="visibleApps.length > 0"
            class="dashboard-sfm-marketplace__section"
          >
            <div class="dashboard-sfm-marketplace__section-header">
              <h3 class="dashboard-sfm-marketplace__section-title">
                {{ tab.value === 'browse' ? (featuredApps.length > 0 ? 'All integrations' : 'Integrations') : tab.label }}
              </h3>
              <Button
                v-if="tab.value === 'updates' && updateCount > 1"
                variant="outline"
                size="sm"
                @click="updateAll"
              >
                Update all
              </Button>
            </div>
            <ul class="dashboard-sfm-marketplace__grid">
              <li
                v-for="app in visibleApps"
                :key="app.id"
              >
                <MarketplaceCard
                  :app="app"
                  :manage="tab.value === 'installed'"
                  @install="startOperation"
                  @update="startOperation"
                  @uninstall="uninstall"
                  @cancel="cancelOperation"
                />
              </li>
            </ul>
          </section>

          <Empty
            v-else
            class="dashboard-sfm-marketplace__empty"
          >
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearchIcon />
              </EmptyMedia>
              <EmptyTitle>{{ emptyState.title }}</EmptyTitle>
              <EmptyDescription>{{ emptyState.description }}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="outline"
                size="sm"
                @click="handleEmptyAction"
              >
                {{ emptyState.action }}
              </Button>
            </EmptyContent>
          </Empty>
        </template>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-sfm-marketplace {
    display: flex;
    width: 100%;
    max-width: 72rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-sfm-marketplace__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-sfm-marketplace__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .dashboard-sfm-marketplace__description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .dashboard-sfm-marketplace__tabs {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-sfm-marketplace__toolbar {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-sfm-marketplace__tabs-list.dashboard-sfm-marketplace__tabs-list {
    width: 100%;
    justify-content: flex-start;
  }

  .dashboard-sfm-marketplace__search-row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-sfm-marketplace__search {
    flex: 1;
  }

  .dashboard-sfm-marketplace__refresh-icon--spinning {
    animation: dashboard-sfm-marketplace-spin 1s linear infinite;
  }

  @keyframes dashboard-sfm-marketplace-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .dashboard-sfm-marketplace__categories {
    display: flex;
    padding-inline: calc(var(--spacing) * 4);
    padding-bottom: calc(var(--spacing) * 1);
    margin-inline: calc(var(--spacing) * -4);
    gap: calc(var(--spacing) * 2);
    overflow-x: auto;
  }

  .dashboard-sfm-marketplace__panel {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 8);
  }

  .dashboard-sfm-marketplace__section {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-sfm-marketplace__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-sfm-marketplace__section-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  .dashboard-sfm-marketplace__grid {
    display: grid;
    padding: 0;
    margin: 0;
    gap: calc(var(--spacing) * 4);
    list-style: none;
  }

  .dashboard-sfm-marketplace__skeleton.dashboard-sfm-marketplace__skeleton {
    height: calc(var(--spacing) * 48);
  }

  .dashboard-sfm-marketplace__empty.dashboard-sfm-marketplace__empty {
    border: 1px dashed var(--border);
  }

  @media (width >= 40rem) {
    .dashboard-sfm-marketplace {
      padding: calc(var(--spacing) * 6);
    }

    .dashboard-sfm-marketplace__toolbar {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .dashboard-sfm-marketplace__tabs-list.dashboard-sfm-marketplace__tabs-list {
      width: auto;
    }

    .dashboard-sfm-marketplace__search {
      width: calc(var(--spacing) * 64);
      flex: none;
    }

    .dashboard-sfm-marketplace__categories {
      padding-inline: 0;
      margin-inline: 0;
      flex-wrap: wrap;
    }

    .dashboard-sfm-marketplace__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (width >= 64rem) {
    .dashboard-sfm-marketplace__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>
