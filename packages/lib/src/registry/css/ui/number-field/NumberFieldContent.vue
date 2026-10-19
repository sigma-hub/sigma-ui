<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <div
    data-slot="number-field-content"
    v-bind="delegatedAttrs()"
    class="sigma-ui-number-field-content"
    :class="$attrs.class"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-number-field-content {
    position: relative;
  }

  .sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="increment"]) {
    padding-right: calc(var(--spacing) * 5);
  }

  .sigma-ui-number-field-content > [data-slot="input"]:has([data-slot="decrement"]) {
    padding-left: calc(var(--spacing) * 5);
  }
}
</style>
