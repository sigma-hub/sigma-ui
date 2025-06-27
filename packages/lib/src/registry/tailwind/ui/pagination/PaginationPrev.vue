<script setup lang="ts">
import { PaginationPrev, type PaginationPrevProps } from 'reka-ui';
import { ChevronLeftIcon } from 'lucide-vue-next';
import {
  Button,
} from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PaginationPrevProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationPrev v-bind="props">
    <Button
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronLeftIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
