<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationFirst, type PaginationFirstProps } from 'reka-ui';
import { ChevronsLeftIcon } from '@lucide/vue';
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
  width: calc(var(--spacing) * 10);
  height: calc(var(--spacing) * 10);
  padding: 0;
}

.sigma-ui-pagination-first__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
