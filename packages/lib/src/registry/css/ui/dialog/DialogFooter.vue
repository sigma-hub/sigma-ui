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
    class="sigma-ui-dialog-footer"
    :class="[$attrs.class]"
    data-slot="dialog-footer"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
}

@media (width >= 640px) {
  .sigma-ui-dialog-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
