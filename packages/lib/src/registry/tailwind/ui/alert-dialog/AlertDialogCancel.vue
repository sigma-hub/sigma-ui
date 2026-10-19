<script setup lang="ts">
import { useAttrs } from 'vue';

import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AlertDialogCancelProps>();
</script>

<template>
  <AlertDialogCancel
    data-slot="alert-dialog-cancel"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogCancel>
</template>
