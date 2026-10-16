<script setup lang="ts">
import type { SettingsLink } from '../data';

defineProps<{
  links: SettingsLink[];
}>();
</script>

<template>
  <nav class="grid gap-4 text-sm text-muted-foreground">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      :class="{ 'font-semibold text-primary': link.isActive }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
