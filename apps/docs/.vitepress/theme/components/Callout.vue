<script setup lang="ts">
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@ui/registry/tailwind/ui/alert';

interface CalloutProps {
  icon?: string;
  title?: string;
}

defineProps<CalloutProps>();
</script>

<template>
  <Alert class="not-docs">
    <span
      v-if="icon"
      class="mr-4 text-2xl"
    >{{ icon }}</span>
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription class="[&_a]:underline">
      <slot />
    </AlertDescription>
  </Alert>
</template>
