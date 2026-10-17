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
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-caption"
    :class="[$attrs.class]"
    data-slot="table-caption"
  >
    <slot />
  </caption>
</template>

<style>
.sigma-ui-table-caption {
  margin-top: 1rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
