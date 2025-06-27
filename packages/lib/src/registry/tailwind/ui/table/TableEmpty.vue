<script setup lang="ts">
import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<{
  colspan?: number;
}>(), {
  colspan: 1,
});
</script>

<template>
  <TableRow>
    <TableCell
      v-bind="props"
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
