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
  gap: 0.25rem;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0.25rem;
}
</style>
