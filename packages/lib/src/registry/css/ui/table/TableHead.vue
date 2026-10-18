<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <th
    data-slot="table-head"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-head"
    :class="[$attrs.class]"
  >
    <slot />
  </th>
</template>

<style>
.sigma-ui-table-head {
  height: calc(var(--spacing) * 12);
  padding-right: calc(var(--spacing) * 4);
  padding-left: calc(var(--spacing) * 4);
  color: var(--muted-foreground);
  font-weight: 500;
  text-align: left;
  vertical-align: middle;
}

.sigma-ui-table-head:has([role="checkbox"]) {
  padding-right: 0;
}
</style>
