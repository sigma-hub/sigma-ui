<script setup lang="ts">
import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<MenubarRootProps>();
const emits = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRoot
    v-bind="forwarded"
    class="sigma-ui-menubar"
  >
    <slot />
  </MenubarRoot>
</template>

<style>
.sigma-ui-menubar {
  display: flex;
  height: 2.5rem;
  align-items: center;
  padding: 0.25rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  background-color: hsl(var(--background));
  gap: 0.25rem;
}
</style>
