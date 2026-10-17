<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  label: string;
  icon?: Component;
}>();
</script>

<template>
  <div class="table-simple__status">
    <component
      :is="icon"
      v-if="icon"
      class="table-simple__status-icon"
    />
    <span>{{ label }}</span>
  </div>
</template>

<style>
.table-simple__status {
  display: flex;
  width: 100px;
  align-items: center;
}

.table-simple__status-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  color: var(--muted-foreground);
}
</style>
