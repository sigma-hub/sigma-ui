<script setup lang="ts">
import { useAttrs } from 'vue';

import { PaginationFirst, type PaginationFirstProps } from 'reka-ui';
import { ChevronsLeftIcon } from 'lucide-vue-next';
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
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronsLeftIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationFirst>
</template>
