<script setup lang="ts">
import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<AlertDialogCancelProps>();
</script>

<template>
  <AlertDialogCancel
    v-bind="props"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogCancel>
</template>
