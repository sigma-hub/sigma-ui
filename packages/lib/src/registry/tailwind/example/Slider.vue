<script setup lang="ts">
import { ref } from 'vue';
import { Slider } from '@ui/registry/tailwind/ui/slider';

const modelValue = ref([50]);
</script>

<template>
  <Slider
    v-model="modelValue"
    :max="100"
    :step="1"
  />
</template>
