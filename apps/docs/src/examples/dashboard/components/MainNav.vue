<script setup lang="ts">
import { cn } from '@ui/utils';

const navItems = [
  { title: 'Overview', active: true },
  { title: 'Customers', active: false },
  { title: 'Products', active: false },
  { title: 'Settings', active: false },
];
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <button
      v-for="item in navItems"
      :key="item.title"
      type="button"
      :class="cn(
        'text-sm font-medium transition-colors hover:text-primary',
        item.active ? 'text-primary' : 'text-muted-foreground'
      )"
    >
      {{ item.title }}
    </button>
  </nav>
</template>
