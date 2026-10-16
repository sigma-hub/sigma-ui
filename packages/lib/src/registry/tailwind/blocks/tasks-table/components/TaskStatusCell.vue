<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  label: string;
  icon?: Component;
}>();
</script>

<template>
  <div class="flex w-[100px] items-center">
    <component
      :is="icon"
      v-if="icon"
      class="mr-2 size-4 text-muted-foreground"
    />
    <span>{{ label }}</span>
  </div>
</template>
