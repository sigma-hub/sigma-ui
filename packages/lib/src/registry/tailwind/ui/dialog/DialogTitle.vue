<script setup lang="ts">
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DialogTitleProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="
      cn(
        'text-lg font-semibold leading-none tracking-tight',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </DialogTitle>
</template>
