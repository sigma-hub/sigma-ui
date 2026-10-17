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
   * `FieldLabel` or `FieldTitle` with a `FieldDescription`, placed next to a checkbox, radio, or switch.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-content"
    class="sigma-ui-field-content"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-field-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.375rem;
  line-height: 1.375;
}
</style>
