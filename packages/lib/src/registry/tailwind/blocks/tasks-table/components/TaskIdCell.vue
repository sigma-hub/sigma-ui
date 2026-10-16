<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>

<template>
  <div class="w-20">
    {{ value }}
  </div>
</template>
