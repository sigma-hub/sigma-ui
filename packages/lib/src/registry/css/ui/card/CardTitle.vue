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
  <h3
    v-bind="delegatedAttrs()"
    class="sigma-ui-card__title"
    :class="[$attrs.class]"
    data-slot="card-title"
  >
    <slot />
  </h3>
</template>

<style>
.sigma-ui-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1;
}
</style>
