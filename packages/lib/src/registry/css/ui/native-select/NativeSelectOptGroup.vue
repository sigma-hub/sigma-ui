<script setup lang="ts">
defineSlots<{
  /**
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
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
