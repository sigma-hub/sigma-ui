<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { PaginationLast, type PaginationLastProps } from 'reka-ui';
import { ChevronsRightIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationLast
    v-bind="props"
    data-slot="pagination-last"
  >
    <Button
      v-bind="delegatedAttrs"
      class="sigma-ui-pagination-last"
      :class="$attrs.class"
      variant="outline"
    >
      <slot>
        <ChevronsRightIcon class="sigma-ui-pagination-last__icon" />
      </slot>
    </Button>
  </PaginationLast>
</template>

<style>
.sigma-ui-pagination-last {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.sigma-ui-pagination-last__icon {
  width: 1rem;
  height: 1rem;
}
</style>
