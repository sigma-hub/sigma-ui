<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<MenubarLabelProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <MenubarLabel
    data-slot="menubar-label"
    v-bind="delegatedAttrs()"
    class="sigma-ui-menubar-label"
    :class="[{ 'sigma-ui-menubar-label--inset': inset }, $attrs.class]"
  >
    <slot />
  </MenubarLabel>
</template>

<style>
@layer components {
  .sigma-ui-menubar-label {
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    font-size: 0.875rem;
    font-weight: 600;
  }

  .sigma-ui-menubar-label--inset {
    padding-left: calc(var(--spacing) * 8);
  }
}
</style>
