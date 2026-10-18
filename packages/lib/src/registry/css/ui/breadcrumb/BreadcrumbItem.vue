<script lang="ts" setup>
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
  <li
    data-slot="breadcrumb-item"
    v-bind="delegatedAttrs()"
    class="sigma-ui-breadcrumb__item"
    :class="$attrs.class"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.5);
}
</style>
