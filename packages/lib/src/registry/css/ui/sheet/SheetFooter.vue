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
    class="sigma-ui-sheet-footer"
    :class="[$attrs.class]"
    data-slot="sheet-footer"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sheet-footer {
  display: flex;
  flex-direction: column-reverse;
}

@media (width >= 640px) {
  .sigma-ui-sheet-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
