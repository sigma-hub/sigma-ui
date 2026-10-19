<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuSeparatorProps>();
</script>

<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-context-menu-separator {
    height: 1px;
    margin: calc(var(--spacing) * 1) calc(var(--spacing) * -1);
    background-color: var(--border);
  }
}
</style>
