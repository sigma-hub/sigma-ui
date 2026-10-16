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
  <thead
    v-bind="delegatedAttrs"
    class="sigma-ui-table-header"
    :class="[$attrs.class]"
    data-slot="table-header"
  >
    <slot />
  </thead>
</template>

<style>
.sigma-ui-table-header tr {
  border-bottom: 1px solid var(--border);
}
</style>
