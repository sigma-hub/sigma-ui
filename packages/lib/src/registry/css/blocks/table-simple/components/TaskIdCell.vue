<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>

<template>
  <div class="table-simple__id">
    {{ value }}
  </div>
</template>

<style>
.table-simple__id {
  width: calc(var(--spacing) * 20);
}
</style>
