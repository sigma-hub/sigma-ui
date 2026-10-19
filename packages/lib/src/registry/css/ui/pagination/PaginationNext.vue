<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationNext, type PaginationNextProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
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
    data-slot="pagination-next"
    v-bind="props"
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
@layer base, components;

@layer components {
  .sigma-ui-pagination-next {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    padding: 0;
  }

  .sigma-ui-pagination-next__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
