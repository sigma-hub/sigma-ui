<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui';
import { MoreHorizontalIcon } from 'lucide-vue-next';
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
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-pagination-ellipsis"
    data-slot="pagination-ellipsis"
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
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-pagination-ellipsis__icon {
  width: 1rem;
  height: 1rem;
}
</style>
