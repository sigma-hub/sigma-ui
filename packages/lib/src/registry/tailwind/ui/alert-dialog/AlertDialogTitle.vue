<script setup lang="ts">
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<AlertDialogTitleProps>();
</script>

<template>
  <AlertDialogTitle
    v-bind="props"
    :class="cn('text-lg font-semibold', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogTitle>
</template>
