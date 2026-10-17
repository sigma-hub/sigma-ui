<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  label: string;
  icon?: Component;
}>();
</script>

<template>
  <div class="table-simple__priority">
    <component
      :is="icon"
      v-if="icon"
      class="table-simple__priority-icon"
    />
    <span>{{ label }}</span>
  </div>
</template>

<style>
.table-simple__priority {
  display: flex;
  align-items: center;
}

.table-simple__priority-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  color: var(--muted-foreground);
}
</style>
