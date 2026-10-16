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
    class="sigma-ui-number-field-content"
    :class="$attrs.class"
    data-slot="number-field-content"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-number-field-content {
  position: relative;
}

.sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="increment"]) {
  padding-right: 1.25rem;
}

.sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="decrement"]) {
  padding-left: 1.25rem;
}
</style>
