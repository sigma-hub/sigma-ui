<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    class="sigma-ui-sheet-description"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>

<style>
.sigma-ui-sheet-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
