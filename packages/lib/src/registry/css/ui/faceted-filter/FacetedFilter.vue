<script setup lang="ts">
import { computed, ref } from 'vue';
import { CheckIcon, CirclePlusIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Separator } from '@ui/registry/css/ui/separator';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@ui/registry/css/ui/command';

const props = withDefaults(defineProps<{
  /** Label of the trigger button, also used as the search placeholder. */
  title: string;
  /** Values the user can pick from. */
  options: string[];
  /** Currently selected values; use with `v-model`. */
  modelValue: string[];
  /** Maximum number of selected values shown as badges in the trigger before collapsing into a "+N" badge. */
  maxBadges?: number;
  /** Shows an "Add" button that emits `create` when the search text matches no option. */
  allowCreate?: boolean;
  /** Minimum width of the dropdown, in pixels. */
  minWidth?: number;
}>(), {
  maxBadges: 2,
  allowCreate: false,
  minWidth: 200,
});

const emit = defineEmits<{
  /** Emitted with the new selection when an option is toggled. */
  'update:modelValue': [value: string[]];
  /** Emitted with the trimmed search text when the user clicks the "Add" button. */
  'create': [value: string];
}>();

defineSlots<{
  /** Content rendered below the options, separated by a divider. */
  footer?: () => unknown;
}>();

const searchQuery = ref('');
const commandKey = ref(0);

const trimmedSearchQuery = computed(() => searchQuery.value.trim());
const selectedValues = computed(() => new Set(props.modelValue));
const filteredOptions = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase();

  if (!normalizedSearch) {
    return props.options;
  }

  return props.options.filter(option => option.toLowerCase().includes(normalizedSearch));
});

const canCreate = computed(() => {
  if (!props.allowCreate) {
    return false;
  }

  const value = trimmedSearchQuery.value;

  if (value.length === 0) {
    return false;
  }

  const normalizedValue = value.toLowerCase();
  return !props.options.some(option => option.toLowerCase() === normalizedValue);
});

const selectedBadges = computed(() => {
  return props.options.filter(option => selectedValues.value.has(option)).slice(0, props.maxBadges);
});

const contentStyle = computed(() => props.minWidth ? ({ minWidth: `${props.minWidth}px` }) : undefined);

function toggleValue(value: string) {
  const next = new Set(props.modelValue);

  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }

  emit('update:modelValue', Array.from(next));
}

function createFromSearchQuery() {
  const value = trimmedSearchQuery.value;

  if (!value) {
    return;
  }

  emit('create', value);
  clearSearch();
  commandKey.value += 1;
}

function clearSearch() {
  searchQuery.value = '';
}
</script>

<template>
  <Popover
    data-slot="faceted-filter"
  >
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="xs"
        class="sigma-ui-faceted-filter__trigger"
      >
        <CirclePlusIcon class="sigma-ui-faceted-filter__trigger-icon" />
        {{ props.title }}
        <template v-if="selectedValues.size > 0">
          <Separator
            orientation="vertical"
            class="sigma-ui-faceted-filter__separator"
          />
          <span class="sigma-ui-faceted-filter__count">
            {{ selectedValues.size }}
          </span>
          <div class="sigma-ui-faceted-filter__badges">
            <span
              v-for="badge in selectedBadges"
              :key="badge"
              class="sigma-ui-faceted-filter__badge"
            >
              {{ badge }}
            </span>
            <span
              v-if="selectedValues.size > props.maxBadges"
              class="sigma-ui-faceted-filter__badge"
            >
              +{{ selectedValues.size - props.maxBadges }}
            </span>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="sigma-ui-faceted-filter__content"
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
            class="sigma-ui-faceted-filter__empty-create"
          >
            <Button
              variant="outline"
              size="sm"
              class="sigma-ui-faceted-filter__empty-create-button"
              @click="createFromSearchQuery"
            >
              <CirclePlusIcon class="sigma-ui-faceted-filter__empty-create-icon" />
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
                class="sigma-ui-faceted-filter__checkbox"
                :data-selected="selectedValues.has(option) || undefined"
              >
                <CheckIcon class="sigma-ui-faceted-filter__check" />
              </div>
              <span class="sigma-ui-faceted-filter__option-text">{{ option }}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator v-if="$slots.footer" />
          <div
            v-if="$slots.footer"
            class="sigma-ui-faceted-filter__footer"
          >
            <slot name="footer" />
          </div>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<style>
.sigma-ui-faceted-filter__trigger {
  gap: 0.5rem;
  border-style: dashed;
}

.sigma-ui-faceted-filter__trigger-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.sigma-ui-faceted-filter__separator {
  height: 0.875rem;
  margin: 0 0.375rem;
}

.sigma-ui-faceted-filter__count {
  display: inline-flex;
  height: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.375rem;
  border-radius: 0.375rem;
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  font-size: 0.6875rem;
}

.sigma-ui-faceted-filter__badges {
  display: none;
  gap: 0.375rem;
}

.sigma-ui-faceted-filter__badge {
  display: inline-flex;
  height: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.375rem;
  border-radius: 0.375rem;
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  font-size: 0.6875rem;
}

.sigma-ui-faceted-filter__content {
  width: 20rem;
  padding: 0;
}

.sigma-ui-faceted-filter__empty-create {
  padding: 0.625rem;
}

.sigma-ui-faceted-filter__empty-create-button {
  width: 100%;
  gap: 0.5rem;
  justify-content: flex-start;
}

.sigma-ui-faceted-filter__empty-create-icon {
  width: 1rem;
  height: 1rem;
}

.sigma-ui-faceted-filter__checkbox {
  display: flex;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  margin-right: 0.625rem;
  opacity: 0.6;
}

.sigma-ui-faceted-filter__checkbox:not([data-selected]) .sigma-ui-faceted-filter__check {
  visibility: hidden;
}

.sigma-ui-faceted-filter__checkbox[data-selected] {
  border-color: color-mix(in oklch, var(--primary) 60%, transparent);
  background: color-mix(in oklch, var(--primary) 15%, transparent);
  opacity: 1;
}

.sigma-ui-faceted-filter__check {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--primary);
}

.sigma-ui-faceted-filter__option-text {
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: text;
  white-space: nowrap;
}

.sigma-ui-faceted-filter__footer {
  padding: 0.625rem 0.625rem 0.75rem;
}

@media (width >= 1024px) {
  .sigma-ui-faceted-filter__badges {
    display: flex;
  }

  .sigma-ui-faceted-filter__count {
    display: none;
  }
}
</style>
