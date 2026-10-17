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
    class="sigma-ui-card__header"
    :class="[$attrs.class]"
    data-slot="card-header"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__header {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.375rem;
}
</style>
