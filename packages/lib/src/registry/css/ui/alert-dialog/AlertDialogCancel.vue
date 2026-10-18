<script setup lang="ts">
import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui';
import { useAttrs } from 'vue';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<AlertDialogCancelProps>();
const attrs = useAttrs();
</script>

<template>
  <AlertDialogCancel
    data-slot="alert-dialog-cancel"
    v-bind="props"
    class="sigma-ui-button sigma-ui-alert-dialog-cancel"
    :class="[buttonVariants({ variant: 'outline' }), attrs.class]"
  >
    <slot />
  </AlertDialogCancel>
</template>

<style>
.sigma-ui-alert-dialog-cancel {
  margin-top: calc(var(--spacing) * 2);
}

@media (width >= 40rem) {
  .sigma-ui-alert-dialog-cancel {
    margin-top: 0;
  }
}
</style>
