<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-drawer-description"
    :class="[$attrs.class]"
    data-slot="drawer-description"
  >
    <slot />
  </DrawerDescription>
</template>

<style>
.sigma-ui-drawer-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
</style>
