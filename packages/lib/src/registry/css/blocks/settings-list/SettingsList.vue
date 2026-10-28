<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { MinusIcon, PlusIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/css/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/css/ui/input-group';
import { Label } from '@ui/registry/css/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/css/ui/select';
import { Switch } from '@ui/registry/css/ui/switch';
import SettingsRow from './components/SettingsRow.vue';
import {
  allSettings,
  categories,
  clearSearchLabel,
  emptyDescription,
  emptyTitle,
  pageDescription,
  pageTitle,
  resetLabel,
  searchPlaceholder,
  searchResultsTitle,
} from './data';
import type { SettingDefinition, SettingValue } from './data';

const activeCategoryId = ref(categories[0].id);
const searchQuery = ref('');

const values = reactive<Record<string, SettingValue>>({});

for (const category of categories) {
  for (const setting of category.settings) {
    if (setting.defaultValue !== undefined) {
      values[setting.id] = setting.defaultValue;
    }

    for (const nested of setting.nested ?? []) {
      values[nested.id] = nested.defaultValue;
    }
  }
}

const activeCategory = computed(() => categories.find(category => category.id === activeCategoryId.value) ?? categories[0]);
const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());
const isSearching = computed(() => normalizedQuery.value.length > 0);

const searchResults = computed(() => allSettings.filter(setting =>
  `${setting.title} ${setting.description} ${setting.categoryTitle}`.toLowerCase().includes(normalizedQuery.value),
));

function selectCategory(categoryId: string) {
  activeCategoryId.value = categoryId;
  searchQuery.value = '';
}

function clearSearch() {
  searchQuery.value = '';
}

function stepValue(setting: SettingDefinition, direction: 1 | -1) {
  const current = Number(values[setting.id]);
  const step = setting.step ?? 1;
  const min = setting.min ?? Number.NEGATIVE_INFINITY;
  const max = setting.max ?? Number.POSITIVE_INFINITY;
  values[setting.id] = Math.min(max, Math.max(min, current + direction * step));
}

function resetValue(setting: SettingDefinition) {
  if (setting.defaultValue !== undefined) {
    values[setting.id] = setting.defaultValue;
  }
}
</script>

<template>
  <div class="settings-list">
    <div class="settings-list__header">
      <div class="settings-list__intro">
        <h2 class="settings-list__title">
          {{ pageTitle }}
        </h2>
        <p class="settings-list__description">
          {{ pageDescription }}
        </p>
      </div>
      <InputGroup class="settings-list__search">
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
          v-if="isSearching"
          align="inline-end"
        >
          <InputGroupButton
            size="icon-xs"
            :aria-label="clearSearchLabel"
            @click="clearSearch"
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>

    <div class="settings-list__layout">
      <nav
        class="settings-list__nav"
        aria-label="Settings categories"
      >
        <Button
          v-for="category in categories"
          :key="category.id"
          variant="ghost"
          class="settings-list__nav-button"
          :class="{ 'settings-list__nav-button--active': !isSearching && activeCategoryId === category.id }"
          :aria-current="!isSearching && activeCategoryId === category.id ? 'page' : undefined"
          @click="selectCategory(category.id)"
        >
          <component
            :is="category.icon"
            aria-hidden="true"
          />
          {{ category.title }}
        </Button>
      </nav>

      <section class="settings-list__content">
        <div class="settings-list__section-header">
          <h3 class="settings-list__section-title">
            {{ isSearching ? searchResultsTitle : activeCategory.title }}
          </h3>
          <p class="settings-list__section-description">
            {{ isSearching ? `${searchResults.length} ${searchResults.length === 1 ? 'setting' : 'settings'} matching “${searchQuery.trim()}”` : activeCategory.description }}
          </p>
        </div>

        <Empty
          v-if="isSearching && searchResults.length === 0"
          class="settings-list__empty"
        >
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>{{ emptyTitle }}</EmptyTitle>
            <EmptyDescription>{{ emptyDescription }}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              size="sm"
              @click="clearSearch"
            >
              {{ clearSearchLabel }}
            </Button>
          </EmptyContent>
        </Empty>

        <div
          v-else
          class="settings-list__list"
        >
          <SettingsRow
            v-for="setting in (isSearching ? searchResults : activeCategory.settings)"
            :key="setting.id"
            :title="setting.title"
            :description="setting.description"
            :icon="setting.icon"
            :wide="setting.kind === 'select'"
          >
            <template
              v-if="isSearching && 'categoryTitle' in setting"
              #title-suffix
            >
              <Badge variant="secondary">
                {{ setting.categoryTitle }}
              </Badge>
            </template>

            <Switch
              v-if="setting.kind === 'switch'"
              :model-value="Boolean(values[setting.id])"
              :aria-label="setting.title"
              @update:model-value="values[setting.id] = $event"
            />

            <Select
              v-else-if="setting.kind === 'select'"
              :model-value="String(values[setting.id])"
              @update:model-value="values[setting.id] = String($event)"
            >
              <SelectTrigger
                class="settings-list__select"
                :aria-label="setting.title"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in setting.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <template v-else-if="setting.kind === 'stepper'">
              <Button
                variant="outline"
                size="icon-sm"
                :aria-label="`Decrease ${setting.title}`"
                :disabled="Number(values[setting.id]) <= (setting.min ?? 0)"
                @click="stepValue(setting, -1)"
              >
                <MinusIcon />
              </Button>
              <span
                class="settings-list__stepper-value"
                aria-live="polite"
              >
                {{ values[setting.id] }}%
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                :aria-label="`Increase ${setting.title}`"
                :disabled="Number(values[setting.id]) >= (setting.max ?? 100)"
                @click="stepValue(setting, 1)"
              >
                <PlusIcon />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                :disabled="values[setting.id] === setting.defaultValue"
                @click="resetValue(setting)"
              >
                {{ resetLabel }}
              </Button>
            </template>

            <Button
              v-else
              variant="outline"
              size="sm"
            >
              {{ setting.buttonLabel }}
            </Button>

            <template
              v-if="setting.kind === 'switch' && setting.nested?.length"
              #nested
            >
              <div
                v-for="nested in setting.nested"
                :key="nested.id"
                class="settings-list__nested-item"
              >
                <Label
                  :for="`settings-list-${nested.id}`"
                  class="settings-list__nested-label"
                >
                  {{ nested.label }}
                </Label>
                <Switch
                  :id="`settings-list-${nested.id}`"
                  :model-value="Boolean(values[nested.id])"
                  :disabled="!values[setting.id]"
                  @update:model-value="values[nested.id] = $event"
                />
              </div>
            </template>
          </SettingsRow>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .settings-list {
    display: flex;
    width: 100%;
    max-width: 64rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .settings-list__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .settings-list__intro {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .settings-list__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .settings-list__description,
  .settings-list__section-description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .settings-list__section-description {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .settings-list__layout {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 6);
  }

  .settings-list__nav {
    display: flex;
    padding-inline: calc(var(--spacing) * 1);
    padding-bottom: calc(var(--spacing) * 1);
    margin-inline: calc(var(--spacing) * -1);
    gap: calc(var(--spacing) * 1);
    overflow-x: auto;
  }

  .settings-list__nav-button.settings-list__nav-button {
    justify-content: flex-start;
    text-align: left;
  }

  .settings-list__nav-button--active.settings-list__nav-button--active,
  .settings-list__nav-button--active.settings-list__nav-button--active:hover {
    background-color: var(--muted);
  }

  .settings-list__content {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .settings-list__section-header {
    display: flex;
    flex-direction: column;
    padding-bottom: calc(var(--spacing) * 4);
    border-bottom: 1px solid var(--border);
    gap: calc(var(--spacing) * 1);
  }

  .settings-list__section-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  .settings-list__empty.settings-list__empty {
    border: 1px dashed var(--border);
  }

  .settings-list__list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .settings-list__select.settings-list__select {
    width: 100%;
  }

  .settings-list__stepper-value {
    width: calc(var(--spacing) * 12);
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    text-align: center;
  }

  .settings-list__nested-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(var(--spacing) * 4);
  }

  .settings-list__nested-label.settings-list__nested-label {
    color: var(--muted-foreground);
    font-weight: 400;
  }

  @media (width >= 40rem) {
    .settings-list {
      padding: calc(var(--spacing) * 6);
    }

    .settings-list__header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    .settings-list__search {
      max-width: 16rem;
    }

    .settings-list__select.settings-list__select {
      width: 11rem;
    }
  }

  @media (width >= 64rem) {
    .settings-list {
      padding: calc(var(--spacing) * 10);
    }

    .settings-list__layout {
      flex-direction: row;
      gap: calc(var(--spacing) * 10);
    }

    .settings-list__nav {
      width: 14rem;
      flex-shrink: 0;
      flex-direction: column;
      padding-inline: 0;
      padding-bottom: 0;
      margin-inline: 0;
      overflow-x: visible;
    }
  }
}
</style>
