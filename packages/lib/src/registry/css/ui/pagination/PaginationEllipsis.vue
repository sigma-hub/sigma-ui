<script setup lang="ts">
import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui';
import { MoreHorizontalIcon } from 'lucide-vue-next';

const props = defineProps<PaginationEllipsisProps>();
</script>

<template>
  <PaginationEllipsis
    v-bind="props"
    class="sigma-ui-pagination-ellipsis"
  >
    <slot>
      <MoreHorizontalIcon class="sigma-ui-pagination-ellipsis__icon" />
    </slot>
  </PaginationEllipsis>
</template>

<style>
.sigma-ui-pagination-ellipsis {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigma-ui-pagination-ellipsis__icon {
  height: 1rem;
  width: 1rem;
}
</style>
