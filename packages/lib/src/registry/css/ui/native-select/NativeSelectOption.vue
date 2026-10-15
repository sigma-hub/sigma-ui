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
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
}
</style>
