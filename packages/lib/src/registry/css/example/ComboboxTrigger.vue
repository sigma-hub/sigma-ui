<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
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
} from '@ui/registry/css/ui/combobox';
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
          :class="['example-sigma-ui-combobox-trigger__trigger', {
            'example-sigma-ui-combobox-trigger__trigger--empty': !value,
            'example-sigma-ui-combobox-trigger__trigger--filled': value
          }]"
        >
          {{ value?.label ?? 'Select framework' }}
          <ChevronsUpDownIcon class="example-sigma-ui-combobox-trigger__chevron" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="example-sigma-ui-combobox-trigger__content">
        <span class="example-sigma-ui-combobox-trigger__search-icon">
          <SearchIcon class="example-sigma-ui-combobox-trigger__search-icon-icon" />
        </span>
        <ComboboxInput
          class="example-sigma-ui-combobox-trigger__input"
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
            <CheckIcon class="example-sigma-ui-combobox-trigger__check" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<style>
.example-sigma-ui-combobox-trigger__trigger {
  display: flex;
  width: 200px;
  justify-content: space-between;
}

.example-sigma-ui-combobox-trigger__trigger--empty {
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-combobox-trigger__trigger--filled {
  color: hsl(var(--foreground));
}

.example-sigma-ui-combobox-trigger__chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
  opacity: 0.5;
}

.example-sigma-ui-combobox-trigger__content {
  position: relative;
  width: 200px;
  padding: 0;
}

.example-sigma-ui-combobox-trigger__check {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
  opacity: 0;
}

.example-sigma-ui-combobox-trigger__check--selected {
  opacity: 1;
}

.example-sigma-ui-combobox-trigger__input {
  height: 2.25rem;
  padding-left: 2.25rem;
  border: none;
  border-radius: 0;
  background-color: transparent;
  box-shadow: 1px 1px 0 0 hsl(var(--border));
  color: hsl(var(--muted-foreground));
  outline: none;
}

.sigma-ui-combobox-input:focus-visible {
  border-bottom: 1px solid hsl(var(--border));
  box-shadow: none;
  outline: none;
}

.example-sigma-ui-combobox-trigger__search-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
}

.example-sigma-ui-combobox-trigger__search-icon-icon {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}
</style>
