<script setup lang="ts">
import { useAttrs } from 'vue';

import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';
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
      class="sigma-ui-table-empty"
      :class="[$attrs.class]"
    >
      <div class="sigma-ui-table-empty__content">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>

<style>
@layer components {
  .sigma-ui-table-empty {
    padding: calc(var(--spacing) * 4);
    color: var(--foreground);
    font-size: 0.875rem;
    vertical-align: middle;
    white-space: nowrap;
  }

  .sigma-ui-table-empty__content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: calc(var(--spacing) * 10);
    padding-bottom: calc(var(--spacing) * 10);
  }
}
</style>
