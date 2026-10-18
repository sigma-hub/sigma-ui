<script setup lang="ts">
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';

interface Item {
  title: string;
  id: string;
}

interface Props {
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'profile',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const sidebarNavItems: Item[] = [
  {
    title: 'Profile',
    id: 'profile',
  },
  {
    title: 'Account',
    id: 'account',
  },
  {
    title: 'Appearance',
    id: 'appearance',
  },
  {
    title: 'Notifications',
    id: 'notifications',
  },
  {
    title: 'Display',
    id: 'display',
  },
];

const selectItem = (itemId: string) => {
  emit('update:modelValue', itemId);
};
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.title"
      variant="ghost"
      :class="cn(
        'w-full text-left justify-start',
        modelValue === item.id && 'bg-muted hover:bg-muted',
      )"
      @click="selectItem(item.id)"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
