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
  <caption
    data-slot="table-caption"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-caption"
    :class="[$attrs.class]"
  >
    <slot />
  </caption>
</template>

<style>
@layer components {
  .sigma-ui-table-caption {
    margin-top: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
