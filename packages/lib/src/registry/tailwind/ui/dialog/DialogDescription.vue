<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="dialog-description"
  >
    <slot />
  </DialogDescription>
</template>
