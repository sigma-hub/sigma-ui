<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationPrev, type PaginationPrevProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationPrev
    v-bind="props"
    data-slot="pagination-prev"
  >
    <Button
      v-bind="delegatedAttrs()"
      class="sigma-ui-pagination-prev"
      :class="$attrs.class"
      variant="outline"
    >
      <slot>
        <ChevronLeftIcon class="sigma-ui-pagination-prev__icon" />
      </slot>
    </Button>
  </PaginationPrev>
</template>

<style>
.sigma-ui-pagination-prev {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.sigma-ui-pagination-prev__icon {
  width: 1rem;
  height: 1rem;
}
</style>
