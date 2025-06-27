<script setup lang="ts">
import { PaginationNext, type PaginationNextProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import {
  Button,
} from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationNext v-bind="props">
    <Button
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronRightIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
