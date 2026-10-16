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
  <th
    v-bind="delegatedAttrs"
    class="sigma-ui-table-head"
    :class="[$attrs.class]"
    data-slot="table-head"
  >
    <slot />
  </th>
</template>

<style>
.sigma-ui-table-head {
  height: 3rem;
  padding-right: 1rem;
  padding-left: 1rem;
  color: var(--muted-foreground);
  font-weight: 500;
  text-align: left;
  vertical-align: middle;
}

.sigma-ui-table-head:has([role="checkbox"]) {
  padding-right: 0;
}
</style>
