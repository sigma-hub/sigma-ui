<script setup lang="ts">
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<AlertDialogTitleProps>();
</script>

<template>
  <AlertDialogTitle
    :as-child="props.asChild"
    :class="cn('text-lg text-foreground font-semibold', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogTitle>
</template>
