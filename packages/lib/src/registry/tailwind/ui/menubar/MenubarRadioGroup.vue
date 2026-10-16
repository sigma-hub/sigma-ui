<script setup lang="ts">
import {
  MenubarRadioGroup,
  type MenubarRadioGroupEmits,
  type MenubarRadioGroupProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<MenubarRadioGroupProps>();

const emits = defineEmits<MenubarRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRadioGroup
    v-bind="forwarded"
    data-slot="menubar-radio-group"
  >
    <slot />
  </MenubarRadioGroup>
</template>
