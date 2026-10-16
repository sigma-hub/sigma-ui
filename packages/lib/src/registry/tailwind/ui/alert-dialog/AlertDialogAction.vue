<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AlertDialogActionProps>();
</script>

<template>
  <AlertDialogAction
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn(buttonVariants(), $attrs.class ?? '')"
    data-slot="alert-dialog-action"
  >
    <slot />
  </AlertDialogAction>
</template>
