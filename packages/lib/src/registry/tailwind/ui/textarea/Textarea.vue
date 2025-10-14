<script setup lang="ts">
import { cn } from '@ui/utils';

const props = defineProps<{
  modelValue?: string | number;
}>();

const model = defineModel<string | number>();
</script>

<template>
  <textarea
    v-model="model"
    :class="cn('flex min-h-20 w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
    autocomplete="off"
  />
</template>
