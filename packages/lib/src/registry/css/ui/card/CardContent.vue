<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <div
    v-bind="delegatedAttrs"
    class="sigma-ui-card__content"
    :class="[$attrs.class]"
    data-slot="card-content"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-card__content {
  padding: 0 1.5rem 1.5rem;
}
</style>
