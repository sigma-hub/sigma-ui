<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationFirst, type PaginationFirstProps } from 'reka-ui';
import { ChevronsLeftIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    v-bind="props"
  >
    <Button
      v-bind="delegatedAttrs()"
      class="sigma-ui-pagination-first"
      :class="$attrs.class"
      variant="outline"
    >
      <slot>
        <ChevronsLeftIcon class="sigma-ui-pagination-first__icon" />
      </slot>
    </Button>
  </PaginationFirst>
</template>

<style>
.sigma-ui-pagination-first {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.sigma-ui-pagination-first__icon {
  width: 1rem;
  height: 1rem;
}
</style>
