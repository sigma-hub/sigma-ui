<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarRootProps>();
const emits = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRoot
    data-slot="menubar"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-menubar"
    :class="[$attrs.class]"
  >
    <slot />
  </MenubarRoot>
</template>

<style>
@layer components {
  .sigma-ui-menubar {
    display: flex;
    height: calc(var(--spacing) * 10);
    align-items: center;
    padding: calc(var(--spacing) * 1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--background);
    gap: calc(var(--spacing) * 1);
  }
}
</style>
