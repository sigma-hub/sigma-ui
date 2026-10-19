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
  <td
    data-slot="table-cell"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-cell"
    :class="[$attrs.class]"
  >
    <slot />
  </td>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-table-cell {
    padding: calc(var(--spacing) * 4);
    vertical-align: middle;
  }

  .sigma-ui-table-cell:has([role="checkbox"]) {
    padding-right: 0;
  }
}
</style>
