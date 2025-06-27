<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from 'lucide-vue-next';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@ui/registry/css/ui/combobox';

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
      <div class="example-sigma-ui-combobox">
        <span class="example-sigma-ui-combobox__icon">
          <SearchIcon class="example-sigma-ui-combobox__search-icon" />
        </span>
        <ComboboxInput
          class="example-sigma-ui-combobox__input"
          :display-value="(value) => value?.label ?? ''"
          placeholder="Select framework..."
        />
        <ComboboxTrigger class="example-sigma-ui-combobox__trigger">
          <ChevronsUpDownIcon class="example-sigma-ui-combobox__chevron" />
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
            <CheckIcon class="example-sigma-ui-combobox__check-icon" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<style>
.example-sigma-ui-combobox {
  position: relative;
  width: 100%;
  max-width: 24rem;
  display: flex;
  align-items: center;
}

.example-sigma-ui-combobox__input {
  padding-left: 2.25rem;
}

.example-sigma-ui-combobox__icon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
}

.example-sigma-ui-combobox__search-icon {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-combobox__check-icon {
  margin-left: auto;
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-combobox__trigger {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
}

.example-sigma-ui-combobox__chevron {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
  opacity: 0.5;
}
</style>
