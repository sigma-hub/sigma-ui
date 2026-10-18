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
    data-slot="card-footer"
    v-bind="delegatedAttrs()"
    class="sigma-ui-card__footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__footer {
  display: flex;
  padding: 0 1.5rem 1.5rem;
  gap: 0.5rem;
}
</style>
