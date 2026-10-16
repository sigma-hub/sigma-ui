<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';

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
  <nav class="settings-forms__nav-list">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.id"
      variant="ghost"
      class="settings-forms__nav-button"
      :class="{ 'settings-forms__nav-button--active': modelValue === item.id }"
      @click="selectItem(item.id)"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>

<style>
.settings-forms__nav-list {
  display: flex;
  gap: 0.5rem;
}

.settings-forms__nav-button.settings-forms__nav-button {
  width: 100%;
  justify-content: flex-start;
  text-align: left;
}

.settings-forms__nav-button--active.settings-forms__nav-button--active,
.settings-forms__nav-button--active.settings-forms__nav-button--active:hover {
  background: var(--muted);
}

@media (width >= 1024px) {
  .settings-forms__nav-list {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
