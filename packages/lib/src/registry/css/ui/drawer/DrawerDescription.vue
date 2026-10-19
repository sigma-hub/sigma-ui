<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-drawer-description"
    :class="[$attrs.class]"
  >
    <slot />
  </DrawerDescription>
</template>

<style>
@layer components {
  .sigma-ui-drawer-description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
