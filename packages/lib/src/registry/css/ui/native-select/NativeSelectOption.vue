<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * Label of the option.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <option
    data-slot="native-select-option"
    v-bind="delegatedAttrs()"
    class="sigma-ui-native-select-option"
    :class="[$attrs.class]"
  >
    <slot />
  </option>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-native-select-option {
    background-color: var(--popover);
    color: var(--popover-foreground);
  }
}
</style>
