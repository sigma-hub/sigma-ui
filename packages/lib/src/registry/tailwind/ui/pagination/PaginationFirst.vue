<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps } from 'reka-ui';
import { ChevronsLeftIcon } from 'lucide-vue-next';
import {
  Button,
} from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PaginationFirstProps>(), {
  asChild: true,
});
</script>

<template>
  <PaginationFirst v-bind="props">
    <Button
      :class="cn('w-10 h-10 p-0', $attrs.class ?? '')"
      variant="outline"
    >
      <slot>
        <ChevronsLeftIcon class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationFirst>
</template>
