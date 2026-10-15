<script setup lang="ts">
import { cn } from '@ui/utils';

/** Current value of the input; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <input
    v-model="model"
    data-slot="input"
    :class="cn('flex h-9 w-full min-w-0 rounded-md border border-border bg-input px-3 py-1 text-base file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm', $attrs.class ?? '')"
    autocomplete="off"
    data-slot="input"
  >
</template>
