<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui';
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<PaginationEllipsisProps>();
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('w-9 h-9 flex items-center justify-center', $attrs.class ?? '')"
  >
    <slot>
      <MoreHorizontalIcon class="w-4 h-4" />
    </slot>
  </PaginationEllipsis>
</template>
