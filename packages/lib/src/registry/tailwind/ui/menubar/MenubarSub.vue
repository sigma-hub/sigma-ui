<script setup lang="ts">
import { MenubarSub, type MenubarSubEmits, useForwardPropsEmits } from 'reka-ui';

interface MenubarSubRootProps {
  /** Whether the submenu is open on first render; use when you do not control the open state. */
  defaultOpen?: boolean;
  /** Controlled open state of the submenu; use with `v-model:open`. */
  open?: boolean;
}

const props = defineProps<MenubarSubRootProps>();
const emits = defineEmits<MenubarSubEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarSub
    data-slot="menubar-sub"
    v-bind="forwarded"
  >
    <slot />
  </MenubarSub>
</template>
