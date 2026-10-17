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
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-separator"
    data-slot="dropdown-menu-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-dropdown-menu-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: var(--border);
}
</style>
