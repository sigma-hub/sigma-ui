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
  <div
    class="sigma-ui-table-wrapper"
    data-slot="table"
  >
    <table
      v-bind="delegatedAttrs"
      class="sigma-ui-table"
      :class="[$attrs.class]"
    >
      <slot />
    </table>
  </div>
</template>

<style>
.sigma-ui-table-wrapper {
  position: relative;
  overflow: auto;
  width: 100%;
}

.sigma-ui-table {
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
}
</style>
