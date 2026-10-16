<script setup lang="ts">
import type { SettingsLink } from '../data';

defineProps<{
  links: SettingsLink[];
}>();
</script>

<template>
  <nav class="dashboard-settings__side-nav">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      class="dashboard-settings__side-link"
      :class="{ 'dashboard-settings__side-link--active': link.isActive }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>

<style>
.dashboard-settings__side-nav {
  display: grid;
  gap: 1rem;
}

.dashboard-settings__side-link {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-decoration: none;
}

.dashboard-settings__side-link--active {
  color: var(--primary);
  font-weight: 600;
}
</style>
