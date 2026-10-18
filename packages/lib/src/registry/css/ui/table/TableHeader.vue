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
  <thead
    data-slot="table-header"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-header"
    :class="[$attrs.class]"
  >
    <slot />
  </thead>
</template>

<style>
.sigma-ui-table-header tr {
  border-bottom: 1px solid var(--border);
}
</style>
