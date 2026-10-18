<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-dropdown-menu-separator {
  height: 1px;
  margin: calc(var(--spacing) * 1) calc(var(--spacing) * -1);
  background-color: var(--border);
}
</style>
