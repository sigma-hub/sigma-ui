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
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
    v-bind="delegatedAttrs"
    data-slot="native-select-optgroup"
    class="sigma-ui-native-select-optgroup"
    :class="[$attrs.class]"
  >
    <slot />
  </optgroup>
</template>

<style>
.sigma-ui-native-select-optgroup {
  background-color: var(--popover);
  color: var(--popover-foreground);
}
</style>
