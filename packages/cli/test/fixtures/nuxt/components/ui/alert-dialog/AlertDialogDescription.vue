<script setup lang="ts">
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<AlertDialogDescriptionProps>();
</script>

<template>
  <AlertDialogDescription
    :class="cn('text-muted-foreground text-sm', $attrs.class ?? '')"
    :as-child="props.asChild"
  >
    <slot />
  </AlertDialogDescription>
</template>
