<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AlertDialogDescriptionProps>();
</script>

<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogDescription>
</template>
