<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * Label of the option.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <option
    v-bind="delegatedAttrs"
    data-slot="native-select-option"
    class="sigma-ui-native-select-option"
    :class="[$attrs.class]"
  >
    <slot />
  </option>
</template>

<style>
.sigma-ui-native-select-option {
  background-color: var(--popover);
  color: var(--popover-foreground);
}
</style>
