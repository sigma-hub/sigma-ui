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
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-command-empty"
    data-slot="command-empty"
    :class="[$attrs.class]"
  >
    <slot />
  </ComboboxEmpty>
</template>

<style>
.sigma-ui-command-empty {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: var(--text-sm);
  text-align: center;
}
</style>
