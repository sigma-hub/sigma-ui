<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { PackageSearchIcon, RefreshCwIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/tailwind/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/tailwind/ui/input-group';
import { Skeleton } from '@ui/registry/tailwind/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs';
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
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6">
    <header class="flex flex-col gap-1">
      <h2 class="text-2xl leading-8 font-bold tracking-tight">
        {{ pageTitle }}
      </h2>
      <p class="text-muted-foreground">
        {{ pageDescription }}
      </p>
    </header>

    <Tabs
      v-model="activeTab"
      class="flex flex-col gap-6"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TabsList class="w-full justify-start sm:w-auto">
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

        <div class="flex items-center gap-2">
          <InputGroup class="sm:w-64">
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
            <RefreshCwIcon :class="{ 'animate-spin': isRefreshing }" />
          </Button>
        </div>
      </div>

      <div
        class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
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
        class="flex flex-col gap-8"
      >
        <div
          v-if="isRefreshing && activeTab === tab.value"
          class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
        >
          <Skeleton
            v-for="index in 6"
            :key="index"
            class="h-48"
          />
        </div>

        <template v-else-if="activeTab === tab.value">
          <section
            v-if="featuredApps.length > 0"
            class="flex flex-col gap-4"
          >
            <h3 class="text-lg leading-7 font-semibold">
              Featured
            </h3>
            <ul class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
            class="flex flex-col gap-4"
          >
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-lg leading-7 font-semibold">
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
            <ul class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
            class="border border-dashed"
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
