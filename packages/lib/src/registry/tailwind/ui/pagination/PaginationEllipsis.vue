<script setup lang="ts">
import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui';
import { MoreHorizontalIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<PaginationEllipsisProps>();
</script>

<template>
  <PaginationEllipsis
    v-bind="props"
    :class="cn('w-9 h-9 flex items-center justify-center', $attrs.class ?? '')"
  >
    <slot>
      <MoreHorizontalIcon class="w-4 h-4" />
    </slot>
  </PaginationEllipsis>
</template>
