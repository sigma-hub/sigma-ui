<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarSeparatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSeparator
    class="sigma-ui-menubar-separator"
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    data-slot="menubar-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-menubar-separator {
  height: 1px;
  background-color: var(--muted);
  margin-block: 0.25rem;
  margin-inline: -0.25rem;
}
</style>
