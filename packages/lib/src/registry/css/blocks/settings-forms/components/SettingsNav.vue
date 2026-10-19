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
@layer base, components;

@layer components {
  .settings-forms__nav-list {
    display: flex;
    gap: calc(var(--spacing) * 2);
    margin-inline: calc(var(--spacing) * -1);
    padding-inline: calc(var(--spacing) * 1);
    padding-bottom: calc(var(--spacing) * 1);
    overflow-x: auto;
  }

  .settings-forms__nav-button.settings-forms__nav-button {
    justify-content: flex-start;
    text-align: left;
  }

  .settings-forms__nav-button--active.settings-forms__nav-button--active,
  .settings-forms__nav-button--active.settings-forms__nav-button--active:hover {
    background: var(--muted);
  }

  @media (width >= 64rem) {
    .settings-forms__nav-list {
      flex-direction: column;
      gap: calc(var(--spacing) * 1);
      margin-inline: 0;
      padding-inline: 0;
      padding-bottom: 0;
      overflow-x: visible;
    }

    .settings-forms__nav-button.settings-forms__nav-button {
      width: 100%;
    }
  }
}
</style>
