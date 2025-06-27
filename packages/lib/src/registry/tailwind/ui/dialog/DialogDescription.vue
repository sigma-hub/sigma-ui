<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DialogDescription>
</template>
