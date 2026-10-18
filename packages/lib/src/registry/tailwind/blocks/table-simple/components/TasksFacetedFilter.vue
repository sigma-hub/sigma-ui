<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';
import type { Component } from 'vue';
import { computed, ref } from 'vue';
import { CheckIcon, CirclePlusIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@ui/registry/tailwind/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Separator } from '@ui/registry/tailwind/ui/separator';
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
        class="h-8 border-dashed"
      >
        <CirclePlusIcon class="mr-2 size-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator
            orientation="vertical"
            class="mx-2 h-4"
          />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden gap-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} {{ selectedCountLabel }}
            </Badge>
            <template v-else>
              <Badge
                v-for="option in options.filter(option => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-[200px] p-0"
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
                :class="cn(
                  'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <CheckIcon class="size-4" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 size-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
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
                class="justify-center text-center"
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
