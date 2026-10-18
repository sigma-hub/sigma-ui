<script setup lang="ts">
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui';
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui';

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverRoot
    data-slot="popover"
    v-bind="forwarded"
  >
    <slot />
  </PopoverRoot>
</template>
