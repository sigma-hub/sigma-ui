<script setup lang="ts">
import { ref } from 'vue';
import { Progress } from '@ui/registry/tailwind/ui/progress';

const progress = ref(0);

setTimeout(() => progress.value = 60, 500);
</script>

<template>
  <Progress
    v-model="progress"
  />
</template>
