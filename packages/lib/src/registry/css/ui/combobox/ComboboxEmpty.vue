<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    data-slot="combobox-empty"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="['sigma-ui-combobox-empty', $attrs.class]"
  >
    <slot />
  </ComboboxEmpty>
</template>

<style>
@layer components {
  .sigma-ui-combobox-empty {
    padding-top: calc(var(--spacing) * 6);
    padding-bottom: calc(var(--spacing) * 6);
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }
}
</style>
