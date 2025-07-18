<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'reka-ui';

const props = defineProps<DialogTitleProps>();
</script>

<template>
  <DialogTitle
    class="sigma-ui-sheet-title"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>

<style>
.sigma-ui-sheet-title {
  color: hsl(var(--foreground));
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
