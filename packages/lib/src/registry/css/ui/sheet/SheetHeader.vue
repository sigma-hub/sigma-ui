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
    class="sigma-ui-sheet-header"
    :class="[$attrs.class]"
    data-slot="sheet-header"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sheet-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-sheet-header {
    text-align: left;
  }
}
</style>
