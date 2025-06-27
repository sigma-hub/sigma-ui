<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@ui/registry/tailwind/ui/combobox';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];
</script>

<template>
  <Combobox by="label">
    <ComboboxAnchor>
      <div class="relative w-full max-w-sm items-center">
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <SearchIcon class="size-4 text-muted-foreground" />
        </span>
        <ComboboxInput
          class="pl-9"
          :display-value="(value) => value?.label ?? ''"
          placeholder="Select framework..."
        />
        <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
          <ChevronsUpDownIcon class="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
        </ComboboxTrigger>
      </div>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxEmpty>
        No framework found.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="framework in frameworks"
          :key="framework.value"
          :value="framework"
        >
          {{ framework.label }}

          <ComboboxItemIndicator>
            <CheckIcon :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
