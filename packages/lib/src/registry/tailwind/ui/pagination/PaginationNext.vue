<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationNext, type PaginationNextProps } from 'reka-ui';
import { ChevronRightIcon } from '@lucide/vue';
import {
  Button,
} from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
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
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronRightIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
