<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@ui/registry/tailwind/ui/combobox';
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-vue-next';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const value = ref<typeof frameworks[0]>();
</script>

<template>
  <Combobox
    v-model="value"
    by="label"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          :class="['w-[200px] justify-between', {
            'text-muted-foreground': !value,
            'text-foreground': value
          }]"
        >
          {{ value?.label ?? 'Select framework' }}
          <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <SearchIcon class="size-4 text-muted-foreground" />
        </span>
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 rounded-none h-9"
          placeholder="Select framework..."
        />
      </div>

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
