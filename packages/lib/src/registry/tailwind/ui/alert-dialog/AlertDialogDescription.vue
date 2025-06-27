<script setup lang="ts">
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<AlertDialogDescriptionProps>();
</script>

<template>
  <AlertDialogDescription
    v-bind="props"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogDescription>
</template>
