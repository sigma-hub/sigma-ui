<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Input } from '@ui/registry/tailwind/ui/input';
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      class="pl-10"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <SearchIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
