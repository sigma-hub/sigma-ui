<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
