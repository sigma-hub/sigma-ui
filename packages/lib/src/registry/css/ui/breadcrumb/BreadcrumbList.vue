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
@layer components {
  .sigma-ui-breadcrumb__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 1.5);
    overflow-wrap: break-word;
  }

  @media (width >= 40rem) {
    .sigma-ui-breadcrumb__list {
      gap: calc(var(--spacing) * 2.5);
    }
  }
}
</style>
