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
  <div
    v-bind="delegatedAttrs()"
    class="sigma-ui-card"
    :class="[$attrs.class]"
    data-slot="card"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--card);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  color: var(--card-foreground);
}
</style>
