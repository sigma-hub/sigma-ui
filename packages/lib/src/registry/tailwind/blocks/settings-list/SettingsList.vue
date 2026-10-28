<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { MinusIcon, PlusIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/tailwind/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/tailwind/ui/input-group';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import { Switch } from '@ui/registry/tailwind/ui/switch';
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
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 lg:p-10">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl leading-8 font-bold tracking-tight">
          {{ pageTitle }}
        </h2>
        <p class="text-muted-foreground">
          {{ pageDescription }}
        </p>
      </div>
      <InputGroup class="sm:max-w-64">
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

    <div class="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <nav
        class="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        aria-label="Settings categories"
      >
        <Button
          v-for="category in categories"
          :key="category.id"
          variant="ghost"
          class="justify-start text-left"
          :class="{ 'bg-muted hover:bg-muted': !isSearching && activeCategoryId === category.id }"
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

      <section class="flex min-w-0 flex-1 flex-col gap-4">
        <div class="flex flex-col gap-1 border-b pb-4">
          <h3 class="text-lg leading-7 font-semibold">
            {{ isSearching ? searchResultsTitle : activeCategory.title }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ isSearching ? `${searchResults.length} ${searchResults.length === 1 ? 'setting' : 'settings'} matching “${searchQuery.trim()}”` : activeCategory.description }}
          </p>
        </div>

        <Empty
          v-if="isSearching && searchResults.length === 0"
          class="border border-dashed"
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
          class="flex flex-col gap-3"
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
                class="w-full sm:w-44"
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
                class="w-12 text-center text-sm font-medium tabular-nums"
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
                class="flex items-center justify-between gap-4"
              >
                <Label
                  :for="`settings-list-${nested.id}`"
                  class="font-normal text-muted-foreground"
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
