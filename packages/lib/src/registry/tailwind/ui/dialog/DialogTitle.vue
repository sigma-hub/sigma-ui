<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogTitleProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogTitle
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="
      cn(
        'text-lg font-semibold leading-none tracking-tight',
        $attrs.class ?? '',
      )
    "
    data-slot="dialog-title"
  >
    <slot />
  </DialogTitle>
</template>
