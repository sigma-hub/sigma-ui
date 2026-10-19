<script setup lang="ts">
import { useAttrs } from 'vue';

import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/css/ui/separator';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <Separator
    data-slot="item-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-item-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-separator.sigma-ui-item-separator {
    margin-block: 0;
  }
}
</style>
