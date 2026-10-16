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
    class="sigma-ui-dialog-header"
    :class="[$attrs.class]"
    data-slot="dialog-header"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-dialog-header {
    text-align: left;
  }
}
</style>
