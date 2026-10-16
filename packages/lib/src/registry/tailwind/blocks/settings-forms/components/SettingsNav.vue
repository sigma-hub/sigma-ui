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
  <nav class="flex gap-2 lg:flex-col lg:gap-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.id"
      variant="ghost"
      class="w-full justify-start text-left"
      :class="{ 'bg-muted hover:bg-muted': modelValue === item.id }"
      @click="selectItem(item.id)"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
