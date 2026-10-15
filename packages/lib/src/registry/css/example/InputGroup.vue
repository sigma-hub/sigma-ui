<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/css/ui/input-group';
</script>

<template>
  <InputGroup class="example-input-group">
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search docs..." />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Search</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>

<style>
.example-input-group {
  max-width: 24rem;
}
</style>
