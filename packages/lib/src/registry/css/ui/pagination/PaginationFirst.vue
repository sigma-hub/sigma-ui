<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps } from 'reka-ui';
import { ChevronsLeftIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationFirst v-bind="props">
    <Button
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
  height: 1rem;
  width: 1rem;
}
</style>
