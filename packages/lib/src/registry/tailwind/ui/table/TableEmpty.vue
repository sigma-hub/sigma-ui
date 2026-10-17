<script setup lang="ts">
import { useAttrs } from 'vue';

import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** Number of columns the empty-state cell spans; usually the column count of the table. */
  colspan?: number;
}>(), {
  colspan: 1,
});
</script>

<template>
  <TableRow
    data-slot="table-empty"
  >
    <TableCell
      v-bind="{ ...props, ...delegatedAttrs() }"
      :class="

        cn(
          'p-4 whitespace-nowrap align-middle text-sm text-foreground',
          $attrs.class ?? '',
        )
      "
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
