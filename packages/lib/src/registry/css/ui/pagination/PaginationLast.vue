<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationLast, type PaginationLastProps } from 'reka-ui';
import { ChevronsRightIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationLast
    data-slot="pagination-last"
    v-bind="props"
  >
    <Button
      v-bind="delegatedAttrs()"
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
@layer components {
  .sigma-ui-pagination-last {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    padding: 0;
  }

  .sigma-ui-pagination-last__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
