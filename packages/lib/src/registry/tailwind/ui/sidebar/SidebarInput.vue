<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { cn } from '@ui/utils';

/** Current value of the input; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <Input
    v-model="model"
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn('h-8 w-full bg-background shadow-none', $attrs.class ?? '')"
  />
</template>
