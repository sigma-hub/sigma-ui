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
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    v-bind="delegatedAttrs()"
    class="sigma-ui-native-select-optgroup"
    :class="[$attrs.class]"
  >
    <slot />
  </optgroup>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-native-select-optgroup {
    background-color: var(--popover);
    color: var(--popover-foreground);
  }
}
</style>
