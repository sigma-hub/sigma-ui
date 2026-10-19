<script setup lang="ts">
import { useAttrs } from 'vue';

import { Input } from '@ui/registry/css/ui/input';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

/** Current value of the input; use with `v-model`. */
const model = defineModel<string | number>();

defineEmits<{
  /** Emitted when the user changes the value. */
  'update:modelValue': [value: string | number];
}>();
</script>

<template>
  <Input
    v-model="model"
    data-slot="sidebar-input"
    data-sidebar="input"
    class="sigma-ui-sidebar-input"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-input.sigma-ui-sidebar-input {
    width: 100%;
    height: calc(var(--spacing) * 8);
    background-color: var(--background);
    box-shadow: none;
  }
}
</style>
