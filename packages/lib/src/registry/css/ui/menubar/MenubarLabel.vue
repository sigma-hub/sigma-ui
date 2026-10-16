<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarLabelProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <MenubarLabel
    v-bind="delegatedAttrs"
    class="sigma-ui-menubar-label"
    :class="[{ 'sigma-ui-menubar-label--inset': inset }, $attrs.class]"
    data-slot="menubar-label"
  >
    <slot />
  </MenubarLabel>
</template>

<style>
.sigma-ui-menubar-label {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.sigma-ui-menubar-label--inset {
  padding-left: 2rem;
}
</style>
