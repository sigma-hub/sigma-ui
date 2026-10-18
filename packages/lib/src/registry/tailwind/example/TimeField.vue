<script setup lang="ts">
import { type TimeValue } from 'reka-ui';
import { ref } from 'vue';
import { TimeField } from '@ui/registry/tailwind/ui/time-field';

const value = ref<TimeValue>();
</script>

<template>
  <TimeField v-model="value" />
</template>
