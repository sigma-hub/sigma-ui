<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'reka-ui';
import { DrawerRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<DrawerRootProps>();
const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * Trigger and content. Receives the open state and a close function.
   */
  default?: (props: { open: boolean; close: () => void }) => unknown;
}>();
</script>

<template>
  <DrawerRoot
    v-slot="slotProps"
    data-slot="drawer"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
