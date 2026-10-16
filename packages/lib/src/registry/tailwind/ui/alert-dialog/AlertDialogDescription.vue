<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AlertDialogDescriptionProps>();
</script>

<template>
  <AlertDialogDescription
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="alert-dialog-description"
  >
    <slot />
  </AlertDialogDescription>
</template>
