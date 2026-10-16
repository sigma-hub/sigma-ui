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
  <tr
    v-bind="delegatedAttrs"
    class="sigma-ui-table-row"
    :class="[$attrs.class]"
    data-slot="table-row"
  >
    <slot />
  </tr>
</template>

<style>
.sigma-ui-table-row {
  border-bottom: 1px solid var(--border);
  transition-duration: 150ms;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-table-row:hover {
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}

.sigma-ui-table-row[data-state="selected"] {
  background-color: var(--muted);
}
</style>
