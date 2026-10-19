<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarSeparatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSeparator
    class="sigma-ui-menubar-separator"
    data-slot="menubar-separator"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-menubar-separator {
    height: 1px;
    background-color: var(--muted);
    margin-block: calc(var(--spacing) * 1);
    margin-inline: calc(var(--spacing) * -1);
  }
}
</style>
