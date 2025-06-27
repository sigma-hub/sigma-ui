<script setup lang="ts">
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui';
import { useAttrs } from 'vue';

const props = defineProps<AlertDialogDescriptionProps>();
const attrs = useAttrs();
</script>

<template>
  <AlertDialogDescription
    v-bind="props"
    class="sigma-ui-alert-dialog-description"
    :class="attrs.class"
  >
    <slot />
  </AlertDialogDescription>
</template>

<style>
.sigma-ui-alert-dialog-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}
</style>
