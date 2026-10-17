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
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-separator"
    data-slot="context-menu-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-context-menu-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: var(--border);
}
</style>
