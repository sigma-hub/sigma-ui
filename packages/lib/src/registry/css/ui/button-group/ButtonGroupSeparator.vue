<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/css/ui/separator';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <Separator
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="button-group-separator"
    class="sigma-ui-button-group-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-button-group-separator {
  position: relative;
  align-self: stretch;
  margin: 0;
  background-color: var(--border);
}

.sigma-ui-separator.sigma-ui-button-group-separator[data-orientation="vertical"] {
  height: auto;
}
</style>
