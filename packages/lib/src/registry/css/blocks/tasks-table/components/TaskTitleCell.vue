<script setup lang="ts">
import { Badge } from '@ui/registry/css/ui/badge';

defineProps<{
  title: string;
  label?: string;
}>();
</script>

<template>
  <div class="tasks-table__title">
    <Badge
      v-if="label"
      variant="outline"
    >
      {{ label }}
    </Badge>
    <span class="tasks-table__title-text">{{ title }}</span>
  </div>
</template>

<style>
.tasks-table__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tasks-table__title-text {
  overflow: hidden;
  max-width: 500px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
