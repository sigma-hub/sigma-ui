<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DialogTitleProps>();
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold text-foreground', $attrs.class ?? '')"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
