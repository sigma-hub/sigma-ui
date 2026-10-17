<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="sheet-description"
  >
    <slot />
  </DialogDescription>
</template>
