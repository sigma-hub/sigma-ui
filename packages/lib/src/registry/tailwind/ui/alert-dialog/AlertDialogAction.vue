<script setup lang="ts">
import { useAttrs } from 'vue';

import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AlertDialogActionProps>();
</script>

<template>
  <AlertDialogAction
    data-slot="alert-dialog-action"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn(buttonVariants(), $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogAction>
</template>
