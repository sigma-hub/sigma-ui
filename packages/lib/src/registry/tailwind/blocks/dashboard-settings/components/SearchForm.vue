<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Input } from '@ui/registry/tailwind/ui/input';

defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <form class="ml-auto flex-1 sm:flex-initial">
    <div class="relative">
      <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        :placeholder="placeholder"
        class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </div>
  </form>
</template>
