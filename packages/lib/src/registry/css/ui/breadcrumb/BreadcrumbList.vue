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
  <ol
    data-slot="breadcrumb-list"
    v-bind="delegatedAttrs()"
    class="sigma-ui-breadcrumb__list"
    :class="[$attrs.class]"
  >
    <slot />
  </ol>
</template>

<style>
.sigma-ui-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  gap: 0.375rem;
  overflow-wrap: break-word;
}

@media (width >= 640px) {
  .sigma-ui-breadcrumb__list {
    gap: 0.625rem;
  }
}
</style>
