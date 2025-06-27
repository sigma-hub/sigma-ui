<script setup lang="ts">
import { useFilter } from 'reka-ui';
import { computed, ref } from 'vue';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@ui/registry/css/ui/combobox';
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@ui/registry/css/ui/tags-input';

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const modelValue = ref<string[]>([]);
const open = ref(false);
const searchTerm = ref('');

const { contains } = useFilter({ sensitivity: 'base' });
const filteredFrameworks = computed(() => {
  const options = frameworks.filter(i => !modelValue.value.includes(i.label));
  return searchTerm.value ? options.filter(option => contains(option.label, searchTerm.value)) : options;
});
</script>

<template>
  <Combobox
    v-model="modelValue"
    v-model:open="open"
    :ignore-filter="true"
  >
    <ComboboxAnchor as-child>
      <TagsInput
        v-model="modelValue"
        class="example-sigma-ui-tags-input-combobox"
      >
        <div
          v-if="modelValue.length > 0"
          class="example-sigma-ui-tags-input-combobox__items"
        >
          <TagsInputItem
            v-for="item in modelValue"
            :key="item"
            :value="item"
          >
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
        </div>

        <ComboboxInput
          v-model="searchTerm"
          as-child
        >
          <TagsInputInput
            placeholder="Framework..."
            class="example-sigma-ui-tags-input-combobox__input"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInput>

      <ComboboxList class="example-sigma-ui-tags-input-combobox__list">
        <ComboboxEmpty />
        <ComboboxGroup>
          <ComboboxItem
            v-for="framework in filteredFrameworks"
            :key="framework.value"
            :value="framework.label"
            @select.prevent="(event) => {
              if (typeof event.detail.value === 'string') {
                searchTerm = ''
                modelValue.push(event.detail.value)
              }
              if (filteredFrameworks.length === 0) {
                open = false
              }
            }"
          >
            {{ framework.label }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxAnchor>
  </Combobox>
</template>

<style>
.example-sigma-ui-tags-input-combobox {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 8px;
  width: 200px;
}

.example-sigma-ui-tags-input-combobox__items {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
}

.example-sigma-ui-tags-input-combobox__combobox {
  width: 100%;
}

.example-sigma-ui-tags-input-combobox__input {
  width: 100%;
  min-width: 50px;
  height: 24px;
  border: none;
  padding: 0;
}

.example-sigma-ui-tags-input-combobox__list {
  width: var(--reka-popper-anchor-width);
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transform-origin: var(--reka-popper-transform-origin);
}

.example-sigma-ui-tags-input-combobox__list[data-state="open"] {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
