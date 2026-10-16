<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <li
    v-bind="delegatedAttrs"
    class="sigma-ui-breadcrumb__item"
    :class="$attrs.class"
    data-slot="breadcrumb-item"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
</style>
