<script setup lang="ts">
import { cn } from '@ui/utils';

const model = defineModel<string | number>();
</script>

<template>
  <input
    v-model="model"
    :class="cn('flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
    autocomplete="off"
  >
</template>
