<script setup lang="ts">
import { computed, ref } from 'vue';
import { CheckIcon, CirclePlusIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@ui/registry/tailwind/ui/command';

const props = withDefaults(defineProps<{
  title: string;
  options: string[];
  modelValue: string[];
  maxBadges?: number;
  allowCreate?: boolean;
  minWidth?: number;
}>(), {
  maxBadges: 2,
  allowCreate: false,
  minWidth: 200,
});

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
  'create': [value: string];
}>();

const searchQuery = ref('');
const commandKey = ref(0);

const trimmedSearchQuery = computed(() => searchQuery.value.trim());
const selectedValues = computed(() => new Set(props.modelValue));
const filteredOptions = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase();
  if (!normalizedSearch) return props.options;
  return props.options.filter(option => option.toLowerCase().includes(normalizedSearch));
});

const canCreate = computed(() => {
  if (!props.allowCreate) return false;
  const value = trimmedSearchQuery.value;
  if (value.length === 0) return false;
  const normalizedValue = value.toLowerCase();
  return !props.options.some(option => option.toLowerCase() === normalizedValue);
});

const selectedBadges = computed(() => {
  return props.options.filter(option => selectedValues.value.has(option)).slice(0, props.maxBadges);
});

const contentStyle = computed(() => props.minWidth ? ({ minWidth: `${props.minWidth}px` }) : undefined);

function toggleValue(value: string) {
  const next = new Set(props.modelValue);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  emit('update:modelValue', Array.from(next));
}

function createFromSearchQuery() {
  const value = trimmedSearchQuery.value;
  if (!value) return;
  emit('create', value);
  clearSearch();
  commandKey.value += 1;
}

function clearSearch() {
  searchQuery.value = '';
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="xs"
        class="gap-2 border-dashed"
      >
        <CirclePlusIcon class="size-3.5" />
        {{ props.title }}
        <template v-if="selectedValues.size > 0">
          <Separator
            orientation="vertical"
            class="mx-1.5 h-3.5"
          />
          <span class="inline-flex h-4 items-center justify-center rounded-md bg-secondary px-1.5 text-[11px] text-secondary-foreground lg:hidden">
            {{ selectedValues.size }}
          </span>
          <div class="hidden gap-1.5 lg:flex">
            <span
              v-for="badge in selectedBadges"
              :key="badge"
              class="inline-flex h-4 items-center justify-center rounded-md bg-secondary px-1.5 text-[11px] text-secondary-foreground"
            >
              {{ badge }}
            </span>
            <span
              v-if="selectedValues.size > props.maxBadges"
              class="inline-flex h-4 items-center justify-center rounded-md bg-secondary px-1.5 text-[11px] text-secondary-foreground"
            >
              +{{ selectedValues.size - props.maxBadges }}
            </span>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="w-80 p-0"
      align="start"
      :style="contentStyle"
    >
      <Command :key="commandKey">
        <CommandInput
          v-model="searchQuery"
          :placeholder="props.title"
          @keydown.esc="clearSearch"
        />
        <CommandList>
          <CommandEmpty v-if="filteredOptions.length === 0 && !canCreate">
            No results found.
          </CommandEmpty>
          <div
            v-if="canCreate"
            class="p-2.5"
          >
            <Button
              variant="outline"
              size="sm"
              class="w-full justify-start gap-2"
              @click="createFromSearchQuery"
            >
              <CirclePlusIcon class="size-4" />
              Add {{ trimmedSearchQuery }}
            </Button>
          </div>
          <CommandGroup>
            <CommandItem
              v-for="option in filteredOptions"
              :key="option"
              :value="option"
              @select="() => toggleValue(option)"
            >
              <div
                :class="cn(
                  'mr-2.5 flex size-4 shrink-0 items-center justify-center rounded border border-border opacity-60',
                  selectedValues.has(option) && 'border-primary/60 bg-primary/15 opacity-100',
                )"
              >
                <CheckIcon
                  :class="cn(
                    'size-3.5 text-primary',
                    !selectedValues.has(option) && 'invisible',
                  )"
                />
              </div>
              <span class="truncate select-text">{{ option }}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator v-if="$slots.footer" />
          <div
            v-if="$slots.footer"
            class="px-2.5 pb-3 pt-2.5"
          >
            <slot name="footer" />
          </div>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
