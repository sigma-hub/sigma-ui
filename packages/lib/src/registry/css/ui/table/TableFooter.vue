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
  <tfoot
    v-bind="delegatedAttrs"
    class="sigma-ui-table-footer"
    :class="[$attrs.class]"
    data-slot="table-footer"
  >
    <slot />
  </tfoot>
</template>

<style>
.sigma-ui-table-footer {
  border-top: 1px solid var(--border);
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  font-weight: 500;
}

.sigma-ui-table-footer > tr:last-child {
  border-bottom: 0;
}
</style>
