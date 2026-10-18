<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui';
import { MoreHorizontalIcon } from '@lucide/vue';
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
    class="sigma-ui-pagination-ellipsis"
    :class="[$attrs.class]"
  >
    <slot>
      <MoreHorizontalIcon class="sigma-ui-pagination-ellipsis__icon" />
    </slot>
  </PaginationEllipsis>
</template>

<style>
.sigma-ui-pagination-ellipsis {
  display: flex;
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  align-items: center;
  justify-content: center;
}

.sigma-ui-pagination-ellipsis__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
