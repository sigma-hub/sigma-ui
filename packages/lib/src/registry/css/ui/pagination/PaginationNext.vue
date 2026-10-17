<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationNext, type PaginationNextProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationNext
    v-bind="props"
    data-slot="pagination-next"
  >
    <Button
      v-bind="delegatedAttrs()"
      class="sigma-ui-pagination-next"
      :class="$attrs.class"
      variant="outline"
    >
      <slot>
        <ChevronRightIcon class="sigma-ui-pagination-next__icon" />
      </slot>
    </Button>
  </PaginationNext>
</template>

<style>
.sigma-ui-pagination-next {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.sigma-ui-pagination-next__icon {
  width: 1rem;
  height: 1rem;
}
</style>
