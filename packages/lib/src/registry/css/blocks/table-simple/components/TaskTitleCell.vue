<script setup lang="ts">
import { Badge } from '@ui/registry/css/ui/badge';

defineProps<{
  title: string;
  label?: string;
}>();
</script>

<template>
  <div class="table-simple__task-title">
    <Badge
      v-if="label"
      variant="outline"
    >
      {{ label }}
    </Badge>
    <span class="table-simple__task-title-text">{{ title }}</span>
  </div>
</template>

<style>
@layer components {
  .table-simple__task-title {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .table-simple__task-title-text {
    overflow: hidden;
    max-width: 500px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
