<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Input } from '@ui/registry/css/ui/input';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-input.sigma-ui-sidebar-input {
  width: 100%;
  height: 2rem;
  background-color: var(--background);
  box-shadow: none;
}
</style>
