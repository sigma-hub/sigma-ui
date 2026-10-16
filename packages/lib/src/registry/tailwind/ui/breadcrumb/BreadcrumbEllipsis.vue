<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MoreHorizontalIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'More',
});
</script>

<template>
  <span
    v-bind="delegatedAttrs"
    role="presentation"
    aria-hidden="true"
    :class="cn('flex items-center justify-center', $attrs.class ?? '')"
    data-slot="breadcrumb-ellipsis"
  >
    <slot>
      <MoreHorizontalIcon class="h-4 w-4" />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </span>
</template>
