<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DialogDescription>
</template>
