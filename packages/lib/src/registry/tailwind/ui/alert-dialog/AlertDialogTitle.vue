<script setup lang="ts">
import { useAttrs } from 'vue';

import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AlertDialogTitleProps>();
</script>

<template>
  <AlertDialogTitle
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('text-lg font-semibold', $attrs.class ?? '')"
    data-slot="alert-dialog-title"
  >
    <slot />
  </AlertDialogTitle>
</template>
