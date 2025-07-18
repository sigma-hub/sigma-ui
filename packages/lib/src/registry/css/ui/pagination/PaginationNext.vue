<script setup lang="ts">
import { PaginationNext, type PaginationNextProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationNext v-bind="props">
    <Button
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
