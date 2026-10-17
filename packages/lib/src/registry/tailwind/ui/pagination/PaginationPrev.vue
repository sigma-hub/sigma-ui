<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationPrev, type PaginationPrevProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
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

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationPrev
    v-bind="props"
    data-slot="pagination-prev"
  >
    <Button
      v-bind="delegatedAttrs()"
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronLeftIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
