<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <td
    v-bind="delegatedAttrs"
    class="sigma-ui-table-cell"
    :class="[$attrs.class]"
    data-slot="table-cell"
  >
    <slot />
  </td>
</template>

<style>
.sigma-ui-table-cell {
  padding: 1rem;
  vertical-align: middle;
}

.sigma-ui-table-cell:has([role="checkbox"]) {
  padding-right: 0;
}
</style>
