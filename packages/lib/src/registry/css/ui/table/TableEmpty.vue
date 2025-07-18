<script setup lang="ts">
import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';

const props = withDefaults(defineProps<{
  colspan?: number;
}>(), {
  colspan: 1,
});
</script>

<template>
  <TableRow>
    <TableCell
      class="sigma-ui-table-empty"
      :class="[$attrs.class]"
      v-bind="props"
    >
      <div class="sigma-ui-table-empty__content">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>

<style>
.sigma-ui-table-empty {
  padding: 1rem;
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  vertical-align: middle;
  white-space: nowrap;
}

.sigma-ui-table-empty__content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}
</style>
