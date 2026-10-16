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
        class="tasks-table__filter-button"
      >
        <CirclePlusIcon class="tasks-table__filter-icon" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator
            orientation="vertical"
            class="tasks-table__filter-separator"
          />
          <Badge
            variant="secondary"
            class="tasks-table__filter-count tasks-table__filter-count--compact"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="tasks-table__filter-badges">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="tasks-table__filter-count"
            >
              {{ selectedValues.size }} {{ selectedCountLabel }}
            </Badge>
            <template v-else>
              <Badge
                v-for="option in options.filter(option => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="tasks-table__filter-count"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="tasks-table__filter-popover"
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
                class="tasks-table__check"
                :class="{ 'tasks-table__check--selected': selectedValues.has(option.value) }"
              >
                <CheckIcon class="tasks-table__check-icon" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="tasks-table__option-icon"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="tasks-table__facet-count"
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
                class="tasks-table__clear"
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
.tasks-table__filter-button {
  height: 2rem;
  border-style: dashed;
}

.tasks-table__filter-icon,
.tasks-table__option-icon,
.tasks-table__check-icon {
  width: 1rem;
  height: 1rem;
}

.tasks-table__filter-icon,
.tasks-table__option-icon {
  margin-right: 0.5rem;
}

.tasks-table__option-icon {
  color: var(--muted-foreground);
}

.tasks-table__filter-separator {
  height: 1rem;
  margin: 0 0.5rem;
}

.tasks-table__filter-count {
  padding: 0 0.25rem;
  border-radius: calc(var(--radius) - 4px);
  font-weight: 400;
}

.tasks-table__filter-badges {
  display: none;
  gap: 0.25rem;
}

.tasks-table__filter-popover {
  width: 200px;
  padding: 0;
}

.tasks-table__check {
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

.tasks-table__check .tasks-table__check-icon {
  visibility: hidden;
}

.tasks-table__check--selected {
  background: var(--primary);
  color: var(--primary-foreground);
  opacity: 1;
}

.tasks-table__check--selected .tasks-table__check-icon {
  visibility: visible;
}

.tasks-table__facet-count {
  display: flex;
  width: 1rem;
  height: 1rem;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
}

.tasks-table__clear {
  justify-content: center;
  text-align: center;
}

@media (width >= 1024px) {
  .tasks-table__filter-count--compact {
    display: none;
  }

  .tasks-table__filter-badges {
    display: flex;
  }
}
</style>
