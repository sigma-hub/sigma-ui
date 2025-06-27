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
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}
</style>
