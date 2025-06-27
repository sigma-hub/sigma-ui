<script setup lang="ts">
import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MenubarRootProps>();
const emits = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRoot
    v-bind="forwarded"
    :class="
      cn(
        'flex h-10 items-center gap-x-1 rounded-md border bg-background p-1',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </MenubarRoot>
</template>
