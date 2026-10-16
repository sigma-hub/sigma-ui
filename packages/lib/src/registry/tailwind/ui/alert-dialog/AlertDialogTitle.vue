<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AlertDialogTitleProps>();
</script>

<template>
  <AlertDialogTitle
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('text-lg font-semibold', $attrs.class ?? '')"
    data-slot="alert-dialog-title"
  >
    <slot />
  </AlertDialogTitle>
</template>
