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
  <span
    data-slot="breadcrumb-page"
    v-bind="delegatedAttrs()"
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="sigma-ui-breadcrumb__page"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-breadcrumb__page {
  color: var(--foreground);
  font-weight: normal;
}
</style>
