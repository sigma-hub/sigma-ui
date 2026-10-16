<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AlertDialogCancelProps>();
</script>

<template>
  <AlertDialogCancel
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')"
    data-slot="alert-dialog-cancel"
  >
    <slot />
  </AlertDialogCancel>
</template>
