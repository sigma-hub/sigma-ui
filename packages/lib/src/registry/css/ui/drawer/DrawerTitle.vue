<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerTitleProps } from 'reka-ui';
import { DrawerTitle } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerTitleProps>();
</script>

<template>
  <DrawerTitle
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-drawer-title"
    :class="[$attrs.class]"
    data-slot="drawer-title"
  >
    <slot />
  </DrawerTitle>
</template>

<style>
.sigma-ui-drawer-title {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1;
}
</style>
