<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarRootProps>();
const emits = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-menubar"
    data-slot="menubar"
    :class="[$attrs.class]"
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
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--background);
  gap: 0.25rem;
}
</style>
