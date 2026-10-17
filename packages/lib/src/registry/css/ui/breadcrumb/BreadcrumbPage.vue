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
    v-bind="delegatedAttrs()"
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="sigma-ui-breadcrumb__page"
    :class="$attrs.class"
    data-slot="breadcrumb-page"
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
