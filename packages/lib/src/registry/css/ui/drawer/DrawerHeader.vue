<script lang="ts" setup>
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
    class="sigma-ui-drawer-header"
    :class="[$attrs.class]"
    data-slot="drawer-header"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-drawer-header {
  display: grid;
  padding: 1rem;
  gap: 0.375rem;
  text-align: center;
}

@media (width >= 640px) {
  .sigma-ui-drawer-header {
    text-align: left;
  }
}
</style>
