<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { PaginationLast, type PaginationLastProps } from 'reka-ui';
import { ChevronsRightIcon } from 'lucide-vue-next';
import {
  Button,
} from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
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
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronsRightIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
