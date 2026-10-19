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
  orientation: 'vertical',
});
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-button-group-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-separator.sigma-ui-button-group-separator {
    position: relative;
    align-self: stretch;
    margin: 0;
    background-color: var(--border);
  }

  .sigma-ui-separator.sigma-ui-button-group-separator[data-orientation="vertical"] {
    height: auto;
  }
}
</style>
