<script setup lang="ts">
import { useFilter } from 'reka-ui';
import { computed, ref } from 'vue';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@ui/registry/tailwind/ui/combobox';
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@ui/registry/tailwind/ui/tags-input';

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
        class="px-2 gap-2 w-[200px]"
      >
        <div
          v-if="modelValue.length > 0"
          class="flex gap-2 flex-wrap items-center"
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
            class="w-full p-0 border-none focus-visible:ring-0 h-auto"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInput>

      <ComboboxList class="w-(--reka-popper-anchor-width)">
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
