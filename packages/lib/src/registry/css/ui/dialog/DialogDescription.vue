<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    class="sigma-ui-dialog-description"
   data-slot="dialog-description">
    <slot />
  </DialogDescription>
</template>

<style>
.sigma-ui-dialog-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
