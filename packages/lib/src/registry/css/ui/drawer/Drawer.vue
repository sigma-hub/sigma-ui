<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'reka-ui';
import { DrawerRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<DrawerRootProps>();
const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * Trigger and content.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <DrawerRoot v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>
