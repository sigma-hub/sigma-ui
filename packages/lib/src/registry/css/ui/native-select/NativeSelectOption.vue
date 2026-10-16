<script setup lang="ts">
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
