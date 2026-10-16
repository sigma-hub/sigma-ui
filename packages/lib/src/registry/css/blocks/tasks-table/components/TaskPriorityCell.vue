<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  label: string;
  icon?: Component;
}>();
</script>

<template>
  <div class="tasks-table__priority">
    <component
      :is="icon"
      v-if="icon"
      class="tasks-table__priority-icon"
    />
    <span>{{ label }}</span>
  </div>
</template>

<style>
.tasks-table__priority {
  display: flex;
  align-items: center;
}

.tasks-table__priority-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  color: var(--muted-foreground);
}
</style>
