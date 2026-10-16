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
  orientation: 'horizontal',
});
</script>

<template>
  <Separator
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="item-separator"
    class="sigma-ui-item-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-item-separator {
  margin-block: 0;
}
</style>
