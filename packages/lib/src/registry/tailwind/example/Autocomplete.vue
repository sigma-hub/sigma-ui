<script setup lang="ts">
import { ref } from 'vue';
import {
  Autocomplete,
  AutocompleteAnchor,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '@ui/registry/tailwind/ui/autocomplete';

const value = ref('');
const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
</script>

<template>
  <Autocomplete
    v-model="value"
    open-on-focus
  >
    <AutocompleteAnchor>
      <AutocompleteInput placeholder="Search fruit..." />
    </AutocompleteAnchor>
    <AutocompleteList>
      <AutocompleteEmpty>
        No fruit found.
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="fruit in fruits"
        :key="fruit"
        :value="fruit"
      >
        {{ fruit }}
      </AutocompleteItem>
    </AutocompleteList>
  </Autocomplete>
</template>
