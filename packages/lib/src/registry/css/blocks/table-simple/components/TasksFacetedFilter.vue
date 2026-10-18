<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import type { Component } from 'vue';
import { computed, ref } from 'vue';
import { CheckIcon, CirclePlusIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@ui/registry/css/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Separator } from '@ui/registry/css/ui/separator';
import { clearFiltersLabel, noFilterResultsLabel, selectedCountLabel, type Task } from '../data';

const props = defineProps<{
  column?: Column<Task, unknown>;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: Component;
  }[];
}>();

const search = ref('');
const facets = computed(() => props.column?.getFacetedUniqueValues());
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[] | undefined));
const filteredOptions = computed(() => props.options.filter(option => option.label.toLowerCase().includes(search.value.toLowerCase())));

function toggleOption(value: string) {
  const next = new Set(selectedValues.value);

  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }

  const filterValues = [...next];
  props.column?.setFilterValue(filterValues.length ? filterValues : undefined);
}

function clearFilters() {
  props.column?.setFilterValue(undefined);
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="table-simple__filter-button"
      >
        <CirclePlusIcon class="table-simple__filter-icon" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator
            orientation="vertical"
            class="table-simple__filter-separator"
          />
          <Badge
            variant="secondary"
            class="table-simple__filter-count table-simple__filter-count--compact"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="table-simple__filter-badges">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="table-simple__filter-count"
            >
              {{ selectedValues.size }} {{ selectedCountLabel }}
            </Badge>
            <template v-else>
              <Badge
                v-for="option in options.filter(option => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="table-simple__filter-count"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="table-simple__filter-popover"
      align="start"
    >
      <Command>
        <CommandInput
          v-model="search"
          :placeholder="title"
        />
        <CommandList>
          <CommandEmpty>{{ noFilterResultsLabel }}</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in filteredOptions"
              :key="option.value"
              :value="option.value"
              @select="toggleOption(option.value)"
            >
              <div
                class="table-simple__check"
                :class="{ 'table-simple__check--selected': selectedValues.has(option.value) }"
              >
                <CheckIcon class="table-simple__check-icon" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="table-simple__option-icon"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="table-simple__facet-count"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>
          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                value="clear-filters"
                class="table-simple__clear"
                @select="clearFilters"
              >
                {{ clearFiltersLabel }}
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<style>
.table-simple__filter-button {
  height: 2rem;
  border-style: dashed;
}

.table-simple__filter-icon,
.table-simple__option-icon,
.table-simple__check-icon {
  width: 1rem;
  height: 1rem;
}

.table-simple__filter-icon,
.table-simple__option-icon {
  margin-right: 0.5rem;
}

.table-simple__option-icon {
  color: var(--muted-foreground);
}

.table-simple__filter-separator {
  height: 1rem;
  margin: 0 0.5rem;
}

.table-simple__filter-count {
  padding: 0 0.25rem;
  border-radius: calc(var(--radius) - 4px);
  font-weight: 400;
}

.table-simple__filter-badges {
  display: none;
  gap: 0.25rem;
}

.table-simple__filter-popover {
  width: 200px;
  padding: 0;
}

.table-simple__check {
  display: flex;
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  border-radius: calc(var(--radius) - 4px);
  margin-right: 0.5rem;
  opacity: 0.5;
}

.table-simple__check .table-simple__check-icon {
  visibility: hidden;
}

.table-simple__check--selected {
  background: var(--primary);
  color: var(--primary-foreground);
  opacity: 1;
}

.table-simple__check--selected .table-simple__check-icon {
  visibility: visible;
}

.table-simple__facet-count {
  display: flex;
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
}

.table-simple__clear {
  justify-content: center;
  text-align: center;
}

@media (width >= 64rem) {
  .table-simple__filter-count--compact {
    display: none;
  }

  .table-simple__filter-badges {
    display: flex;
  }
}
</style>
