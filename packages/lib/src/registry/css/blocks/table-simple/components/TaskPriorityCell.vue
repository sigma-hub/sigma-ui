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
@layer base, components;

@layer components {
  .table-simple__priority {
    display: flex;
    align-items: center;
  }

  .table-simple__priority-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    margin-right: calc(var(--spacing) * 2);
    color: var(--muted-foreground);
  }
}
</style>
