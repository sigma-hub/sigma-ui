<script setup lang="ts">
import { PaginationPrev, type PaginationPrevProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationPrev v-bind="props">
    <Button
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
