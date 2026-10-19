<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';

interface Item {
  title: string;
  id: string;
}

const modelValue = defineModel<string>({ default: 'profile' });

const sidebarNavItems: Item[] = [
  { title: 'Profile', id: 'profile' },
  { title: 'Account', id: 'account' },
  { title: 'Appearance', id: 'appearance' },
  { title: 'Notifications', id: 'notifications' },
  { title: 'Display', id: 'display' },
];

function selectItem(itemId: string) {
  modelValue.value = itemId;
}
</script>

<template>
  <nav class="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.id"
      variant="ghost"
      class="justify-start text-left lg:w-full"
      :class="{ 'bg-muted hover:bg-muted': modelValue === item.id }"
      @click="selectItem(item.id)"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
