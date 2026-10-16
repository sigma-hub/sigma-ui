<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>

<template>
  <div class="tasks-table__id">
    {{ value }}
  </div>
</template>

<style>
.tasks-table__id {
  width: 5rem;
}
</style>
