<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    class="sigma-ui-dialog-description"
  >
    <slot />
  </DialogDescription>
</template>

<style>
.sigma-ui-dialog-description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
